function setup(){
    createCanvas(windowWidth-5,windowHeight-5);
}
let titles = ["Punto pendiente","DDA","Bresenham"];
//let r=200, offset = r * 2.5,x=100,y=100;
let radius = 150;
let centx = 0;
let centy = 250;
let x,y;
function draw(){
    background(255);
    stroke(0);
    textSize(20);
    for (let j = 0; j < 3; j++) {
        centx+=(radius*2)+40;
        circle(centx, centy, radius*2);
        text(titles[j],centx-50,centy+radius+32);
        for (let ang = 0; ang <= 360; ang += 45) {
            let rad = radians(ang);
            x = Math.floor(centx + (radius * cos(rad)));
            y = Math.floor(centy + (radius * sin(rad)));
            switch(j){
                case 0:
                    pp(centx, centy, x, y);
                break;
                case 1:
                    dda(centx, centy, x, y);
                break;
                case 2: 
                    bresenham(centx, centy, x, y);
                break;
            }

          }
    }

    mpCircle(350,(height/2) + 220,radius);
    text("Middle Point Circle",270,(height/2)+400);
    mpEllipse(350 + radius*3,(height/2) + 220,radius+50,radius-50)
    text("Middle Point Ellipse",720,(height/2)+400);

    noLoop();
}

function pp(x1, y1, x2, y2) {
    let x = x1,
      y = y1,
      stepX = 1,
      stepY = 1;
    const dx = x2 - x1;
    const dy = y2 - y1;
  
    if (dx == 0) {
      if (dy < 0) stepY = -1;
      while (y != y2) {
        point(x, y);
        y += stepY;
      }
    } else {
      const m = dy / dx;
      const b = y1 - m * x1;
      if (dx < 0) stepX = -1;
      while (x != x2) {
        point(x, y);
        x += stepX;
        y = m * x + b;
      }
    }
  }
function dda(x0,y0,x1,y1){
    let x = x0, 
        y = y0,
        dx = x1 - x0,
        dy = y1 - y0,
        m  = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy),
        xIncrement = dx / m,
        yIncrement = dy / m;
    for (let i = 0; i < m; i++) {
        x += xIncrement;
        y += yIncrement;
        point(x,y);
    }
}

function bresenham(x0, y0, x1, y1) {
    let dx = Math.abs(x1 - x0),
        dy = Math.abs(y1 - y0),
        difference = dx - dy,
        stepX = (x0 < x1) ? 1 : -1,
        stepY = (y0 < y1) ? 1 : -1;
    while((x0 != x1) || (y0 != y1)) {
        let error = 2*difference;
        point(x0, y0);
       if (error > -dy) {
            difference -= dy; 
            x0  += stepX; 
        }   
       if (error < dx) { 
           difference += dx;
           y0  += stepY; 
        }
    }
 }

 function mpCircle(cX,cY,r) {
	let x = 0, y = r , p;
	point(x + cX, y + cY)
     p = (Number.isInteger(p))? p = 1 - r : p = (5/4) - r;
	while (x <= y) {
		if (p < 0) {
			x = x + 1
			p = p + (2 * x) + 1
		} else {
			x = x + 1
			y = y - 1
			p = p + (2 * x) - (2 * y) + 1
		}
        point(x + cX, y + cY)
        point(-x + cX, y + cY)
        point(x + cX, -y + cY)
        point(-x + cX, -y + cY)
        point(y + cX, x + cY)
        point(-y + cX, x + cY)
        point(y + cX, -x + cY)
        point(-y + cX, -x + cY)
	}
  }

  function mpEllipse(cX, cY, rX, rY) {
	let x1 = 0, y1 = rY
         x2 = rX, y2 = 0;
	while (Math.pow(rX,2)*y1 >=  Math.pow(rY,2)*x1) {
		point(x1 + cX, y1 + cY);
		point(-x1 + cX, y1 + cY);
		point(x1 + cX, -y1 + cY);
		point(-x1 + cX, -y1 + cY);
		x1 = x1 + 1;
		y1 = (1/rX) * Math.sqrt(Math.pow(rX,2)*Math.pow(rY,2) - Math.pow(rY,2)*Math.pow(x1,2));	
	}
	while (Math.pow(rX,2)*y2 <= Math.pow(rY,2)*x2) {
		point(x2 + cX, y2 + cY);
		point(-x2 + cX, y2 + cY);
		point(x2 + cX, -y2 + cY);
		point(-x2 + cX, -y2 + cY);
		x2 = (1/rY) * Math.sqrt(Math.pow(rX,2)*Math.pow(rY,2) -Math.pow(rX,2)*Math.pow(y2,2));
		y2 = y2 + 1;		
	}
}
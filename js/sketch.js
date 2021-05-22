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
function setup() {
  W = windowWidth;
  H = windowHeight;
  createCanvas(W, H);
  p1 = new point(createVector(100,100));
  p2 = new point(createVector(200,200));
  p3 = new point(createVector(300,100));
  p4 = new point(createVector(400,300));
}

function draw() {
  background(50);

  if (mouseIsPressed) {    
    let m = createVector(mouseX, mouseY);
    let d1 = p5.Vector.dist(m, p1.pos);
    let d2 = p5.Vector.dist(m, p2.pos);
    let d3 = p5.Vector.dist(m, p3.pos);
    let d4 = p5.Vector.dist(m, p4.pos);
    
    if (d1<d2) {
      if (d1<d3) {
        if (d1<d4) {
          p1.pos = m;
        } else {
          p4.pos = m;
        }
      } else if (d3<d4) {
        p3.pos = m;
      } else {
        p4.pos = m;
      }
    } else if (d2<d3) {
      if (d2<d4) {
        p2.pos = m;
      } else {
        p4.pos = m;
      }
    } else if (d3<d4) {
      p3.pos = m;
    } else {
      p4.pos = m;
    }
    
  }
  
  beginShape();
  noFill();
  stroke(255);
  for (t=0; t<=1.01; t+=0.05) {
    Q0t = createVector(terp(p1.pos.x, p2.pos.x, t), terp(p1.pos.y, p2.pos.y, t));
    Q1t = createVector(terp(p2.pos.x, p3.pos.x, t), terp(p2.pos.y, p3.pos.y, t));
    Q2t = createVector(terp(p3.pos.x, p4.pos.x, t), terp(p3.pos.y, p4.pos.y, t));
    
    R1t = createVector(terp(Q0t.x, Q1t.x, t), terp(Q0t.y, Q1t.y, t));
    R2t = createVector(terp(Q1t.x, Q2t.x, t), terp(Q1t.y, Q2t.y, t));

    Bt = createVector(terp(R1t.x, R2t.x, t), terp(R1t.y, R2t.y, t));
      
    vertex(Bt.x, Bt.y);
  }
  endShape();
  
  p1.show();
  p2.show();
  p3.show();
  p4.show();
}



class point {
  constructor(pos) {
    this.pos = pos;
  }
  
  show() {
    fill(255);
    noStroke();
    circle(this.pos.x, this.pos.y, 5);
  }
}


function terp(v0, v1, t) {
  return v0 + t * (v1 - v0);
}

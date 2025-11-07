// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_PARTICLES = 100; // Decide the initial number of particles.
let MAX_OF_PARTICLES = 300; // Decide the maximum number of particles.

let springwater = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  // generate particles
  // for (let i = 0; i < NUM_OF_PARTICLES; i++) {
  //   springwater[i] = new Springwater(width / 2, height - 180);
  // }
}

function draw() {
  background(190);
  fill("#8BC34A");
  ellipse(width / 2, height / 2 + 120, 500, 70);
  //penquan column
  noStroke();
  fill("#EFF1C2");
  triangle(width / 2, height - 150, width / 2 - 90, height - 180, width / 2 + 90, height - 180);
  triangle(width / 2, height - 200, width / 2 - 50, height - 220, width / 2 + 50, height - 220);
  triangle(width / 2, height - 250, width / 2 - 40, height - 270, width / 2 + 40, height - 270);

  // consider generating particles in draw(), using Dynamic Array

  // update and display
  springwater.push(new Springwater(width / 2, height - 160, 5, 2.5));
  springwater.push(new Springwater(width / 2, height - 210, 3, 2.5));
  springwater.push(new Springwater(width / 2, height - 260, 1, 3));

  for (let i = 0; i < springwater.length; i++) {
    let p = springwater[i];
    p.update();
    p.display();
    p.age();
  }
  for (let i = springwater.length - 1; i > 0; i--) {
    let p = springwater[i];
    if (p.disappear == true) {
      springwater.splice(i, 1);
    }
    console.log(springwater.length);

  }

  // limit the number of particles
  //if (springwater.length > MAX_OF_PARTICLES) {
  // springwater.splice(0, 1); // remove the first (oldest) particle
  //}
}

class Springwater {
  // constructor function
  constructor(startX, startY, x, y) {
    // properties (variables): particle's characteristics
    this.x = startX;
    this.y = startY;
    this.size = random(5, 10);
    this.speedX = random(-x, x);
    this.speedY = random(-y, -y);
    this.acc = 0.2;
    this.lifeSpan = 1.0;
    this.disappear = false;

  }
  // methods (functions): particle's behaviors
  update() {
    // (add) 
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += 0.1;
    //this.y+=this.acc;
  }
  age() {
    if (this.lifeSpan > 0) {
      this.lifeSpan -= 0.008;
    } else {
      this.lifeSpan = 0;
      this.disappear = true;
    }
  }

  display() {
    let start = color(130, 200, 255);
    let end = color(255, 255, 255);
    let waterColor;
    waterColor = lerpColor(start, end, (1 - this.lifeSpan))
    // particle's appearance
    push();
    noStroke();

    fill(waterColor);

    arc(this.x, this.y, this.size, this.size, PI, TWO_PI, PIE);
    pop();
  }
}

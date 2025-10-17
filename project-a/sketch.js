let r1, r2;
let eyeSize = 8;
let trash = false;
let ellipSpeed = 0.5;
let rectSpeed = 0.5;
let x = 50;
let y = -10;
let r = 20;
let rectX = 10;
let rectY = 10;
let rectSize = 10;
let trashCount = 0;
function setup() {
    let canvas = createCanvas(800,500)
    canvas.parent("p5-canvas-container");
  r1 = 50;
  r2 = 50;
}
function draw() {
  //background
  for (let y = 0; y < height; y++) {
    let r = map(y, 0, height, 120, 30); // red channel
    let g = map(y, 0, height, 180, 50); // green channel
    let b = map(y, 0, height, 255, 80); // blue channel
    stroke(r - trashCount, g - trashCount, b - trashCount);
    line(0, y, width, y);
  }
  //seaweed
  fill(65, 191, 106);
  for (let x = 50; x < width; x += 40) {
    let h = map(noise(x * 0.1), 0, 1, 60, 150);
    beginShape();
    vertex(x, height);
    vertex(x + 12, height);
    vertex(x + 5, height - h);
    endShape(CLOSE);
  }
  // rocks
  for (let j = 100; j < width; j += 350) {
    let w = map(noise(j * 0.1), 0, 1, 90, 200);
    fill(90);
    circle(j, 490, 70);
    circle(j + w, 490, 50);
    circle(j - w, 490, 60);
    circle(j + 2 * w, 490, 80);
  }
  //creature
  noStroke();
  r1 = map(noise(frameCount / 20) * 50, 0, 50, 60, 100);
  r2 = map(noise((frameCount + 30) / 20) * 20, 0, 50, 50, 120);
  let cx = map(noise(frameCount / 200), 0, 1, 50, 700);
  let cy = map(noise(frameCount / 300), 0, 1, 50, 450);
  drawCreature(cx, cy, r1, r2);
  //------------------------trash----------------------------
  if (trash == true) {
    for (let i = 0; i <= 3; i++) {
      y += ellipSpeed;
      rectY += rectSpeed;
      fill(trashCol);
      rect(rectX * i, rectY * i, rectSize * i);
      ellipse(x * i, y * i, r * i);
      if (y >= height) {
        ellipSpeed = 0;
        //trash = false;
      }
      if (rectY >= height - rectSize) {
        rectSpeed = 0;
        //trash = false;
      }
    }
  }
}
function drawCreature(x, y, rLeft, rRight) {
  push();
  translate(x, y);
  let d = dist(mouseX, mouseY, x + 10, y + 10);
  if (d <= 110) {
    fill(color(random(50, 250), 10, 10));
    eyeSize = abs(10 * sin(frameCount * 0.1));
  } else {
    fill(0);
    eyeSize = 8;
  }
  circle(0, 0, rLeft);
  circle(0 + 20, 0 + 10, rRight);
  ellipse(0 + sin(frameCount * 0.1), 0 + 40, 30, 80);
  fill(255);
  circle(0 - 10, 0 - 10, 20); // left white
  circle(0 + 25, 0, 20); // right white
  fill(0);
  let move = sin(frameCount * 0.1) * 3; // little movement
  circle(0 - 10 + move, 0 - 10, eyeSize); // left pupil
  circle(0 + 25 + move, 0, eyeSize); // right pupil
  pop();
}
function mousePressed() {
  trashCount += 10; // how fast the background color changes
  x = random(0, width);
  y = random(0, -150);
  r = random(20, 100);
  rectX = random(0, width);
  rectY = random(0, -150);
  rectSize = random(20, 100);
  trashCol = color(random(255), random(255), random(255));
  ellipSpeed = random(1, 6);
  rectSpeed = random(1, 6);
  trash = true;
}
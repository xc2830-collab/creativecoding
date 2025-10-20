let r1, r2;
let eyeSize = 8;
let wTail = 30;
let hTail = 80;
let trash_circle = false;
let isLanding_circle = false;
let trash_rect = false;
let isLanding_rect = false;
let trash_tri = false;
let isLanding_tri = false;
let ellipSpeed;
let rectSpeed;
let triSpeed;
let ellipseX = 50;
let ellipseY = -10;
let ellipseR = 20;
let rectX = 10;
let rectY = 10;
let rectSize = 10;
let triX = 10;
let triY = 10;
let triSize = 10;
let trashCount = 0;
let escape = false;
function setup() {
  createCanvas(800, 500);
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
    let h = map(noise(x * 0.4), 0, 1, 40, 200);
    beginShape();
    vertex(x, height);
    vertex(x + 12, height);
    vertex(x + 5, height - h);
    endShape(CLOSE);
  }
  // rocks
  for (let j = 200; j < width; j += 350) {
    let w = map(noise(j * 0.5), 0, 1, 10, 300);
    fill(90);
    circle(j, 490, 70);
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
  //trash circle
  if (trash_circle || isLanding_circle) {
    fill(trashCol);
    ellipse(ellipseX, ellipseY + sin(frameCount * 0.06) * 9, ellipseR);
  }
  if (trash_circle && !isLanding_circle) {
    ellipseY += ellipSpeed;
    ellipSpeed -= 0.04;
    if (ellipSpeed <= 0) {
      ellipSpeed = 0;
    }
    if (ellipseY >= height) {
      ellipseY = height;
      trash_circle = false;
      isLanding_circle = true;
    }
  }

  //trash rect
  if (trash_rect || isLanding_rect) {
    fill(trashCol);
    rect(rectX, rectY, rectSize);
  }
  if (trash_rect && !isLanding_rect) {
    rectY += rectSpeed;
    if (rectY >= height - rectSize) {
      rectY = height - rectSize;
      trash_rect = false;
      isLanding_rect = true;
    }
  }
  //trash triangle
  if (trash_tri ||isLanding_tri){
    fill(trashCol);
    beginShape();
    vertex(triX,triY);
    vertex(triX-triSize,triY+triSize);
    vertex(triX+triSize,triY+triSize);
    endShape(CLOSE);
  }
  if (trash_tri && !isLanding_tri) {
    triY += triSpeed;
    if (triY >= height - triSize) {
      triY = height - triSize;
      trash_tri = false;
      isLanding_tri = true;
    }
  }
}
//-------------------------Creature--------------------------------
function drawCreature(x, y, rLeft, rRight) {
  push();
  translate(x, y);
  let d = dist(mouseX, mouseY, x + 10, y + 10);
  if (d <= 110) {
    fill(color(random(50, 250), 10, 10));
    eyeSize = abs(10 * sin(frameCount * 0.1));
    rLeft = 50;
    rRight = 40;
    wTail = 20;
    hTail = 50;
    escape = true;
  } else {
    escape = false;
    fill(0);
    eyeSize = 8;
  }
  circle(0, 0, rLeft);
  circle(0 + 20, 0 + 10, rRight);
  //tail
  push();
  translate(sin(frameCount * 0.2) * 10, 0); // tail move
  ellipse(0, 40, wTail, hTail);
  pop();
  fill(255);
  circle(0 - 10, 0 - 10, 20); // left white
  circle(0 + 25, 0, 20); // right white
  fill(0);
  let move = sin(frameCount * 0.1) * 3; // little movement
  circle(0 - 10 + move, 0 - 10, eyeSize); // left pupil
  circle(0 + 25 + move, 0, eyeSize); // right pupil
  pop();
}
//--------------------------mousepressed-------------------------
function mousePressed() {
  trashCount += 10; // how fast the background color changes
  ellipseX = random(0, width);
  ellipseY = random(0, -150);
  ellipseR = random(20, 100);
  rectX = random(0, width);
  rectY = random(0, -150);
  rectSize = random(20, 100);
  triX = random(0,width);
  triY = random(0, -150);
  triSize = random(20, 100);
  trashCol = color(random(255), random(255), random(255));
  ellipSpeed = random(3, 8);
  rectSpeed = random(3, 8);
  triSpeed = random(2,7);
  trash_circle = true;
  isLanding_circle = false;
  trash_rect = true;
  isLanding_rect = false;
  trash_tri = true;
  isLanding_tri = false;
}

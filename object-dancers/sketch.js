/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new cynthiaDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class cynthiaDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    // add properties for your dancer here:
    this.amp = random(50, 70);
    this.blinkCount = 0;
    //..
    //..
  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour

    // blink
    if (frameCount % 120 === 0 && this.blinkCount === 0) {
      this.blinkCount = 8;
    }
    if (this.blinkCount > 0) {
      this.blinkCount--;
    }
  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y + 100);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️

    //===== body =====
    fill(55, 150, 100);
    circle(100, 0, 90);
    strokeWeight(5);
    stroke(10, 250, 20);
    line(20, 30, 100, 84);
    line(180, 30, 130, 84);
    noStroke();

    circle(100, 84, 80);
    fill(255, 150, 60);
    circle(120, 2 * 78, 70);
    fill(55, 150, 100);
    circle(150, 3 * 71, 60);

    push();
    translate(202, 3 * 77);
    rotate(sin(frameCount * 0.1));
    fill(255, 150, 60);
    circle(0, 0, 50);
    fill(55, 150, 100);
    circle(49, 10, 49);
    fill(255, 150, 60);
    circle(94, 10, 40);
    fill(55, 150, 100);
    circle(129, 10, 30);
    pop();

    //==== face ======
    fill(0);
    circle(80, -5, 10);
    circle(120, -5, 10);
    fill(color('pink'));
    ellipse(65, 3, 10, 5);
    ellipse(135, 3, 10, 5);

    noFill();
    stroke(0);
    strokeWeight(2);
    arc(100, 10, 20, 10, 0, PI);
    noStroke();

    // === chujiao ===
    stroke(10, 250, 20);
    strokeWeight(2);
    let headX = 100;
    let headY = 0;
    let rHead = 45;
    let sway = sin(frameCount * 0.12) * 6;
    line(headX - 12, headY - rHead + 8, headX - 32 - sway, headY - rHead - 25);
    line(headX + 12, headY - rHead + 8, headX + 32 + sway, headY - rHead - 25);
    noStroke();



    // === blink ===
    if (this.blinkCount > 0) {
      fill(55, 150, 100);
      noStroke();
      rect(75, -10, 10, 10, 2);
      rect(115, -10, 10, 10, 2);
      stroke(40, 120);
      strokeWeight(2);
      line(75, -5, 85, -5);
      line(115, -5, 125, -5);
      noStroke();
    }

    this.y = 100 + sin(frameCount / 20) * this.amp;





    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    this.drawReferenceShapes()

    pop();

  }
  drawReferenceShapes() {


  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/
let emotion1 = [];
let emotion2 = [];
let emotion3 = [];
let emotion4 = [];
let emotion5 = [];
let emotion6 = [];
let emotion7 = [];
let emotion8 = [];
let sound1 = [];
let sound2 = [];
let sound3 = [];
let sound4 = [];
let sound5 = [];
let sound6 = [];
let sound7 = [];
let sound8 = [];
let objects = [];
let thismachine = [];
let shakeSound;
let levelSound;
let coinSize = 40;
let holdingCoin = false;
let coinInserted = false;
let obj;
let particles = [];
let NUM_OF_PARTICLES = 30;
let imgDrawn = ['assets/Emotion1/frame_0006.png', 'assets/Emotion2/frame006.png', 'assets/Emotion3/frame0011.png', 'assets/Emotion4/frame006.png', 'assets/Emotion5/frame007.png', 'assets/Emotion6/frame0010.png', 'assets/Emotion7/frame005.png', 'assets/Emotion8/frame005.png'];
let imgs = [];
function preload() {
  for (let i = 0; i < imgDrawn.length; i++) {
    imgs[i] = loadImage(imgDrawn[i]);
  }
  for (let i = 1; i < 7; i++) {
    let filename = 'assets/Emotion1/frame_000' + i + '.png';
    let img = loadImage(filename);
    emotion1.push(img);
  }
  sound1.push(loadSound("assets/Emotion1/confuse1.mp3"));
  sound1.push(loadSound("assets/Emotion1/confuse2.mp3"));
  sound1.push(loadSound("assets/Emotion1/confuse3.mp3"));
  for (let i = 1; i < 7; i++) {
    let filename = 'assets/Emotion2/frame00' + i + '.png';
    emotion2.push(loadImage(filename));
  }
  sound2.push(loadSound("assets/Emotion2/soft1.mp3"));
  sound2.push(loadSound("assets/Emotion2/soft2.mp3"));
  sound2.push(loadSound("assets/Emotion2/soft3.mp3"));
  for (let i = 1; i < 12; i++) {
    let filename = 'assets/Emotion3/frame00' + i + '.png';
    emotion3.push(loadImage(filename));
  }
  sound3.push(loadSound("assets/Emotion3/anxious1.mp3"));
  sound3.push(loadSound("assets/Emotion3/anxious2.mp3"));
  sound3.push(loadSound("assets/Emotion3/anxious3.mp3"));
  for (let i = 1; i < 7; i++) {
    let filename = 'assets/Emotion4/frame00' + i + '.png';
    emotion4.push(loadImage(filename));
  }
  sound4.push(loadSound("assets/Emotion4/funny1.mp3"));
  sound4.push(loadSound("assets/Emotion4/funny2.mp3"));
  sound4.push(loadSound("assets/Emotion4/funny3.mp3"));
  for (let i = 1; i < 8; i++) {
    let filename = 'assets/Emotion5/frame00' + i + '.png';
    emotion5.push(loadImage(filename));
  }
  sound5.push(loadSound("assets/Emotion5/excited1.mp3"));
  sound5.push(loadSound("assets/Emotion5/excited2.mp3"));
  sound5.push(loadSound("assets/Emotion5/excited3.mp3"));
  for (let i = 1; i < 11; i++) {
    let filename = 'assets/Emotion6/frame00' + i + '.png';
    emotion6.push(loadImage(filename));
  }
  sound6.push(loadSound("assets/Emotion6/angry1.mp3"));
  sound6.push(loadSound("assets/Emotion6/angry2.mp3"));
  sound6.push(loadSound("assets/Emotion6/angry3.mp3"));
  for (let i = 1; i < 6; i++) {
    let filename = 'assets/Emotion7/frame00' + i + '.png';
    emotion7.push(loadImage(filename));
  }
  sound7.push(loadSound("assets/Emotion7/sad1.mp3"));
  sound7.push(loadSound("assets/Emotion7/sad2.mp3"));
  sound7.push(loadSound("assets/Emotion7/sad3.mp3"));
  for (let i = 1; i < 6; i++) {
    let filename = 'assets/Emotion8/frame00' + i + '.png';
    emotion8.push(loadImage(filename));
  }
  sound8.push(loadSound("assets/Emotion8/surprise1.mp3"));
  sound8.push(loadSound("assets/Emotion8/surprise2.mp3"));
  sound8.push(loadSound("assets/Emotion8/surprise3.mp3"));

  shakeSound = loadSound('assets/machineshake.mp3');
  levelSound = loadSound('assets/level.mp3');
}
function setup() {
  let canvas = createCanvas(800, 500);
  textFont("Bitcount Prop Single");
  canvas.parent("p5-canvas-container");
  imageMode(CENTER);
  rectMode(CENTER);
  let obj1 = new EmotionObj(200, 200, 0.1, emotion1, sound1);
  objects.push(obj1);
  let obj2 = new EmotionObj(300, 200, 0.2, emotion2, sound2);
  objects.push(obj2);
  let obj3 = new EmotionObj(400, 200, 0.2, emotion3, sound3);
  objects.push(obj3);
  let obj4 = new EmotionObj(500, 200, 0.07, emotion4, sound4);
  objects.push(obj4);
  let obj5 = new EmotionObj(200, 300, 0.2, emotion5, sound5);
  objects.push(obj5);
  let obj6 = new EmotionObj(300, 300, 0.2, emotion6, sound6);
  objects.push(obj6);
  let obj7 = new EmotionObj(400, 300, 0.1, emotion7, sound7);
  objects.push(obj7);
  let obj8 = new EmotionObj(500, 300, 0.15, emotion8, sound8);
  objects.push(obj8);
  thismachine = new Machine(width / 2, height / 2,);

}
function draw() {

  background('#FCB9B2');
  thismachine.update();
  thismachine.display();
  for (let i = 0; i < objects.length; i++) {
    objects[i].update();
    objects[i].display();
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].move();
    particles[i].display();
    if (particles[i].lifespan <= 0) {
      particles.splice(i, 1);
    }
  }
  drawCoin();
  if (holdingCoin) {
    noCursor();
    drawCoinCursor();
  } else {
    cursor();
  }

}
class EmotionObj {
  constructor(x, y, size, frames, sounds) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.frames = frames;
    this.sounds = sounds;
    this.isHovering = false;
    this.frameInterval = 10;
    this.curImage = this.frames.length - 1;
    this.curSoundIndex = null;
  }
  isHovered(mouseX, mouseY) {
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < 30) {
      this.isHovering = true;
    } else {
      this.isHovering = false;
    }
  }
  update() {
    this.isHovered(mouseX, mouseY);
    if (this.isHovering === true) {
      if (frameCount % this.frameInterval == 0) {
        this.curImage = this.curImage + 1;
        if (this.curImage >= this.frames.length) {
          this.curImage = 0;
        }
      }
    } else {
      this.curImage = this.frames.length - 1;
    }
    // // stop all sounds first
    // pick one random sound to play
    if (this.isHovering === true) {
      if (this.curSoundIndex === null && this.sounds.length > 0) {
        this.curSoundIndex = int(random(this.sounds.length));
        this.sounds[this.curSoundIndex].play();
      }
    } else {
      if (this.curSoundIndex !== null) {
        this.sounds[this.curSoundIndex].stop();
        this.curSoundIndex = null;
      }
    }
  }
  display() {
    push();
    translate(this.x + (thismachine.x - thismachine.originalX), this.y + (thismachine.y - thismachine.originalY));
    scale(this.size);
    image(this.frames[this.curImage], 0, 0);
    pop();
  }
}
function mousePressed() {
  let coinX = width - 60;
  let coinY = height - 60;

  if (dist(mouseX, mouseY, coinX, coinY) < coinSize / 2) {
    holdingCoin = !holdingCoin;
  }
  else if (!holdingCoin) {
    // do nothing
  }
  else {
    thismachine.checkBoudary(mouseX, mouseY);
    holdingCoin = false;
  }
}
class Machine {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.originalX = x;
    this.originalY = y;
    this.xspd = 0;
    this.yspd = 0;
    this.ispushed = false;
    this.progress = 0;
    this.isRotating = false;
    this.isShaking = false;
    this.isResetting = false;
    this.angle = 0;
    this.progress = 0;
    this.isDrawn = false;
    this.shakeSoundPlayed = false;
    this.levelSoundPlayed = false;
  }
  update() {
    if (this.ispushed == true) {
      if (!this.levelSoundPlayed) {
        levelSound.play();
        levelSound.setVolume(1);
        this.levelSoundPlayed = true;
      }
      if (this.isRotating == true) {
        this.progress += 0.02;
        this.angle = sin(this.progress * PI) * 0.2;
        if (this.progress >= 1) {
          this.isRotating = false;
          this.isShaking = true;
          this.progress = 0;
        }
      }
      else if (this.isShaking == true) {
        if (!this.shakeSoundPlayed) {
          shakeSound.play();
          shakeSound.setVolume(1.6);
          this.shakeSoundPlayed = true;
        }
        this.progress += 0.01;
        let shakeshake = map(this.progress, 0, 1, 15, 0);
        this.xspd = random(-shakeshake, shakeshake);
        this.yspd = random(-shakeshake, shakeshake);
        this.x = this.originalX + this.xspd;
        this.y = this.originalY + this.yspd;
        if (this.progress >= 1) {
          this.isShaking = false;
          this.isResetting = true;
          // reset position
          this.x = this.originalX;
          this.y = this.originalY;
          this.progress = 0;
          this.isDrawn = true;
        }
      }
      else if (this.isDrawn == true) {
        //drawn bgm
        for (let i = 1; i <= 8; i++) {
          let group = window["sound" + i];
          if (group) {
            for (let s of group) {
              if (s) {
                s.stop();
              }
            }
          }
        }
        let idx = int(random(imgs.length));
        let chosenImg = imgs[idx];
        for (let i = 0; i < NUM_OF_PARTICLES; i++) {
          particles.push(new Particle(380, 400, chosenImg));
        }

        let soundArray = null;

        if (idx == 0) soundArray = sound1;
        if (idx == 1) soundArray = sound2;
        if (idx == 2) soundArray = sound3;
        if (idx == 3) soundArray = sound4;
        if (idx == 4) soundArray = sound5;
        if (idx == 5) soundArray = sound6;
        if (idx == 6) soundArray = sound7;
        if (idx == 7) soundArray = sound8;

        if (soundArray && soundArray.length > 0) {
          let drawnSound = int(random(soundArray.length));
          soundArray[drawnSound].play();
        }

        this.isDrawn = false;
      }


      else if (this.isResetting == true) {
        this.angle *= 0.8;
        if (abs(this.angle) < 0.001) {
          this.angle = 0;
          this.isResetting = false;
          this.ispushed = false;
        }
      }
    }
  }
  display() {
    push();
    translate(this.x + 195 - 10, this.y);
    rotate(this.angle);
    fill("#CF4040");
    rect(0, 0, 40, 15);
    circle(45, 0, 50);
    pop();
    push();
    translate(this.x, this.y);
    fill("#CF4040");
    rect(-50, 0, 450, 380);
    fill(250);
    rect(-50, 0, 390, 220);
    line(-235, 1, 140, 1);
    fill(0);
    rect(0, 150, 150, 50);
    circle(120, 150, 30);
    textSize(24);
    text('Emotion Lottery Machine', -190, -140);
    pop();
  }
  checkBoudary(mx, my) {
    let distance = dist(mx, my, this.x + 240, this.y)
    if (distance < 25) {
      this.shakeSoundPlayed = false; // ???
      this.levelSoundPlayed = false;
      this.ispushed = true;
      this.isRotating = true;
      this.isShaking = false;
      this.isResetting = false;
      this.progress = 0;
    }
  }
}
class Particle {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.xSpd = random(-6, 6);
    this.ySpd = random(-6, 6);
    this.size = random(40, 80);
    this.lifespan = 255;
    this.img = img;
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
    this.lifespan -= 4;
  }
  display() {
    push();
    translate(this.x, this.y);
    tint(255, this.lifespan)
    image(this.img, 0, 0, this.size, this.size);
    pop();
  }
}
function drawCoin() {
  push();
  noStroke();
  fill('#E6D14A');
  let coinX = width - 60;
  let coinY = height - 60;

  circle(coinX, coinY, coinSize);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(20);
  text('$', coinX, coinY);

  pop();
}
function drawCoinCursor() {
  push();
  noStroke();
  fill('#E6D14A');
  circle(mouseX, mouseY, coinSize);

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(20);
  text('$', mouseX, mouseY);
  pop();
}


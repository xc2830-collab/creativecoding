let emotion1 = [];
let curImage = 0;
let obj1;
let sound1 = [];
let curSoundIndex = 0;

function preload() {
  for (let i = 1; i < 7; i++) {
    let filename = 'assets/frame_000' + i + '.png';
    let img = loadImage(filename);
    emotion1.push(img);
  }

  sound1.push(loadSound("assets/soft1.mp3"));
  sound1.push(loadSound("assets/soft2.mp3"));
  sound1.push(loadSound("assets/soft3.mp3"));
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  // centering the image to make the effect of 
  // it following the mouse position better:
  imageMode(CENTER);
  obj1 = new EmotionObj(100, 100, 0.1);

}

function draw() {
  background(220);
  obj1.update();
  obj1.display();
}

class EmotionObj {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.isHovering = false;
    this.hoverWasOn = false; //whether the object is already hovered in the last frame (for audio)
    this.frameInterval = 10;
  }

  isHovered(mx, my) {
    let d = dist(mx, my, this.x, this.y);
    if (d < 30) {
      this.isHovering = true;
    } else {
      this.isHovering = false;
    }
  }

  update() {
    this.isHovered(mouseX, mouseY);

    if (this.isHovering == true) {
      if (frameCount % this.frameInterval == 0) {
        curImage = (curImage + 1) % emotion1.length;
      }
    } else {
      curImage = emotion1.length - 1;
    }

    // // stop all sounds first
    // for (let i = 0; i < sound1.length; i++) {
    //   sound1[i].stop();
    // }
    // // pick one random sound to play
    // curSoundIndex = int(random(sound1.length));
    // sound1[curSoundIndex].play();

    // if (this.isHovering == false && this.hoverWasOn == true) {
    //   for (let i = 0; i < sound1.length; i++) {
    //     sound1[i].stop();
    //   }
    // }
    // this.hoverWasOn = this.isHovering;

  }
  display() {
    push();
    translate(this.x, this.y);
    scale(this.size);
    image(emotion1[curImage], 0, 0);
    pop();
  }
}


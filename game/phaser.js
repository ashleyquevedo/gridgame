import diceRoll from "./diceRoll.js";
import getCirclePositions from "./circlePositions.js";

let spaceBar;
let fKey;
let gameStarted = false;

var config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 650,
  backgroundColor: 0xc9bcb1,
  parent: "phaser-container",
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  physics: {
    default: "matter",
    matter: {
      // debug: true,
    },
  },
  // physics: {
  //   default: "arcade",
  //   arcade: {
  //     debug: false,
  //     debugShowVelocity: false,
  //     // gravity: { y: 300 },
  //   },
  // },
};

var game = new Phaser.Game(config);

function preload() {
  this.load.image("threelinetile", "tiles/threeline.png");
  this.load.image("squaretile", "tiles/squaretile.png");
  this.load.image("twolinetile", "tiles/twolinetile.png");
  this.load.image("bigsquaretile", "tiles/bigsquaretile.png");
  this.load.image("zigzagtile", "tiles/zigzagtile.png");
  this.load.image("teetile", "tiles/teetile.png");
  this.load.image("fourlinetile", "tiles/fourlinetile.png");
  this.load.image("elltile", "tiles/elltile.png");
  this.load.image("cornertile", "tiles/corner.png");
}

function create() {
  // let shapes = this.cache.json.get("shapes");

  // grid vars: xpos, ypos, width, height, cellWidth, cellHeight, fillColor, fillAlpha, outlineFillColor, outlineFillAlpha
  let gridOne = this.add
    .grid(50, 50, 300, 300, 50, 50, 0xf3ecdf, 1, 0x1f3039, 1)
    .setOrigin(0, 0);

  let gridTwo = this.add
    .grid(850, 50, 300, 300, 50, 50, 0xf3ecdf, 1, 0x1f3039, 1)
    .setOrigin(0, 0);

  //p1 tiles:

  let threeLine = this.add
    .sprite(300, 400, "threelinetile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(0, 0);

  let square = this.add
    .sprite(150, 500, "squaretile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(0, 0);

  let twoLine = this.add
    .sprite(0, 400, "twolinetile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(0, 0);

  let bigSquare = this.add
    .sprite(200, 500, "bigsquaretile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(0, 0);

  let zigzag = this.add
    .sprite(50, 500, "zigzagtile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(0, 0);

  let tee = this.add
    .sprite(100, 400, "teetile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(0, 0);

  let fourLine = this.add
    .sprite(0, 600, "fourlinetile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(0, 0);

  let ell = this.add
    .sprite(200, 550, "elltile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(0, 0);

  let corner = this.add
    .sprite(0, 500, "cornertile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(0, 0);

  // p2 tiles:

  let threeLine2 = this.add
    .sprite(300 + 850, 400, "threelinetile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(0, 0);

  let square2 = this.add
    .sprite(150 + 850, 500, "squaretile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(0, 0);

  let twoLine2 = this.add
    .sprite(0 + 850, 400, "twolinetile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(0, 0);

  let bigSquare2 = this.add
    .sprite(200 + 850, 500, "bigsquaretile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(0, 0);

  let zigzag2 = this.add
    .sprite(50 + 850, 500, "zigzagtile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(0, 0);

  let tee2 = this.add
    .sprite(100 + 850, 400, "teetile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(0, 0);

  let fourLine2 = this.add
    .sprite(0 + 850, 600, "fourlinetile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(0, 0);

  let ell2 = this.add
    .sprite(200 + 850, 550, "elltile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(0, 0);

  let corner2 = this.add
    .sprite(0 + 850, 500, "cornertile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(0, 0);

  let allSprites = this.children.list.filter(
    (x) => x instanceof Phaser.GameObjects.Sprite
  );

  allSprites.forEach((sprite) => (sprite.alpha = 0.65));
  allSprites.forEach((sprite) => this.input.setDraggable([sprite], true));

  // click and drag functionality
  this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
    gameObject.setOrigin(0, 0);
    gameObject.x = Phaser.Math.Snap.To(dragX, 50);
    gameObject.y = Phaser.Math.Snap.To(dragY, 50);
  });
  this.input.dragDistanceThreshold = 0;

  // rotate on right click functionality
  this.input.mouse.disableContextMenu();

  allSprites.forEach(async (sprite) =>
    sprite.on("pointerdown", function (pointer) {
      if (pointer.rightButtonDown()) {
        this.setOrigin(0.5).setAngle((this.angle += 90));
      }
    })
  );

  //   allSprites.forEach(async (sprite) =>
  //   sprite.on("pointerup", function (pointer) {
  //     if (pointer.rightButtonReleased()) {
  //       this.setAngle((this.angle += 90));
  //     }
  //   })
  // );

  // flip on space-click or f-click functionality
  spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  fKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

  // to do: correct flipping and investigate lag after flipping
  allSprites.forEach(async (sprite) =>
    sprite.on("pointerdown", function (pointer) {
      if (spaceBar.isDown || fKey.isDown) {
        console.log(this.angle);
        this.flipY = !this.flipY;
        // this.flipX = !this.flipX;
      }
    })
  );

  // text

  let addCircles = this.add.text(570, 50, "Start", {
    fontFamily: "Helvetica, Arial, sans-serif",
    color: 0x888888,
    fontSize: 30,
  });

  addCircles.setInteractive();

  // setting up circle graphics
  let graphics = this.add.graphics({ fillStyle: { color: 0x005500 } });
  // graphics.lineStyle(2, 0x000000, 1);
  graphics.fillStyle(0x274251, 1);
  const radius = 22;

  // generate and render circle positions;
  addCircles.on(
    "pointerup",
    function () {
      if (!gameStarted) {
        addCircles.text = "Reset!";
        let roll = diceRoll();
        let circles1 = getCirclePositions(gridOne.x, gridOne.y, 50, roll);
        let circles2 = getCirclePositions(gridTwo.x, gridTwo.y, 50, roll);
        circles1
          .concat(circles2)
          .forEach((pos) => graphics.fillCircle(pos.x, pos.y, radius));
        gameStarted = true;
      } else {
        gameStarted = false;
        this.scene.restart();
      }
    },
    this
  );
}

function update() {}

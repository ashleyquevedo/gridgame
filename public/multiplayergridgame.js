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
};

var game = new Phaser.Game(config);

function preload() {
  this.load.image("threelinetile", "../tiles/threeline.png");
  this.load.image("squaretile", "../tiles/squaretile.png");
  this.load.image("twolinetile", "../tiles/twolinetile.png");
  this.load.image("bigsquaretile", "../tiles/bigsquaretile.png");
  this.load.image("zigzagtile", "../tiles/zigzagtile.png");
  this.load.image("teetile", "../tiles/teetile.png");
  this.load.image("fourlinetile", "../tiles/fourlinetile.png");
  this.load.image("elltile", "../tiles/elltile.png");
  this.load.image("cornertile", "../tiles/corner.png");
}

function create() {
  this.socket = io("localhost:8080", { autoConnect: false });
  // io().on("connect", () => {
  //   console.log("Connected!");
  // });

  io().on("spriteMoved", function (movementData) {
    let targetSprite = allSprites.find(
      (sprite) => sprite.name === movementData.name
    );
    targetSprite.setPosition(movementData.x, movementData.y);
    targetSprite.setAngle(movementData.angle);
    targetSprite.flipY = movementData.flipY;
  });

  const setAllPositions = () => {
    threeLine.setPosition(300, 450);
    threeLine2.setPosition(300 + 850, 450);
    square.setPosition(150, 500);
    square2.setPosition(150 + 850, 500);
    twoLine.setPosition(0, 450);
    twoLine2.setPosition(0 + 850, 450);
    bigSquare.setPosition(250, 550);
    bigSquare2.setPosition(250 + 850, 550);
    zigzag.setPosition(100, 550);
    zigzag2.setPosition(100 + 850, 550);
    tee.setPosition(150, 450);
    tee2.setPosition(150 + 850, 450);
    fourLine.setPosition(100, 600);
    fourLine2.setPosition(100 + 850, 600);
    ell.setPosition(300, 600);
    ell2.setPosition(300 + 850, 600);
    corner.setPosition(50, 550);
    corner2.setPosition(50 + 850, 550);

    let allSprites = this.children.list.filter(
      (x) => x instanceof Phaser.GameObjects.Sprite
    );
    allSprites.forEach((sprite) => {
      sprite.setAngle(0);
      sprite.flipY = false;
    });
  };

  io().on("startedGame", function (rollData) {
    setAllPositions();
    let roll = rollData.roll;
    addCircles.text = "Reset!";
    let circles1 = getCirclePositions(gridOne.x, gridOne.y, 50, roll);
    let circles2 = getCirclePositions(gridTwo.x, gridTwo.y, 50, roll);
    circles1
      .concat(circles2)
      .forEach((pos) => graphics.fillCircle(pos.x, pos.y, radius));
    gameStarted = true;
  });

  io().on("resetGame", () => {
    gameStarted = false;
    addCircles.text = "START";
    graphics.clear();
    setAllPositions();
  });

  let gridOne = this.add
    .grid(50, 50, 300, 300, 50, 50, 0xe4dad2, 1, 0x1f3039, 1)
    .setOrigin(0, 0);

  let gridTwo = this.add
    .grid(850, 50, 300, 300, 50, 50, 0xe4dad2, 1, 0x1f3039, 1)
    .setOrigin(0, 0);

  //p1 tiles:
  let threeLine = this.add
    .sprite(300, 450, "threelinetile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(0, 1 / 3)
    .setName("threeLine");

  let square = this.add
    .sprite(150, 500, "squaretile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(0, 0)
    .setName("square");

  let twoLine = this.add
    .sprite(0, 450, "twolinetile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(0, 0.5)
    .setName("twoLine");

  let bigSquare = this.add
    .sprite(250, 550, "bigsquaretile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(0.5, 0.5)
    .setName("bigSquare");

  let zigzag = this.add
    .sprite(100, 550, "zigzagtile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(1 / 3, 0.5)
    .setName("zigzag");

  let tee = this.add
    .sprite(150, 450, "teetile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(1 / 3, 0.5)
    .setName("tee");

  let fourLine = this.add
    .sprite(100, 600, "fourlinetile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(0.5, 0)
    .setName("fourLine");

  let ell = this.add
    .sprite(300, 600, "elltile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(2 / 3, 0.5)
    .setName("ell");

  let corner = this.add
    .sprite(50, 550, "cornertile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(0.5)
    .setName("corner");

  // p2 tiles:
  let threeLine2 = this.add
    .sprite(300 + 850, 450, "threelinetile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(0, 1 / 3)
    .setName("threeLine2");

  let square2 = this.add
    .sprite(150 + 850, 500, "squaretile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(0, 0)
    .setName("square2");

  let twoLine2 = this.add
    .sprite(0 + 850, 450, "twolinetile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(0, 0.5)
    .setName("twoLine2");

  let bigSquare2 = this.add
    .sprite(250 + 850, 550, "bigsquaretile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(0.5, 0.5)
    .setName("bigSquare2");

  let zigzag2 = this.add
    .sprite(100 + 850, 550, "zigzagtile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(1 / 3, 0.5)
    .setName("zigzag2");

  let tee2 = this.add
    .sprite(150 + 850, 450, "teetile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(1 / 3, 0.5)
    .setName("tee2");

  let fourLine2 = this.add
    .sprite(100 + 850, 600, "fourlinetile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(0.5, 0)
    .setName("fourLine2");

  let ell2 = this.add
    .sprite(300 + 850, 600, "elltile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(2 / 3, 0.5)
    .setName("ell2");

  let corner2 = this.add
    .sprite(50 + 850, 550, "cornertile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(0.5)
    .setName("corner2");

  let allSprites = this.children.list.filter(
    (x) => x instanceof Phaser.GameObjects.Sprite
  );

  allSprites.forEach((sprite) => (sprite.alpha = 0.65));
  allSprites.forEach((sprite) => this.input.setDraggable([sprite], true));

  // click and drag functionality:
  this.input.on(
    "drag",
    function (pointer, gameObject, dragX, dragY) {
      gameObject.x = Phaser.Math.Snap.To(dragX, 50);
      gameObject.y = Phaser.Math.Snap.To(dragY, 50);
    },
    this
  );
  this.input.dragDistanceThreshold = 0;

  // rotate on right click functionality:
  this.input.mouse.disableContextMenu();

  allSprites.forEach((sprite) =>
    sprite.on("pointerdown", function (pointer) {
      if (pointer.rightButtonDown()) {
        this.setAngle((this.angle += 90));
        io().emit("spriteMovement", {
          x: this.x,
          y: this.y,
          name: this.name,
          angle: this.angle,
          flipY: this.flipY,
        });
      }
    })
  );

  allSprites.forEach((sprite) =>
    sprite.on("dragend", function (pointer) {
      io().emit("spriteMovement", {
        x: this.x,
        y: this.y,
        name: this.name,
        angle: this.angle,
        flipY: this.flipY,
      });
    })
  );

  // flip on space-click or f-click functionality:
  spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  fKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

  allSprites.forEach(async (sprite) =>
    sprite.on("pointerdown", function (pointer) {
      if (spaceBar.isDown || fKey.isDown) {
        this.flipY = !this.flipY;
        // this.flipX = !this.flipX;
      }
    })
  );

  // start button:
  let addCircles = this.add
    .text(game.config.width / 2, 75, "START", {
      fontFamily: "courier-new, courier, monospaced",
      color: "#274251",
      fontSize: 45,
      strokeThickness: 1,
      stroke: "#274251",
    })
    .setOrigin(0.5)
    .setResolution(2.5);

  addCircles.setInteractive();

  // setting up circle graphics:
  let graphics = this.add.graphics({ fillStyle: { color: 0x274251 } });
  graphics.fillStyle(0x274251, 0.8);
  const radius = 20;

  // generate and render circle positions:
  addCircles.on("pointerup", () => {
    if (!gameStarted) {
      let roll = diceRoll();
      io().emit("startGame", {
        roll: roll,
      });
    } else {
      io().emit("resetGame");
    }
  });

  // instructions:
  let instructions = this.add
    .text(
      game.config.width / 2,
      150,
      "ROTATE: right-click.\nFLIP: F-click / SPACE-click.",
      {
        fontFamily: "courier-new, courier, monospaced",
        color: "#274251",
        fontSize: 20,
        lineSpacing: 10,
        align: "center",
      }
    )
    .setOrigin(0.5)
    .setResolution(3);

  let instructionsFull = this.add
    .text(
      game.config.width / 2,
      290,
      "Press start/reset to begin.\nUse all tiles to fill the grid,\nwhile avoiding the circles!\nExpect at least one solution to every grid.",
      {
        fontFamily: "courier-new, courier, monospaced",
        color: "#274251",
        fontSize: 17,
        lineSpacing: 10,
        align: "center",
      }
    )
    .setOrigin(0.5)
    .setResolution(3);

  let link = this.add
    .text(game.config.width / 2, 580, "github.com/ashleyquevedo", {
      fontFamily: "courier-new, courier, monospaced",
      color: "#274251",
      fontSize: 17,
      lineSpacing: 10,
      align: "center",
    })
    .setOrigin(0.5)
    .setResolution(3);

  // concept credit:
  let credit = this.add
    .text(
      game.config.width / 2,
      625,
      "Concept derived from the game Genius Square!",
      {
        fontFamily: "courier-new, courier, monospaced",
        color: "#274251",
        fontSize: 15,
        lineSpacing: 10,
        align: "center",
      }
    )
    .setOrigin(0.5)
    .setResolution(3);
}

function update() {}

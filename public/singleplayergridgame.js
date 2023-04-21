// import diceRoll from "./diceRoll.js";
// import getCirclePositions from "./circlePositions.js";

function diceRoll() {
  const dice = [
    [
      [1, 6],
      [1, 6],
      [1, 6],
      [6, 1],
      [6, 1],
      [6, 1],
    ],
    [
      [1, 4],
      [6, 6],
      [3, 5],
      [4, 6],
      [2, 5],
      [3, 6],
    ],
    [
      [1, 3],
      [3, 2],
      [2, 2],
      [2, 3],
      [1, 2],
      [2, 1],
    ],
    [
      [1, 1],
      [6, 3],
      [4, 1],
      [5, 2],
      [4, 2],
      [3, 1],
    ],
    [
      [1, 5],
      [5, 1],
      [1, 5],
      [2, 6],
      [6, 2],
      [6, 2],
    ],
    [
      [3, 3],
      [5, 3],
      [4, 3],
      [4, 4],
      [2, 4],
      [3, 4],
    ],
    [
      [5, 4],
      [5, 5],
      [5, 6],
      [6, 4],
      [4, 5],
      [5, 5],
    ],
  ];
  return dice.map(function (die) {
    return die[Math.floor(Math.random() * die.length)];
  });
}

function getCirclePositions(gridOriginX, gridOriginY, cellWidth, diceRoll) {
  return diceRoll.map(function (face) {
    let faceX = face[0] - 1;
    let faceY = face[1] - 1;
    let pegX = gridOriginX + cellWidth / 2 + faceX * cellWidth;
    let pegY = gridOriginY + cellWidth / 2 + faceY * cellWidth;
    return new Phaser.Geom.Point(pegX, pegY);
  });
}

let spaceBar;
let fKey;
let gameStarted = false;
let allSprites;

var config = {
  type: Phaser.AUTO,
  width: 900,
  height: 650,
  backgroundColor: 0xc9bcb1,
  parent: "singleplayer-container",
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
  this.load.image("zigzag", "../tiles/zigzagtile.png");
  this.load.image("tee", "../tiles/teetile.png");
  this.load.image("fourlinetile", "../tiles/fourlinetile.png");
  this.load.image("ell", "../tiles/elltile.png");
  this.load.image("corner", "../tiles/corner.png");
  this.load.image("ellflipped", "../tiles/elltileflipped.png");
  this.load.image("zigzagflipped", "../tiles/zigzagtileflipped.png");
  this.load.image("cornerflipped", "../tiles/cornerflipped.png");
  this.load.image("teeflipped", "../tiles/teetileflipped.png");
}

function create() {
  const defineAllSprites = () => {
    allSprites = this.children.list.filter(
      (x) => x instanceof Phaser.GameObjects.Sprite
    );
  };

  // in multiplayer proof of concept, resetting tile positions instead of restarting the scene resolved several errors.
  // const setAllPositions = () => {
  //   threeLine.setPosition(300, 450);
  //   square.setPosition(150, 500);
  //   twoLine.setPosition(0, 450);
  //   bigSquare.setPosition(250, 550);
  //   zigzag.setPosition(100, 550);
  //   tee.setPosition(150, 450);
  //   fourLine.setPosition(100, 600);
  //   ell.setPosition(300, 600);
  //   corner.setPosition(50, 550);

  //   defineAllSprites();
  //   allSprites.forEach((sprite) => {
  //     sprite.setAngle(0);
  //     sprite.flipY = false;
  //   });
  // };

  let gridOne = this.add
    .grid(50, 50, 300, 300, 50, 50, 0xe4dad2, 1, 0x1f3039, 1)
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
    .sprite(100, 550, "zigzag")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(1 / 3, 0.5)
    .setName("zigzag");

  let tee = this.add
    .sprite(150, 450, "tee")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(1 / 3, 0.5)
    .setName("tee");

  let fourLine = this.add
    .sprite(100, 600, "fourlinetile")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(0.5, 0)
    .setName("fourLine");

  let ell = this.add
    .sprite(300, 600, "ell")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(2 / 3, 0.5)
    .setName("ell");

  let corner = this.add
    .sprite(50, 550, "corner")
    .setInteractive(this.input.makePixelPerfect())
    .setOrigin(0.5)
    .setName("corner");

  defineAllSprites();

  const propertyHandler = () => {
    defineAllSprites();
    allSprites.forEach((sprite) => (sprite.alpha = 0.65));
    allSprites.forEach((sprite) => this.input.setDraggable([sprite], true));
  };
  propertyHandler();

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
      }
    })
  );

  // flip on space-click or f-click functionality:
  spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  fKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

  let gameContext = this;

  // add sprite function to add flipped sprites——when sprites are flipped, their hitboxes do not flip with them.
  // this add sprite function, in conjunction with the flip handler, allows "flipped" sprites to be destroyed
  // and replaced with a new sprite that is flipped and had accurate hitboxes
  // sprites that require this special handling: ell, zigzag, tee, corner
  // to do: find more elegant solution or dry up this code
  const addNewSprite = (x, y, angle, spriteName, originX, originY) => {
    let temp = gameContext.add
      .sprite(x, y, spriteName)
      .setInteractive(gameContext.input.makePixelPerfect())
      .setOrigin(originX, originY)
      .setName(spriteName)
      .setAngle(angle);
    temp.input.draggable = true;
    temp.alpha = 0.65;
    temp.on("pointerdown", function (pointer) {
      if (pointer.rightButtonDown()) {
        this.setAngle((this.angle += 90));
      }
    });
    temp.on("pointerdown", function (pointer) {
      if (spaceBar.isDown || fKey.isDown) {
        let angletemp = this.angle;
        let xtemp = this.x;
        let ytemp = this.y;
        this.destroy();
        switch (temp.name) {
          case "ellflipped":
            let ell = addNewSprite(xtemp, ytemp, angletemp, "ell", 2 / 3, 0.5);
            break;
          case "ell":
            let ellFlipped = addNewSprite(
              xtemp,
              ytemp,
              angletemp,
              "ellflipped",
              2 / 3,
              0.5
            );
            break;
          case "zigzagflipped":
            let zigzag = addNewSprite(
              xtemp,
              ytemp,
              angletemp,
              "zigzag",
              1 / 3,
              0.5
            );
            break;
          case "zigzag":
            let zigzagFlipped = addNewSprite(
              xtemp,
              ytemp,
              angletemp,
              "zigzagflipped",
              1 / 3,
              0.5
            );
            break;
          case "cornerflipped":
            let corner = addNewSprite(
              xtemp,
              ytemp,
              angletemp,
              "corner",
              0.5,
              0.5
            );
            break;
          case "corner":
            let cornerFlipped = addNewSprite(
              xtemp,
              ytemp,
              angletemp,
              "cornerflipped",
              0.5,
              0.5
            );
            break;
          case "teeflipped":
            let tee = addNewSprite(xtemp, ytemp, angletemp, "tee", 1 / 3, 0.5);
            break;
          case "tee":
            let teeFlipped = addNewSprite(
              xtemp,
              ytemp,
              angletemp,
              "teeflipped",
              1 / 3,
              0.5
            );
            break;
        }
      }
    });
    return temp;
  };

  // flip handler does not necessarily need to be wrapped in its own function
  // but wrapping it in this way makes progress towards resolving an issue with multiplayer scene "resetting"
  const flipHandler = () => {
    defineAllSprites();
    allSprites.forEach(async (sprite) =>
      sprite.on("pointerdown", function (pointer) {
        if (spaceBar.isDown || fKey.isDown) {
          if (
            sprite.name === "ell" ||
            sprite.name === "zigzag" ||
            sprite.name === "corner" ||
            sprite.name === "tee"
          ) {
            let angletemp = sprite.angle;
            let xtemp = sprite.x;
            let ytemp = sprite.y;
            sprite.destroy();
            switch (sprite.name) {
              case "ell":
                let ellFlipped = addNewSprite(
                  xtemp,
                  ytemp,
                  angletemp,
                  "ellflipped",
                  2 / 3,
                  0.5
                );
                break;
              case "zigzag":
                let zigzagFlipped = addNewSprite(
                  xtemp,
                  ytemp,
                  angletemp,
                  "zigzagflipped",
                  1 / 3,
                  0.5
                );
                break;
              case "corner":
                let cornerFlipped = addNewSprite(
                  xtemp,
                  ytemp,
                  angletemp,
                  "cornerflipped",
                  0.5,
                  0.5
                );
                break;
              case "tee":
                let teeFlipped = addNewSprite(
                  xtemp,
                  ytemp,
                  angletemp,
                  "teeflipped",
                  1 / 3,
                  0.5
                );
                break;
            }
          } else {
            this.flipY = !this.flipY;
          }
        }
      })
    );
  };
  flipHandler();

  // start button:
  let addCircles = this.add
    .text(game.config.width - 20, 75, "START", {
      fontFamily: "courier-new, courier, monospaced",
      color: "#274251",
      fontSize: 45,
      strokeThickness: 1,
      stroke: "#274251",
    })
    .setOrigin(1, 0.5)
    .setResolution(2.5)
    .setInteractive();

  // setting up circle graphics:
  let graphics = this.add.graphics({ fillStyle: { color: 0x274251 } });
  graphics.fillStyle(0x274251, 0.8);
  const radius = 20;

  // generate and render circle positions:
  addCircles.on("pointerup", () => {
    if (!gameStarted) {
      let roll = diceRoll();
      addCircles.text = "Reset!";
      let circles1 = getCirclePositions(gridOne.x, gridOne.y, 50, roll);
      circles1.forEach((pos) => graphics.fillCircle(pos.x, pos.y, radius));
      gameStarted = true;
      // setAllPositions();
    } else {
      gameStarted = false;
      addCircles.text = "START";
      graphics.clear();
      // setAllPositions();
      this.scene.restart();
    }
  });

  // instructions:
  let instructions = this.add
    .text(
      game.config.width - 20,
      150,
      "ROTATE: right-click.\nFLIP: F-click / SPACE-click.",
      {
        fontFamily: "courier-new, courier, monospaced",
        color: "#274251",
        fontSize: 20,
        lineSpacing: 10,
        align: "right",
      }
    )
    .setOrigin(1, 0.5)
    .setResolution(3);

  let instructionsFull = this.add
    .text(
      game.config.width - 20,
      290,
      "Press start/reset to begin.\nUse all tiles to fill the grid,\nwhile avoiding the circles!\nExpect at least one solution to every grid.",
      {
        fontFamily: "courier-new, courier, monospaced",
        color: "#274251",
        fontSize: 17,
        lineSpacing: 10,
        align: "right",
      }
    )
    .setOrigin(1, 0.5)
    .setResolution(3);

  let link = this.add
    .text(game.config.width - 20, 580, "github.com/ashleyquevedo", {
      fontFamily: "courier-new, courier, monospaced",
      color: "#274251",
      fontSize: 17,
      lineSpacing: 10,
      align: "right",
    })
    .setOrigin(1, 0.5)
    .setResolution(3);

  // concept credit:
  let credit = this.add
    .text(
      game.config.width - 20,
      625,
      "Concept derived from the game Genius Square!",
      {
        fontFamily: "courier-new, courier, monospaced",
        color: "#274251",
        fontSize: 15,
        lineSpacing: 10,
        align: "right",
      }
    )
    .setOrigin(1, 0.5)
    .setResolution(3);
}

function update() {}

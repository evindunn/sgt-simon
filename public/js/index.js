const GAME_WIDTH = 640;
const GAME_HEIGHT = 480;

let gameVars = new Object();

function preload() {
  // Map
  this.load.spritesheet(
    "groundTiles",
    "img/groundTiles.png",
    { frameWidth: 32, frameHeight: 32 }
  );

  this.load.tilemapTiledJSON("map", "assets/map.json");

  // Player
  this.load.spritesheet(
    "player",
    "img/character.png",
    { frameWidth: 48, frameHeight: 48 }
  );
}

function create() {
  // Map
  gameVars.map = this.make.tilemap({ key: "map" });
  gameVars.groundTiles = gameVars.map.addTilesetImage("groundTiles");
  gameVars.groundLayer = gameVars.map.createDynamicLayer(
    "groundLayer",
    gameVars.groundTiles
  );
  gameVars.groundLayer.y = -gameVars.groundLayer.height + GAME_HEIGHT;
  gameVars.groundLayer.setCollisionByExclusion([-1]);

  this.physics.world.bounds.width = gameVars.groundLayer.width;
  this.physics.world.bounds.height = gameVars.groundLayer.height;

  // Player
  gameVars.player = this.physics.add.sprite(100, 100, "player");
  gameVars.player.setBounce(0.1);
  gameVars.player.setCollideWorldBounds(true);

  this.physics.add.collider(gameVars.groundLayer, gameVars.player);

  this.anims.create({
    key: "walk",
    frames: this.anims.generateFrameNumbers("player", { start: 1, end: 4 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "stand",
    frames: [ { key: "player", frame: 0 } ],
    frameRate: 1,
  });

  this.anims.create({
    key: "jump",
    frames: [ { key: "player", frame: 1 } ],
    frameRate: 1,
  });

  // Controls
  gameVars.cursors = this.input.keyboard.createCursorKeys();

  // Camera
  this.cameras.main.setBounds(
    0,
    0,
    gameVars.map.widthInPixels,
    -gameVars.map.height + GAME_HEIGHT
  );
  this.cameras.main.startFollow(gameVars.player);
  this.cameras.main.setBackgroundColor("#00bbff");
}

function update() {
  // Player
  if (gameVars.cursors.left.isDown && gameVars.player.body.onFloor()) {
    gameVars.player.setVelocityX(-200);
    gameVars.player.anims.play("walk", true);
    gameVars.player.flipX = false;
  } else if (gameVars.cursors.right.isDown && gameVars.player.body.onFloor()) {
    gameVars.player.setVelocityX(200);
    gameVars.player.anims.play("walk", true);
    gameVars.player.flipX = true;
  } else if (gameVars.player.body.onFloor()) {
    gameVars.player.setVelocityX(0);
    gameVars.player.anims.play("stand", true);
  } else {
    gameVars.player.anims.play("jump", true);
  }

  if (gameVars.cursors.up.isDown && gameVars.player.body.onFloor()) {
    gameVars.player.setVelocityY(-500);
  }
}

function main() {
  let config = {
    type: Phaser.AUTO,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    scene: {
      preload: preload,
      create: create,
      update: update
    },
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 500 },
        debug: false
      }
    }
  };

  let game = new Phaser.Game(config);
}

window.onload = main;

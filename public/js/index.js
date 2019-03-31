let gameVars = new Object();

function preload() {
  // Map
  this.load.spritesheet("groundTiles", "img/groundTiles.png", { frameWidth: 32, frameHeight: 32 });
  this.load.tilemapTiledJSON("map", "assets/map.json");

  // Player
  this.load.spritesheet("player", "img/character.png", { frameWidth: 48, frameHeight: 48 });
}

function create() {
  gameVars.map = this.make.tilemap({ key: "map" });
  gameVars.groundTiles = gameVars.map.addTilesetImage("groundTiles");
  gameVars.groundLayer = gameVars.map.createDynamicLayer(
    "groundLayer",
    gameVars.groundTiles
  );
  gameVars.groundLayer.y = -gameVars.groundLayer.height + 480;
  gameVars.groundLayer.setCollisionByExclusion([-1]);

  this.physics.world.bounds.width = gameVars.groundLayer.width;
  this.physics.world.bounds.height = gameVars.groundLayer.height;
}

function update() {

}

function main() {
  let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
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

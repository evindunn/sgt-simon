function preload() {
  this.load.spritesheet("player", "/img/character.png", { frameWidth: 48, frameHeight: 48 });
}

function create() {

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
    }
  };

  let game = new Phaser.Game(config);
}

window.onload = main;

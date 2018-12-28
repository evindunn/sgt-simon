function preload() {
  this.load.spritesheet("player", "/img/Character.jpg", { frameWidth: 0, frameHeight: 0 });
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

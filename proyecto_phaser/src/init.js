import Level from "./level.js";

var config = {
  type: Phaser.CANVAS,
  width: 920,
  height: 500,
  scene: [Level],
};

new Phaser.Game(config);



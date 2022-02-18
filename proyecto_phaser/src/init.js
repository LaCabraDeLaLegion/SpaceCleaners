import Level from "./level.js";
import Menu from "./menu.js";
import Map from "./map.js";

var config = {
  type: Phaser.CANVAS,
  width: 920,
  height: 500,
  parent: "container",
  scene: [Menu, Map, Level],
  render: {pixelArt: true},
  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  }
};

let game = new Phaser.Game(config);



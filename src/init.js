import Level from "./level.js";
import Menu from "./menu.js";
import Map from "./map.js";
import Win from "./win.js";
import GameOver from "./game_over.js";

var config = {
  type: Phaser.CANVAS,
  width: 920,
  height: 500,
  parent: "container",
  scene: [Menu, Map, Level, Win, GameOver],
  render: {pixelArt: true},
  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  }
};

let game = new Phaser.Game(config);



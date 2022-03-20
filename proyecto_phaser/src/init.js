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
  render: { pixelArt: true },
  fps: {
    target: 60,
    forceSetTimeOut: false,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);
console.log(game.loop.actualFps);

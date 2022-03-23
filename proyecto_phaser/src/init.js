import Level from "./level.js";
import Menu from "./menu.js";
import Map from "./map.js";
import Win from "./win.js";
import GameOver from "./game_over.js";

const DPR = window.devicePixelRatio
const { width, height } = window.screen

// Set width and height.
const WIDTH = Math.round(Math.max(width, height) * DPR)
const HEIGHT = Math.round(Math.min(width, height) * DPR)

var config = {
  type: Phaser.AUTO,
  width: 900,
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

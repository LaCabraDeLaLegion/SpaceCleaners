import Level from "./level.js";
import Menu from "./menu.js";
import Map from "./map.js";
import Win from "./win.js";
import GameOver from "./game_over.js";
import Shop from "./shop.js";
import Introduction from "./introduction.js";

const game_width = 0;
const game_height = 0;

const DPR = window.devicePixelRatio

var config = {
  type: Phaser.AUTO,
  width: window.innerWidth/2,
  height: window.innerHeight,
  parent: "container",
  scene: [Introduction, Menu, Map, Shop, Level, Win, GameOver],
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


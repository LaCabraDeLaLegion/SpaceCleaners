import Level1 from "./level/level1.js";
import Level2 from "./level/level2.js";
import Level3 from "./level/level3.js";
import Level4 from "./level/level4.js";
import Level5 from "./level/level5.js";
import Level6 from "./level/level6.js";
import Level7 from "./level/level7.js";
import Loader from "./loader.js";
import Menu from "./menu.js";
import Map from "./map.js";
import Win from "./win.js";
import GameOver from "./game_over.js";
import Shop from "./shop.js";
import Inventory from "./inventory.js";
import Introduction from "./introduction.js";
import Details from "./details.js";
import Tutorial from "./tutorial.js";

const game_width = 800;
const game_height = 940;

const DPR = window.devicePixelRatio;

var config = {
  type: Phaser.AUTO,
  autoCenter: true,
  width: game_width,
  height: game_height,
  parent: "container",
  scene: [
    Loader,
    Introduction,
    Tutorial,
    Menu,
    Map,
    Shop,
    Inventory,
    Level1,
    Level2,
    Level3,
    Level4,
    Level5,
    Level6,
    Level7,
    Win,
    GameOver,
    Details,
  ],
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

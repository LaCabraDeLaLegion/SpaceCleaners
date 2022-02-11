import Player from "./player.js";

export default class Level extends Phaser.Scene {
  constructor() {
    super({ key: "level" });
  }

  preload(){
    this.load.setPath("assets/sprites/");
    this.load.image("player", "ship.png");
    this.load.image("laser", "laser.png");
  }

  create() {
    console.log("start");
    this.input.setDefaultCursor('url(assets/sprites/cursor.cur), pointer');
    this.player = new Player(this, 500, 500);
  }
}

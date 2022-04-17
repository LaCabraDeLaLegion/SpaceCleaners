import store from "./data/store.js";
import Sound from "./data/sounds.js";

export default class Inventory extends Phaser.Scene {
  constructor() {
    super({ key: "inventory" });
  }

  init(data) {
    this.inventory = data;
    this.globalWidth = this.cameras.main.width;
    this.globalHeight = this.cameras.main.height;
  }

  preload() {
    this.load.setPath("assets/");
    this.load_images();
    this.load_audio();
  }

  load_images() {

  }

  load_audio() {

  }

}

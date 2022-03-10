

export default class Win extends Phaser.Scene {
  constructor() {
    super({ key: "win" });
  }

  init(data) {
  }

  preload() {
    this.load.setPath("assets/");
    this.load.image("victory_final", "victory_final.png");
  }

  create() {
    this.add.image(450, 250, "victory_final");
  }
}


export default class Menu extends Phaser.Scene {
  constructor() {
    super({ key: "menu" });
  }

  preload() {
    this.load.setPath("assets/sprites/Menu/");
    this.load.image("background", "background.png");
    this.load.image("play", "play.png");
  }

  create(){
    this.add.image(450, 250, "background").setDepth(1);
    let play = this.add.image(450, 250, "play").setDepth(1);
    play.setInteractive();
    play.on("pointerover", () => {
        play.setScale(2);
    });
    play.on("pointerout", () =>{
        play.setScale(1);
    });
    play.on("pointerup", () => {
        this.scene.start("level");
    });
  }
}
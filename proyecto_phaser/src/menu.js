import Sound from "./data/sounds.js";
export default class Menu extends Phaser.Scene {
  constructor() {
    super({ key: "menu" });
  }

  preload() {
    this.load.setPath("assets/sprites/Menu/");
    this.load.image("background", "background.png");
    this.load.image("play", "play.png");

    this.load.audio("playSound", "../../sounds/play.wav");
    this.load.audio("intro", "../../sounds/intro_song.wav");
    this.load.audio("button", "../../sounds/button.ogg");
  }

  create() {
    this.add
      .image(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        "background"
      )
      .setDepth(1)
      .setRotation(1.571)
      .setScale(1.4);

    this.playSound = this.sound.add("playSound", Sound.playSound);
    this.introSong = this.sound.add("intro", Sound.intro);

    this.buttonSound = this.sound.add("button");

    let play = this.add
      .image(this.cameras.main.width / 2, this.cameras.main.height / 2, "play")
      .setDepth(1);
    play.setInteractive();
    play.on("pointerover", () => {
      play.setScale(2);
      this.buttonSound.play();
    });
    play.on("pointerout", () => {
      play.setScale(1);
    });
    play.on("pointerup", () => {
      this.playSound.play();
      this.time.delayedCall(1000, () => {
        this.introSong.pause();
        this.scene.start("map", [null, null, null]);
      });
    });

    this.introSong.play();
  }
}

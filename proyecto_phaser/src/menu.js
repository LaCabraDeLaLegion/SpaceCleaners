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
    this.add.image(450, 250, "background").setDepth(1);

    this.playSound = this.sound.add("playSound", {
      mute: false,
      volume: 1,
      rate: 3,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    });

    this.introSong = this.sound.add("intro", {
      mute: false,
      volume: 1.5,
      rate: 0.65,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    });

    this.buttonSound = this.sound.add("button");

    let play = this.add.image(450, 250, "play").setDepth(1);
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

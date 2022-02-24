let earth_owner = "virus";
let earth_scale = 1;

export default class Map extends Phaser.Scene {
  constructor() {
    super({ key: "map" });
  }

  init(data) {
    console.log("init data = " + data);
    if (data === "win") {
      earth_owner = "player";
      earth_scale = 2;
    }
  }

  preload() {
    this.load.setPath("assets/sprites/map/");
    this.load.image("background_map", "background_map.png");
    this.load.image("grey_planet", "Baren.png");
    this.load.image("ice_planet", "Ice.png");
    this.load.image("lava_planet", "Lava.png");
    this.load.image("earth_planet", "Terran.png");

    this.load.audio("button", "../../sounds/button.ogg");
  }

  create() {
    this.planetSound = this.sound.add("button");

    this.add
      .image(450, 250, "background_map")
      .setDepth(1)
      .setScale(2)
      .setRotation(300);

    let planet_1 = this.add
    .image(150, 150, "grey_planet")
    .setDepth(1)
    .setScale(1);

    let planet_2 = this.add
    .image(220, 350, "grey_planet")
    .setDepth(1)
    .setScale(1);

    
    let planet_3 = this.add
    .image(370, 270, "grey_planet")
    .setDepth(1)
    .setScale(1);

    let planet_4 = this.add
    .image(500, 50, "grey_planet")
    .setDepth(1)
    .setScale(1);
    
    let planet_5 = this.add
    .image(570, 400, "grey_planet")
    .setDepth(1)
    .setScale(1);
    
    let planet_6 = this.add
    .image(650, 250, "grey_planet")
    .setDepth(1)
    .setScale(1);
    
    let planet_7 = this.add
    .image(800, 150, "grey_planet")
    .setDepth(1)
    .setScale(3);

    let earth = this.add
      .image(50, 250, "earth_planet")
      .setDepth(1)
      .setScale(1);

    planet_1.setInteractive();
    planet_1.on("pointerover", () => {
      planet_1.setScale(2);
      this.planetSound.play();
    });
    planet_1.on("pointerout", () => {
      planet_1.setScale(1);
    });
    planet_1.on("pointerup", () => {
      this.scene.start("level", "1");
    });

    planet_2.setInteractive();
    planet_2.on("pointerover", () => {
      planet_2.setScale(1);
      this.planetSound.play();
    });
    planet_2.on("pointerout", () => {
      planet_2.setScale(1);
    });
    planet_2.on("pointerup", () => {
      this.scene.start("level", "2");
    });

    planet_3.setInteractive();
    planet_3.on("pointerover", () => {
      planet_3.setScale(2);
      this.planetSound.play();
    });
    planet_3.on("pointerout", () => {
      planet_3.setScale(1);
    });
    planet_3.on("pointerup", () => {
      this.scene.start("level", "2");
    });

    planet_4.setInteractive();
    planet_4.on("pointerover", () => {
      planet_4.setScale(2);
      this.planetSound.play();
    });
    planet_4.on("pointerout", () => {
      planet_4.setScale(1);
    });
    planet_4.on("pointerup", () => {
      this.scene.start("level");
    });

    planet_5.setInteractive();
    planet_5.on("pointerover", () => {
      planet_5.setScale(2);
      this.planetSound.play();
    });
    planet_5.on("pointerout", () => {
      planet_5.setScale(1);
    });
    planet_5.on("pointerup", () => {
      this.scene.start("level");
    });

    planet_6.setInteractive();
    planet_6.on("pointerover", () => {
      planet_6.setScale(2);
      this.planetSound.play();
    });
    planet_6.on("pointerout", () => {
      planet_6.setScale(1);
    });
    planet_6.on("pointerup", () => {
      this.scene.start("level");
    });

    planet_7.setInteractive();
    planet_7.on("pointerover", () => {
      planet_7.setScale(5);
      this.planetSound.play();
    });
    planet_7.on("pointerout", () => {
      planet_7.setScale(4);
    });
    planet_7.on("pointerup", () => {
      this.scene.start("level");
    });
  }
}

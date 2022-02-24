let planet_1_scale = 1;

let planet_owners = ["humanos", "virus", "virus", "virus", "virus", "virus", "virus", "virus"];

let planet_counter = 1;

export default class Map extends Phaser.Scene {
  constructor() {
    super({ key: "map" });
    this.probability = 100;
  }

  init(data) {
    console.log("init data = " + data);
    if (data === "win") {
      planet_owners[1] = "humanos";
      planet_counter++;

    }
    else if (data === "lose"){
      planet_owners[1] = "virus";
      let random = Phaser.Math.Between(0, 100);
      if (random <= this.probability){
        planet_owners[0] = "virus";
        planet_counter--;
      }
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

    console.log("contador planetas = " + planet_counter);
    if (planet_counter >= 8){
      this.scene.start("win");
    }
    else if (planet_counter < 1){
      this.scene.start("gameover");
    }

    this.planetSound = this.sound.add("button");

    this.add
      .image(450, 250, "background_map")
      .setDepth(1)
      .setScale(2)
      .setRotation(300);

    this.planet_1 = this.add
    .image(150, 150, "grey_planet")
    .setDepth(1)
    .setScale(planet_1_scale);

    if (planet_owners[1] === "humanos"){
      this.planet_1.setScale(2);
    }

    this.planet_2 = this.add
    .image(220, 350, "grey_planet")
    .setDepth(1)
    .setScale(1);

    
    this.planet_3 = this.add
    .image(370, 270, "grey_planet")
    .setDepth(1)
    .setScale(1);

    this.planet_4 = this.add
    .image(500, 50, "grey_planet")
    .setDepth(1)
    .setScale(1);
    
    this.planet_5 = this.add
    .image(570, 400, "grey_planet")
    .setDepth(1)
    .setScale(1);
    
    this.planet_6 = this.add
    .image(650, 250, "grey_planet")
    .setDepth(1)
    .setScale(1);
    
    this.planet_7 = this.add
    .image(800, 150, "grey_planet")
    .setDepth(1)
    .setScale(3);

    let earth = this.add
      .image(50, 250, "earth_planet")
      .setDepth(1)
      .setScale(1);

    this.planet_1.setInteractive();
    this.planet_1.on("pointerover", () => {
      this.planet_1.setScale(2);
      this.planetSound.play();
    });
    this.planet_1.on("pointerout", () => {
      this.planet_1.setScale(1);
    });
    this.planet_1.on("pointerup", () => {
      this.scene.start("level", "1");
    });

    this.planet_2.setInteractive();
    this.planet_2.on("pointerover", () => {
      this.planet_2.setScale(1);
      this.planetSound.play();
    });
    this.planet_2.on("pointerout", () => {
      this.planet_2.setScale(1);
    });
    this.planet_2.on("pointerup", () => {
      this.scene.start("level", "2");
    });

    this.planet_3.setInteractive();
    this.planet_3.on("pointerover", () => {
      this.planet_3.setScale(2);
      this.planetSound.play();
    });
    this.planet_3.on("pointerout", () => {
      this.planet_3.setScale(1);
    });
    this.planet_3.on("pointerup", () => {
      this.scene.start("level", "2");
    });

    this.planet_4.setInteractive();
    this.planet_4.on("pointerover", () => {
      this.planet_4.setScale(2);
      this.planetSound.play();
    });
    this.planet_4.on("pointerout", () => {
      this.planet_4.setScale(1);
    });
    this.planet_4.on("pointerup", () => {
      this.scene.start("level");
    });

    this.planet_5.setInteractive();
    this.planet_5.on("pointerover", () => {
      this.planet_5.setScale(2);
      this.planetSound.play();
    });
    this.planet_5.on("pointerout", () => {
      this.planet_5.setScale(1);
    });
    this.planet_5.on("pointerup", () => {
      this.scene.start("level");
    });

    this.planet_6.setInteractive();
    this.planet_6.on("pointerover", () => {
      this.planet_6.setScale(2);
      this.planetSound.play();
    });
    this.planet_6.on("pointerout", () => {
      this.planet_6.setScale(1);
    });
    this.planet_6.on("pointerup", () => {
      this.scene.start("level");
    });

    this.planet_7.setInteractive();
    this.planet_7.on("pointerover", () => {
      this.planet_7.setScale(5);
      this.planetSound.play();
    });
    this.planet_7.on("pointerout", () => {
      this.planet_7.setScale(4);
    });
    this.planet_7.on("pointerup", () => {
      this.scene.start("level");
    });
  }
}

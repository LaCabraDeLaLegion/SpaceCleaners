let planet_1_scale = 1;

let planet_owners = ["humanos", "virus", "virus", "virus", "virus", "virus", "virus", "virus"];

let planet_counter = 1;

export default class Map extends Phaser.Scene {
  constructor() {
    super({ key: "map" });
    this.probability = 0;
  }

  init(data) {
    
    console.log("init data = " + data);

    if (data[0] === "win") {
      planet_owners[data[1]] = "humanos";
      planet_counter++;
    }

    else if (data[0] === "lose"){
      planet_owners[data[1]] = "virus";
      let random = Phaser.Math.Between(0, 100);
      if (random <= this.probability){
        planet_owners[0] = "virus";
        planet_counter--;
      }
    }
  }

  preload() {
    this.load.setPath("assets/sprites/Map/");
    this.load.image("background_map", "background_map.png");

    this.load.audio("button", "../../sounds/button.ogg");
  
    //Spritesheets

    //Virus
    this.load.spritesheet("planet_1_virus", "planet_spritesheet_1.png", {
      frameWidth: 50,
      frameHeight: 50
    });
    this.load.spritesheet("planet_2_virus", "planet_spritesheet_1.png", {
      frameWidth: 50,
      frameHeight: 50
    });
    this.load.spritesheet("planet_3_virus", "planet_spritesheet_1.png", {
      frameWidth: 50,
      frameHeight: 50
    });
    this.load.spritesheet("planet_4_virus", "planet_spritesheet_1.png", {
      frameWidth: 50,
      frameHeight: 50
    });
    this.load.spritesheet("planet_5_virus", "planet_spritesheet_1.png", {
      frameWidth: 50,
      frameHeight: 50
    });
    this.load.spritesheet("earth", "earth_spritesheet.png", {
      frameWidth: 50,
      frameHeight: 50
    });
    this.load.spritesheet("planet_6_virus", "planet_spritesheet_1.png", {
      frameWidth: 50,
      frameHeight: 50
    });
    this.load.spritesheet("planet_7_virus", "planet_spritesheet_1.png", {
      frameWidth: 50,
      frameHeight: 50
    });

    //Player
    this.load.spritesheet("planet_1_player", "planet_spritesheet_2.png", {
      frameWidth: 50,
      frameHeight: 50
    });
    this.load.spritesheet("planet_2_player", "planet_spritesheet_2.png", {
      frameWidth: 50,
      frameHeight: 50
    });
    this.load.spritesheet("planet_3_player", "planet_spritesheet_1.png", {
      frameWidth: 50,
      frameHeight: 50
    });
    this.load.spritesheet("planet_4_player", "planet_spritesheet_2.png", {
      frameWidth: 50,
      frameHeight: 50
    });
    this.load.spritesheet("planet_5_player", "planet_spritesheet_2.png", {
      frameWidth: 50,
      frameHeight: 50
    });
    this.load.spritesheet("earth", "earth_spritesheet.png", {
      frameWidth: 50,
      frameHeight: 50
    });
    this.load.spritesheet("planet_6_player", "planet_spritesheet_2.png", {
      frameWidth: 50,
      frameHeight: 50
    });
    this.load.spritesheet("planet_7_player", "planet_spritesheet_2.png", {
      frameWidth: 50,
      frameHeight: 50
    });
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

    if (planet_owners[1] === "virus"){
      this.planet_1 = this.physics.add.sprite(150, 150, "planet_1_virus");
      this.anims.create({
        key: 'rotate_planet_1_virus',
        frames: this.anims.generateFrameNumbers("planet_1_virus"),
        frameRate: 5,
        repeat: -1
      });
      this.planet_1.setDepth(2);
      this.planet_1.play('rotate_planet_1_virus');
    }
    else {
      this.planet_1 = this.physics.add.sprite(150, 150, "planet_1_player");
      this.anims.create({
        key: 'rotate_planet_1_player',
        frames: this.anims.generateFrameNumbers("planet_1_player"),
        frameRate: 5,
        repeat: -1
      });
      this.planet_1.setDepth(2);
      this.planet_1.play('rotate_planet_1_player');
    }

    if (planet_owners[2] === "virus"){
      this.planet_2 = this.physics.add.sprite(220, 350, "planet_2_virus");
      this.anims.create({
        key: 'rotate_planet_2_virus',
        frames: this.anims.generateFrameNumbers("planet_2_virus"),
        frameRate: 5,
        repeat: -1
      });
      this.planet_2.setDepth(2);
      this.planet_2.play('rotate_planet_2_virus');
    }
    else {
      this.planet_2 = this.physics.add.sprite(220, 350, "planet_2_player");
      this.anims.create({
        key: 'rotate_planet_2_player',
        frames: this.anims.generateFrameNumbers("planet_2_player"),
        frameRate: 5,
        repeat: -1
      });
      this.planet_2.setDepth(2);
      this.planet_2.play('rotate_planet_2_player');
    }

    if (planet_owners[3] === "virus"){
      this.planet_3 = this.physics.add.sprite(370, 270, "planet_3_virus");
      this.anims.create({
        key: 'rotate_planet_3_virus',
        frames: this.anims.generateFrameNumbers("planet_3_virus"),
        frameRate: 5,
        repeat: -1
      });
      this.planet_3.setDepth(2);
      this.planet_3.play('rotate_planet_3_virus');
    }
    else {
      this.planet_3 = this.physics.add.sprite(370, 270, "planet_3_player");
      this.anims.create({
        key: 'rotate_planet_3_player',
        frames: this.anims.generateFrameNumbers("planet_3_player"),
        frameRate: 5,
        repeat: -1
      });
      this.planet_3.setDepth(2);
      this.planet_3.play('rotate_planet_3_player');
    }

    if (planet_owners[4] === "virus"){
      this.planet_4 = this.physics.add.sprite(500, 50, "planet_4_virus");
      this.anims.create({
        key: 'rotate_planet_4_virus',
        frames: this.anims.generateFrameNumbers("planet_4_virus"),
        frameRate: 5,
        repeat: -1
      });
      this.planet_4.setDepth(2);
      this.planet_4.play('rotate_planet_4_virus');  
    }
    else {
      this.planet_4 = this.physics.add.sprite(500, 50, "planet_4_player");
      this.anims.create({
        key: 'rotate_planet_4_player',
        frames: this.anims.generateFrameNumbers("planet_4_player"),
        frameRate: 5,
        repeat: -1
      });
      this.planet_4.setDepth(2);
      this.planet_4.play('rotate_planet_4_player');
    }
    
    if (planet_owners[5] === "virus"){
      this.planet_5 = this.physics.add.sprite(570, 400, "planet_5_virus");
      this.anims.create({
        key: 'rotate_planet_5_virus',
        frames: this.anims.generateFrameNumbers("planet_5_virus"),
        frameRate: 5,
        repeat: -1
      });
      this.planet_5.setDepth(2);
      this.planet_5.play('rotate_planet_5_virus');
    }
    else {
      this.planet_5 = this.physics.add.sprite(570, 400, "planet_5_player");
      this.anims.create({
        key: 'rotate_planet_5_player',
        frames: this.anims.generateFrameNumbers("planet_5_player"),
        frameRate: 5,
        repeat: -1
      });
      this.planet_5.setDepth(2);
      this.planet_5.play('rotate_planet_5_player');
    }

    if (planet_owners[6] === "virus"){
      this.planet_6 = this.physics.add.sprite(650, 250, "planet_6_virus");
      this.anims.create({
        key: 'rotate_planet_6_virus',
        frames: this.anims.generateFrameNumbers("planet_6_virus"),
        frameRate: 5,
        repeat: -1
      });
      this.planet_6.setDepth(2);
      this.planet_6.play('rotate_planet_6_virus');
    }
    else {
      this.planet_6 = this.physics.add.sprite(650, 250, "planet_6_player");
      this.anims.create({
        key: 'rotate_planet_6_player',
        frames: this.anims.generateFrameNumbers("planet_6_player"),
        frameRate: 5,
        repeat: -1
      });
      this.planet_6.setDepth(2);
      this.planet_6.play('rotate_planet_6_player');
    }

    if (planet_owners[7] === "virus"){
      this.planet_7 = this.physics.add.sprite(800, 150, "planet_7_virus");
      this.anims.create({
        key: 'rotate_planet_7_virus',
        frames: this.anims.generateFrameNumbers("planet_7_virus"),
        frameRate: 5,
        repeat: -1
      });
      this.planet_7.setDepth(2);
      this.planet_7.play('rotate_planet_7_virus');
    }
    else {
      this.planet_7 = this.physics.add.sprite(800, 150, "planet_7_player");
      this.anims.create({
        key: 'rotate_planet_7_player',
        frames: this.anims.generateFrameNumbers("planet_7_player"),
        frameRate: 5,
        repeat: -1
      });
      this.planet_7.setDepth(2);
      this.planet_7.play('rotate_planet_7_player');
    }

    this.earth = this.physics.add.sprite(50, 250, "earth");
    this.anims.create({
      key: 'rotate_earth',
      frames: this.anims.generateFrameNumbers("earth"),
      frameRate: 5,
      repeat: -1
    });
    this.earth.setDepth(2);
    this.earth.play('rotate_earth');

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
      this.planet_2.setScale(2);
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

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
    this.load.setPath("assets/sprites/Map/");
    this.load.image("background_map", "background_map.png");

    this.load.audio("button", "../../sounds/button.ogg");
  
    //Spritesheets
    this.load.spritesheet("planet_1", "planet_spritesheet_2.png", {
      frameWidth: 50,
      frameHeight: 50
    });
    this.load.spritesheet("planet_2", "planet_spritesheet_3.png", {
      frameWidth: 50,
      frameHeight: 50
    });
    this.load.spritesheet("planet_3", "planet_spritesheet_1.png", {
      frameWidth: 50,
      frameHeight: 50
    });
    this.load.spritesheet("planet_4", "planet_spritesheet_3.png", {
      frameWidth: 50,
      frameHeight: 50
    });
    this.load.spritesheet("planet_5", "planet_spritesheet_1.png", {
      frameWidth: 50,
      frameHeight: 50
    });
    this.load.spritesheet("earth", "earth_spritesheet.png", {
      frameWidth: 50,
      frameHeight: 50
    });
    this.load.spritesheet("planet_6", "moon_spritesheet.png", {
      frameWidth: 50,
      frameHeight: 50
    });
    this.load.spritesheet("planet_7", "planet_spritesheet_1.png", {
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

    this.planet_1 = this.physics.add.sprite(150, 150, "planet_1");
    this.anims.create({
      key: 'rotate_planet1',
      frames: this.anims.generateFrameNumbers("planet_1"),
      frameRate: 5,
      repeat: -1
    });
    this.planet_1.setDepth(2);
    this.planet_1.play('rotate_planet1');

    if (planet_owners[1] === "humanos"){
      this.planet_1.setScale(2);
    }

    this.planet_2 = this.physics.add.sprite(220, 350, "planet_2");
    this.anims.create({
      key: 'rotate_planet2',
      frames: this.anims.generateFrameNumbers("planet_2"),
      frameRate: 5,
      repeat: -1
    });
    this.planet_2.setDepth(2);
    this.planet_2.play('rotate_planet2');
  
    this.planet_3 = this.physics.add.sprite(370, 270, "planet_3");
    this.anims.create({
      key: 'rotate_planet3',
      frames: this.anims.generateFrameNumbers("planet_3"),
      frameRate: 5,
      repeat: -1
    });
    this.planet_3.setDepth(2);
    this.planet_3.play('rotate_planet3');
    
    this.planet_4 = this.physics.add.sprite(500, 50, "planet_4");
    this.anims.create({
      key: 'rotate_planet4',
      frames: this.anims.generateFrameNumbers("planet_4"),
      frameRate: 5,
      repeat: -1
    });
    this.planet_4.setDepth(2);
    this.planet_4.play('rotate_planet4');

    this.planet_5 = this.physics.add.sprite(570, 400, "planet_5");
    this.anims.create({
      key: 'rotate_planet5',
      frames: this.anims.generateFrameNumbers("planet_5"),
      frameRate: 5,
      repeat: -1
    });
    this.planet_5.setDepth(2);
    this.planet_5.play('rotate_planet5');
    
    this.planet_6 = this.physics.add.sprite(650, 250, "planet_6");
    this.anims.create({
      key: 'rotate_planet6',
      frames: this.anims.generateFrameNumbers("planet_6"),
      frameRate: 5,
      repeat: -1
    });
    this.planet_6.setDepth(2);
    this.planet_6.play('rotate_planet6');

    this.planet_7 = this.physics.add.sprite(800, 150, "planet_7");
    this.anims.create({
      key: 'rotate_planet7',
      frames: this.anims.generateFrameNumbers("planet_7"),
      frameRate: 5,
      repeat: -1
    });
    this.planet_7.setDepth(2);
    this.planet_7.play('rotate_planet7');

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

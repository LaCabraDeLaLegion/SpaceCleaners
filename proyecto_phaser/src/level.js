import Player from "./player.js";
import Boss from "./boss.js";
import Slash from "./slash.js";
import Virus from "./enemies/virus.js";
import Human from "./enemies/human.js";

export default class Level extends Phaser.Scene {

  constructor() {
    super({ key: "level" });
  }

  init(data) {
    console.log("Nivel = " + data[0]);
    this.level = data[0];
    this.inventory = data[1];
  }

  preload() {
    this.load.setPath("assets/");
    this.load_images();
    this.load_spritesheets();
    this.load_audio();
  }

  create() {
    this.createAnimations();
    this.addSounds();

    this.input.setDefaultCursor("url(assets/sprites/cursor.cur), pointer");

    this.alive_monsters = 0;
    this.bossInScene = false;

    this.initPlayer();
    this.initEnemies();

    this.levelSong.play();

    /*
    this.text = this.add.text(32, 32);
    this.timedEvent = this.time.addEvent({delay: 3000, callback: this.createEnemies(), callbackScope: this, loop: true});

    for (let i = this.level; i< (10*this.level + 1); i++){
      console.log("delay = ", 3000 * i);
      //this.time.delayedCall(1000 * i, this.createEnemies());
    }
    */
  }

  update() {
    
    let destroy = false;

    //this.text.setText('Event.progress: ' + this.timedEvent.getProgress().toString().substr(0, 4));

    if (this.alive_monsters <= 0 && !this.bossInScene) {
      this.startBossBattle();
    } else if (this.bossInScene && this.boss.life <= 0) {
      let victory = this.add.image(450, 250, "level_victory").setDepth(1);
      victory.setInteractive();
      victory.on("pointerup", () => {
        this.scene.start("map", ["win", this.level]);
        this.levelSong.stop();
      });
    }

    this.enemies.getChildren().forEach((enemy) => {
      if (enemy.y >= 500) {
        this.player.setVisible(false);
        let lose = this.add.image(450, 250, "level_lose").setDepth(1);
        lose.setInteractive();
        lose.on("pointerup", () => {
          this.scene.start("map", ["lose", this.level, this.inventory]);
          this.levelSong.stop();
        });
        destroy = true;
      }
    });

    if (destroy) {
      this.destroy_enemies();
    }
    this.slashes;
    
  }

  destroy_enemies() {
    this.enemies.getChildren().forEach((enemy) => {
      this.enemies.killAndHide(enemy);
    });
  }

  startBossBattle() {
    this.boss = new Boss(this, 420, -50, 1);
    this.physics.add.collider(
      this.boss,
      this.lasers,
      this.onHitBoss,
      null,
      this
    );
    this.boss.setScale(0.25);
    this.bossInScene = true;
  }

  bossAttack(type, n) {
    for (let i = 0; i < n; i++) {
      this.slash = new Slash(
        this,
        this.boss.x + 50 * i,
        this.boss.y + 80,
        type,
        {
          x: this.player.x,
          y: 500,
        }
      );
      this.slashes.add(this.slash);
      this.slash.setScale(0.1);
    }
  }

  initPlayer() {
    this.player = new Player(this, 500, 500);

    this.player.play("player_walk_1");

    this.lasers = this.physics.add.group();
    this.medicines = this.physics.add.group();
    this.laserSound = this.sound.add("blaster", {
      mute: false,
      volume: 0.5,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    });
  }

  initEnemies() {
    this.enemies = this.physics.add.group();
    this.physics.add.collider(
      this.enemies,
      this.lasers,
      this.onHit,
      null,
      this
    );

    this.physics.add.collider(
      this.enemies,
      this.medicines,
      this.onMedcineHit,
      null,
      this
    );

    this.slashes = this.physics.add.group();
    this.physics.add.collider(
      this.player,
      this.slashes,
      this.onBossHit,
      null,
      this
    );
    this.virus = this.add.group();
    this.createEnemies();
  }

  onBossHit(player, slash) {
    this.damageSound.play();
    slash.destroy();
    player.damage(slash.damage);
    //this.player.setTexture("player_damage");
    /*this.time.delayedCall(100, () => {
      this.player.setTexture("player");
    });
    */
  }

  addLaser(laser) {
    this.laser = laser;
    this.laser.addGroup(this.lasers);
    this.laser.setScale(0.25);
    this.laserSound.play();
  }

  addMedicine(medicine) {
    this.medicine = medicine;
    this.medicine.addGroup(this.medicines);
  }

  onHit(enemy, laser) {
    laser.destroy();
    if (enemy.type === "virus") {
      this.impactSound.play();
      enemy.damage();
      console.log("monstruos vivos: " + this.alive_monsters);
      if (enemy.lives == 0) {
        this.alive_monsters--;
      }
    } else if (enemy.type === "human") {
      enemy.mutate();
    }
  }

  onMedcineHit(enemy, medicine) {
    medicine.destroy();

    if (enemy.type === "human") {
      this.impactSound.play();
      enemy.damage();
      console.log("monstruos vivos: " + this.alive_monsters);
      if (enemy.lives == 0) {
        this.alive_monsters--;
      }
    } else {
      enemy.mutate();
    }
  }

  onHitBoss(boss, laser) {
    laser.destroy();
    this.impactSound.play();
    this.boss.recieveDamage(1);
    if (this.boss.life > 0) {
      this.time.delayedCall(100, () => {
        this.boss.setTexture("boss");
      });
    } else {
      this.boss.destroy();
    }
  }

  createEnemies() {
    this.createMonsters();
    this.createHumans();

    /*
    console.log("createEnemies");
    console.log("enemies: " + this.alive_monsters);

    let random_is_virus = Phaser.Math.Between(0, 100);
    let random_level_of_enemy = Phaser.Math.Between(0, 100);

    //Crete new viruses and humans depending on the level
    if (this.level == 1 && this.alive_monsters < 10){
      
      let random_x = Phaser.Math.Between(0, 900);

      //De momento, probabilidad de que sea virus o humano es del 50%
      //Para los niveles del enemigo. Dependera del nivel. Para el nivel 1 solo bichos de nivel 1
      if (random_is_virus >= 50){
        let monster = new Virus(this, random_x, 50, 1, this.enemies);
        monster.play(monster.animation);
        this.alive_monsters = this.alive_monsters + 1;
        this.tweens.timeline({
          targets: monster,
          ease: "Linear",
          duration: 2000,
          tweens: monster.movements,
        });
      }
      else {
        let human = new Human(this, random_x, 50, 1, this.enemies);
        human.play(human.animation);
        this.alive_monsters = this.alive_monsters + 1;
        this.tweens.timeline({
          targets: human,
          ease: "Linear",
          duration: 2000,
          tweens: human.movements,
        });
      }
    }
    else if (this.level == 2 && this.alive_monsters < 20){

    }
    else if (this.level == 3  && this.alive_monsters < 30){

    }
    else if (this.level == 4 && this.alive_monsters < 40){

    }
    else if (this.level == 5 && this.alive_monsters < 50){

    }
    else if (this.level == 6 && this.alive_monsters < 60){

    }
    else if (this.level == 7 && this.alive_monsters < 70){

    }
    */
  }

  createMonsters() {
    
    for (let x = 50; x < 900; x = x + 100) {
      for (let y = 50; y < 150; y = y + 50) {
        let monster = new Virus(this, x, y, 1, this.enemies);
        monster.play(monster.animation);
        this.alive_monsters = this.alive_monsters + 1;
        this.tweens.timeline({
          targets: monster,
          ease: "Linear",
          duration: 2000,
          tweens: monster.movements,
        });
      }
    }
  }

  createHumans() {
    let human = new Human(this, 200, 150, 1, this.enemies);
    human.play(human.animation);
    //human.play("human_walk_1");
    this.alive_monsters = this.alive_monsters + 1;
    this.tweens.timeline({
      targets: human,
      ease: "Linear",
      duration: 2000,
      tweens: human.movements,
    });

    for (let x = 200; x < 200; x = x + 40) {
      for (let y = 50; y < 150; y = y + 50) {}
    }

    console.log("Bichos vivos iniciales: " + this.alive_monsters);
  }

  game_over() {
    this.boss.destroy();
    this.player.setVisible(false);
    this.slashes.getChildren().forEach((slash) => {
      this.slashes.killAndHide(slash);
    });
    let lose = this.add.image(450, 250, "level_lose").setDepth(1);
    lose.setInteractive();
    lose.on("pointerup", () => {
      this.scene.start("map", ["lose", this.level, this.inventory]);
      this.levelSong.stop();
    });
  }

  
  addSounds() {
    this.levelSong = this.sound.add("level", {
      mute: false,
      volume: 2,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    });

    this.impactSound = this.sound.add("explosion", {
      mute: false,
      volume: 0.2,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    });

    this.damageSound = this.sound.add("damage", {
      mute: false,
      volume: 0.2,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    });
  }

  createAnimations() {
    //Players
    this.anims.create({
      key: "player_walk_1",
      frames: this.anims.generateFrameNumbers("player_1"),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "player_walk_2",
      frames: this.anims.generateFrameNumbers("player_2"),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "player_walk_3",
      frames: this.anims.generateFrameNumbers("player_3"),
      frameRate: 5,
      repeat: -1,
    });

    //Virus
    this.anims.create({
      key: "virus_1",
      frames: this.anims.generateFrameNumbers("V1"),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "virus_2",
      frames: this.anims.generateFrameNumbers("V2"),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "virus_3",
      frames: this.anims.generateFrameNumbers("V3"),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "virus_4",
      frames: this.anims.generateFrameNumbers("V4"),
      frameRate: 5,
      repeat: -1,
    });

    //Infected humans
    this.anims.create({
      key: "human_walk_1",
      frames: this.anims.generateFrameNumbers("H1"),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "human_walk_2",
      frames: this.anims.generateFrameNumbers("H2"),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "human_walk_3",
      frames: this.anims.generateFrameNumbers("H3"),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "human_walk_4",
      frames: this.anims.generateFrameNumbers("H4"),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "human_walk_5",
      frames: this.anims.generateFrameNumbers("H5"),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "human_walk_6",
      frames: this.anims.generateFrameNumbers("H6"),
      frameRate: 5,
      repeat: -1,
    });
  }

  load_spritesheets(){
    //Infected humans
    this.load.spritesheet("H1", "/sprites/Humans/H1.png", {
      frameWidth: 50,
      frameHeight: 50,
    });
    this.load.spritesheet("H2", "/sprites/Humans/H2.png", {
      frameWidth: 50,
      frameHeight: 50,
    });
    this.load.spritesheet("H3", "/sprites/Humans/H3.png", {
      frameWidth: 50,
      frameHeight: 50,
    });
    this.load.spritesheet("H4", "/sprites/Humans/H4.png", {
      frameWidth: 50,
      frameHeight: 50,
    });
    this.load.spritesheet("H5", "/sprites/Humans/H5.png", {
      frameWidth: 50,
      frameHeight: 50,
    });
    this.load.spritesheet("H6", "/sprites/Humans/H6.png", {
      frameWidth: 50,
      frameHeight: 50,
    });

    //Virus
    this.load.spritesheet("V1", "/sprites/Virus/V1.png", {
      frameWidth: 50,
      frameHeight: 50,
    });
    this.load.spritesheet("V2", "/sprites/Virus/V2.png", {
      frameWidth: 50,
      frameHeight: 50,
    });
    this.load.spritesheet("V3", "/sprites/Virus/V3.png", {
      frameWidth: 50,
      frameHeight: 50,
    });
    this.load.spritesheet("V4", "/sprites/Virus/V4.png", {
      frameWidth: 50,
      frameHeight: 50,
    });

    //Players
    this.load.spritesheet("player_1", "/sprites/Players/player_1.png", {
      frameWidth: 50,
      frameHeight: 50,
    });
    this.load.spritesheet("player_2", "/sprites/Players/player_2.png", {
      frameWidth: 50,
      frameHeight: 50,
    });
    this.load.spritesheet("player_3", "/sprites/Players/player_3.png", {
      frameWidth: 50,
      frameHeight: 50,
    });
  }

  load_images(){
    this.load.image("player", "/sprites/ship.png");
    this.load.image("player_damage", "/sprites/ship_damage.png");
    this.load.image("laser", "/sprites/laser.png");
    this.load.image("boss", "/sprites/boss1.png");
    this.load.image("boss_damage", "/sprites/boss1_damage.png");
    this.load.image("slash1", "/sprites/slash1.png");
    this.load.image("slash2", "/sprites/slash2.png");
    this.load.image("level_victory", "/sprites/level_victory.png");
    this.load.image("level_lose", "you_lose.png");
    this.load.image("mask", "/sprites/mascarilla.png");
    this.load.image("V1-damage", "/sprites/Virus/V1_damage.png");
    this.load.image("V2-damage", "/sprites/Virus/V2_damage.png");
    this.load.image("V3-damage", "/sprites/Virus/V3_damage.png");
    this.load.image("V4-damage", "/sprites/Virus/V4_damage.png");
  }

  load_audio(){
    this.load.audio("blaster", "/sounds/blaster.mp3");
    this.load.audio("explosion", "/sounds/explosion.mp3");
    this.load.audio("level", "/sounds/level1_song.mp3");
    this.load.audio("damage", "/sounds/damage.mp3");
  }
}

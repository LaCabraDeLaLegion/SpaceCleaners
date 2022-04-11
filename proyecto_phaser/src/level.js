import Player from "./player.js";
import Boss from "./boss.js";
import Slash from "./slash.js";
import Virus from "./enemies/virus.js";
import Human from "./enemies/human.js";
import Shield from "./weapons/consumibles/shield.js";
import Potion from "./weapons/consumibles/potion.js";
import Bomb from "./weapons/consumibles/bomb.js";

export default class Level extends Phaser.Scene {

  constructor() {
    super({ key: "level" });
  }

  init(data) {
    console.log("Nivel = " + data[0]);
    this.level = data[0];
    //this.inventory = data[1];
    this.inventory = {skin: "player_1", shield: ["basic_shield", 5], potion: ["basic_potion", 10], bomb: ["basic_bomb", 2]};
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
      let victory = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "level_victory").setDepth(1);
      victory.setInteractive();
      victory.on("pointerup", () => {
        this.scene.start("map", ["win", this.level]);
        this.levelSong.stop();
      });
    }

    this.enemies.getChildren().forEach((enemy) => {
      if (enemy.y >= this.cameras.main.height) {
        this.player.setVisible(false);
        let lose = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "level_lose").setDepth(1);
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
          y: this.player.y,
        }
      );
      this.slashes.add(this.slash);
      this.slash.setScale(0.1);
    }
  }

  initPlayer() {
    this.player = new Player(this, 500, 500, this.inventory);
    this.player.play("player_walk_1");
    this.lasers = this.physics.add.group();
    this.bombs = this.physics.add.group();
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
      this.bombs,
      this.onBombHit,
      null,
      this
    );

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
    this.impactSound.play();
    enemy.weapon_hit();
    console.log("monstruos vivos: " + this.alive_monsters);
    if (enemy.lives == 0) {
      this.alive_monsters--;
    }
  }

  onMedcineHit(enemy, medicine) {
    medicine.destroy();
    this.impactSound.play();
    enemy.medicine_hit();
    console.log("monstruos vivos: " + this.alive_monsters);
    if (enemy.lives == 0) {
      this.alive_monsters--;
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
  }

  createMonsters() {

    if (this.level == 1){

      this.alive_monsters = 30;

      // Grupo 1

      let monster = new Virus(this, 450, 50, 1, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 500, 50, 1, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 600, 50, 1, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 650, 50, 1, this.enemies, this.level);
      monster.play(monster.animation);
      
      monster = new Virus(this, 450, 100, 1, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 500, 100, 1, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 600, 100, 1, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 650, 100, 1, this.enemies, this.level);
      monster.play(monster.animation);

      //Grupo 2
      monster = new Virus(this, 150, -50, 1, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 200, -50, 1, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 300, -50, 1, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 350, -50, 1, this.enemies, this.level);
      monster.play(monster.animation);
      
      monster = new Virus(this, 150, -100, 1, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 200, -100, 1, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 300, -100, 1, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 350, -100, 1, this.enemies, this.level);
      monster.play(monster.animation);


      //Grupo 3
      monster = new Virus(this, 50, -250, 1, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 100, -250, 1, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 200, -250, 1, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 250, -250, 1, this.enemies, this.level);
      monster.play(monster.animation);

    }
    else if (this.level == 2){

      this.alive_monsters = 40;

      //Grupo 1
      let monster = new Virus(this, 100, -100, 1, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 150, -100, 1, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 250, -100, 1, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 300, -100, 1, this.enemies, this.level);
      monster.play(monster.animation);
    
      monster = new Virus(this, 100, -50, 1, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 150, -50, 1, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 250, -50, 1, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 300, -50, 1, this.enemies, this.level);
      monster.play(monster.animation);

      //Grupo 2
      monster = new Virus(this, 100, -250, 1, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 150, -250, 1, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 250, -250, 1, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 300, -250, 1, this.enemies, this.level);
      monster.play(monster.animation);

      monster = new Virus(this, 100, -200, 1, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 150, -200, 1, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 250, -200, 1, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 300, -200, 1, this.enemies, this.level);
      monster.play(monster.animation);

      //Grupo 3

      monster = new Virus(this, 100, -400, 2, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 150, -400, 2, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 250, -400, 2, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 300, -400, 2, this.enemies, this.level);
      monster.play(monster.animation);

    }
    else if (this.level == 3){

      this.alive_monsters = 50;

      //Grupo 1
      let monster = new Virus(this, 50, -100, 1, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 100, -100, 1, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 250, -100, 1, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 300, -100, 1, this.enemies, this.level);
      monster.play(monster.animation);
    
      monster = new Virus(this, 50, -50, 2, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 100, -50, 2, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 250, -50, 2, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 300, -50, 2, this.enemies, this.level);
      monster.play(monster.animation);

      //Grupo 2
      monster = new Virus(this, 50, -250, 2, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 100, -250, 2, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 300, -250, 2, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 350, -250, 2, this.enemies, this.level);
      monster.play(monster.animation);

      monster = new Virus(this, 50, -200, 2, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 100, -200, 2, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 300, -200, 2, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 350, -200, 2, this.enemies, this.level);
      monster.play(monster.animation);

      //Grupo 3

      monster = new Virus(this, 100, -450, 2, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 150, -450, 2, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 300, -450, 2, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 350, -450, 2, this.enemies, this.level);
      monster.play(monster.animation);

      monster = new Virus(this, 150, -400, 3, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 300, -400, 3, this.enemies, this.level);
      monster.play(monster.animation);

      //Grupo 4

      monster = new Virus(this, 150, -550, 3, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 200, -550, 3, this.enemies, this.level);
      monster.play(monster.animation);
      monster = new Virus(this, 250, -550, 3, this.enemies, this.level);
      monster.play(monster.animation);
    }
    else if (this.level == 4){

    }
    else if (this.level == 5){


    }
    else if (this.level == 6){

    }
    else if (this.level == 7){

    }


  }

  createHumans() {

    if (this.level == 1){
     
      //Grupo 1
      let human = new Human(this, 550, 50, 1, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 550, 100, 1, this.enemies, this.level);
      human.play(human.animation);

      //Grupo 2
      human = new Human(this, 250, -100, 1, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 250, -50, 1, this.enemies, this.level);
      human.play(human.animation);

      //Grupo 3
      human = new Human(this, 150, -250, 1, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 50, -200, 1, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 100, -200, 1, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 150, -200, 1, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 200, -200, 1, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 250, -200, 1, this.enemies, this.level);
      human.play(human.animation);
    }
    else if (this.level == 2){

      //Grupo 1
      let human = new Human(this, 50, -100, 1, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 200, -100, 1, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 350, -100, 1, this.enemies, this.level);
      human.play(human.animation);

      human = new Human(this, 50, -50, 1, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 200, -50, 1, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 350, -50, 1, this.enemies, this.level);
      human.play(human.animation);

      //Grupo 2

      human = new Human(this, 50, -250, 1, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 200, -250, 1, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 350, -250, 1, this.enemies, this.level);
      human.play(human.animation);

      human = new Human(this, 200, -200, 1, this.enemies, this.level);
      human.play(human.animation);

      //Grupo 3

      human = new Human(this, 50, -400, 2, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 50, -400, 2, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 50, -400, 2, this.enemies, this.level);
      human.play(human.animation);

      human = new Human(this, 50, -350, 2, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 100, -350, 2, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 150, -350, 2, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 200, -350, 2, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 250, -350, 2, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 300, -350, 2, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 350, -350, 2, this.enemies, this.level);
      human.play(human.animation);

    }
    else if (this.level == 3){

      //Grupo 1

      let human = new Human(this, 150, -100, 1, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 200, -100, 1, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 150, -50, 2, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 200, -50, 2, this.enemies, this.level);
      human.play(human.animation);

      //Grupo 2

      human = new Human(this, 150, -250, 2, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 200, -250, 2, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 250, -250, 2, this.enemies, this.level);
      human.play(human.animation);

      human = new Human(this, 150, -200, 2, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 200, -200, 2, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 250, -200, 2, this.enemies, this.level);
      human.play(human.animation);

      //Grupo 3

      human = new Human(this, 50, -450, 3, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 200, -450, 2, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 250, -450, 2, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 400, -450, 3, this.enemies, this.level);
      human.play(human.animation);

      human = new Human(this, 150, -400, 3, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 200, -400, 3, this.enemies, this.level);
      human.play(human.animation);

      human = new Human(this, 150, -350, 3, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 200, -350, 3, this.enemies, this.level);
      human.play(human.animation);

      //Grupo 4

      human = new Human(this, 50, -600, 3, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 100, -600, 3, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 150, -600, 3, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 200, -600, 3, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 250, -600, 3, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 300, -600, 3, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 350, -600, 3, this.enemies, this.level);
      human.play(human.animation);

      human = new Human(this, 100, -550, 3, this.enemies, this.level);
      human.play(human.animation);
      human = new Human(this, 300, -550, 3, this.enemies, this.level);
      human.play(human.animation);

    }
    else if (this.level == 4){

    }
    else if (this.level == 5){

    }
    else if (this.level == 6){

    }
    else if (this.level == 7){

    }

    console.log("Bichos vivos iniciales: " + this.alive_monsters);
  }

  createShield(){
    this.inventory.shield[1]--;
    //let shield = new Shield(this.player.x, this.player.y, this.inventory.shield[0]);
  }

  usePotion(){
    this.inventory.potion[1]--;
    if (this.inventory.potion[0] == "basic_potion"){
      this.player.lives++;
    }
  }

  useBomb(){
    this.inventory.bomb[1]--;
    let bomba = new Bomb(this, this.player.x, this.player.y + 20, this.inventory.bomb[0]);
    this.bombs.add(bomba); 
  }

  onBombHit(enemy, bomb){
    this.enemies.getChildren().forEach((child) => {
      if (child.y > 0 && Phaser.Math.Difference(child.x, bomb.x) < bomb.range && Phaser.Math.Difference(child.y, bomb.y) < bomb.range){
        child.lives -= bomb.damage;
        if (child.lives <= 0){
          this.alive_monsters--;
        }
      }
    }, this);
    let expl = this.add.sprite(enemy.x, enemy.y, "explosion");
    expl.setScale(3);
    expl.play("explode");
    expl.on('animationcomplete', () => {
      expl.destroy();
    })
    bomb.destroy();
  }


  game_over() {
    this.boss.destroy();
    this.player.setVisible(false);
    this.slashes.getChildren().forEach((slash) => {
      this.slashes.killAndHide(slash);
    });
    let lose = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "level_lose").setDepth(1);
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

    //Explosion
    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 5,
    });
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
      key: "virus_1_damage",
      frames: this.anims.generateFrameNumbers("V1_damage"),
      frameRate: 15,
      repeat: 0,
    });
    this.anims.create({
      key: "virus_1_death",
      frames: this.anims.generateFrameNumbers("V1_death"),
      frameRate: 20,
      repeat: 0,
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
    this.anims.create({
      key: "virus_5",
      frames: this.anims.generateFrameNumbers("V5"),
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

    //Explosions
    this.load.spritesheet("explosion", "/sprites/consumibles/explosion.png", {
      frameWidth: 50,
      frameHeight: 50,
    });
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
    this.load.spritesheet("V1_damage", "/sprites/Virus/V1_damage.png", {
      frameWidth: 50,
      frameHeight: 50,
    });
    this.load.spritesheet("V1_death", "/sprites/Virus/V1_death.png", {
      frameWidth: 70,
      frameHeight: 70,
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
    this.load.spritesheet("V5", "/sprites/Virus/V5.png", {
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
    this.load.image("V5-damage", "/sprites/Virus/V5_damage.png");
    this.load.image("basic_bomb", "/sprites/consumibles/basic_bomb.png")
  }

  load_audio(){
    this.load.audio("blaster", "/sounds/blaster.mp3");
    this.load.audio("explosion", "/sounds/explosion.mp3");
    this.load.audio("level", "/sounds/level1_song.mp3");
    this.load.audio("damage", "/sounds/damage.mp3");
  }
}

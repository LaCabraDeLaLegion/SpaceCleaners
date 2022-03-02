import Player from "./player.js";
import Laser from "./laser.js";
import Enemy from "./enemy.js";
import Boss from "./boss.js";
import Slash from "./slash.js";
import Medicine from "./medicine.js";

export default class Level extends Phaser.Scene {
  constructor() {
    super({ key: "level" });
    this.level = 1;
  }

  init(data) {
    console.log("Nivel = " + data);
  }

  preload() {
    this.load.setPath("assets/");

    //Images
    this.load.image("player", "/sprites/ship.png");
    this.load.image("player_damage", "/sprites/ship_damage.png");
    this.load.image("laser", "/sprites/laser.png");
    this.load.image("V1", "/sprites/V1.png");
    this.load.image("boss", "/sprites/boss1.png");
    this.load.image("boss_damage", "/sprites/boss1_damage.png");
    this.load.image("slash1", "/sprites/slash1.png");
    this.load.image("slash2", "/sprites/slash2.png");
    this.load.image("level_victory", "/sprites/level_victory.png");
    this.load.image("mask", "/sprites/mascarilla.png");

    //Spritesheets -------------------------------------------------------------

    //Humans
    this.load.spritesheet("H1", "/sprites/Humans/H1.png", {
      frameWidth: 50,
      frameHeight: 50
    });
    this.load.spritesheet("H2", "/sprites/Humans/H2.png", {
      frameWidth: 50,
      frameHeight: 50
    });
    this.load.spritesheet("H3", "/sprites/Humans/H3.png", {
      frameWidth: 50,
      frameHeight: 50
    });
    this.load.spritesheet("H4", "/sprites/Humans/H4.png", {
      frameWidth: 50,
      frameHeight: 50
    });
    this.load.spritesheet("H5", "/sprites/Humans/H5.png", {
      frameWidth: 50,
      frameHeight: 50
    });
    this.load.spritesheet("H6", "/sprites/Humans/H6.png", {
      frameWidth: 50,
      frameHeight: 50
    });

    //Players
    this.load.spritesheet("player_1", "/sprites/Players/player_1.png", {
      frameWidth: 50,
      frameHeight: 50
    });
    this.load.spritesheet("player_2", "/sprites/Players/player_2.png", {
      frameWidth: 50,
      frameHeight: 50
    });
    this.load.spritesheet("player_3", "/sprites/Players/player_3.png", {
      frameWidth: 50,
      frameHeight: 50
    });

    //Audio -------------------------------------------------------------------
    this.load.audio("blaster", "/sounds/blaster.mp3");
    this.load.audio("explosion", "/sounds/explosion.mp3");
    this.load.audio("level", "/sounds/level1_song.mp3");
    this.load.audio("damage", "/sounds/damage.mp3");
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
  }

  addSounds(){

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

  createAnimations(){

    //Players
    this.anims.create({
      key: 'player_walk_1',
      frames: this.anims.generateFrameNumbers("player_1"),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: 'player_walk_2',
      frames: this.anims.generateFrameNumbers("player_2"),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: 'player_walk_3',
      frames: this.anims.generateFrameNumbers("player_3"),
      frameRate: 5,
      repeat: -1
    });

    //Infected humans
    this.anims.create({
      key: 'human_walk_1',
      frames: this.anims.generateFrameNumbers("H1"),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: 'human_walk_2',
      frames: this.anims.generateFrameNumbers("H2"),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: 'human_walk_3',
      frames: this.anims.generateFrameNumbers("H3"),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: 'human_walk_4',
      frames: this.anims.generateFrameNumbers("H4"),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: 'human_walk_5',
      frames: this.anims.generateFrameNumbers("H5"),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: 'human_walk_6',
      frames: this.anims.generateFrameNumbers("H6"),
      frameRate: 5,
      repeat: -1
    });

  }

  update() {
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

    this.slashes;
  }

  startBossBattle() {
    this.boss = new Boss(this, 420, -50);
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

    this.player.play('player_walk_1');

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

  addLaser() {
    this.laser = new Laser(
      this,
      this.player.x,
      this.player.y - 50,
      this.lasers
    );
    this.laser.setScale(0.25);
    this.laserSound.play();
  }

  addMedicine(){
    this.medicine = new Medicine(this, this.player.x, this.player.y - 50, this.medicines);
  }

  onHit(enemy, laser) {
    laser.destroy();

    if (enemy.type === "monster") {
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

  onMedcineHit(enemy, medicine){
    
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
    this.boss.setTexture("boss_damage");
    this.time.delayedCall(100, () => {
      this.boss.setTexture("boss");
    });

    this.boss.recieveDamage(1);
  }

  createEnemies() {
    this.createMonsters();
    this.createHumans();
  }

  createMonsters() {
    for (let x = 100; x < 200; x = x + 40) {
      for (let y = 50; y < 150; y = y + 50) {
        let monster = new Enemy(this, x, y, "monster", 1, this.enemies);
        monster.setScale(3);
        this.virus.add(this.add.sprite(monster));
        this.alive_monsters = this.alive_monsters + 1;
        this.tweens.timeline({
          targets: monster,
          ease: "Linear",
          duration: 2000,
          tweens: monster.getMovements(),
        });
      }
    }
  }

  createHumans() {

    let human = new Enemy(this, 200, 150, "human", 1, this.enemies);

    this.alive_monsters = this.alive_monsters + 1;

    human.play('human_walk_1');

    this.tweens.timeline({
      targets: human,
      ease: "Linear",
      duration: 2000,
      tweens: human.getMovements(),
    });

    for (let x = 200; x < 200; x = x + 40) {
      for (let y = 50; y < 150; y = y + 50) {
        
      }
    }

    console.log("Bichos vivos iniciales: " + this.alive_monsters);
  }

  game_over() {
    this.scene.start("map", ["lose", this.level]);
  }
}

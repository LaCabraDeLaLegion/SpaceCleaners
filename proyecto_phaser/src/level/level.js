import Player from "../player.js";
import Boss from "../boss.js";
import Sound from "../data/sounds.js";
import Bomb from "../weapons/consumibles/bomb.js";
import Anim_Factory from "./anim_factory.js";

export default class Level extends Phaser.Scene {
  constructor(key) {
    super({ key });
  }

  // PHASER METHODS
  init(data) {
    this.inventory = {
      skin: "player_1",
      shield: ["basic_shield", 5],
      potion: ["basic_potion", 10],
      bomb: ["basic_bomb", 2],
    };
  }

  preload() {
    this.load.setPath("assets/");
    this.load_spritesheets();
  }

  create() {
    this.input.setDefaultCursor("url(assets/sprites/cursor.cur), pointer");

    this.gameOver = false;
    this.alive_monsters = 0;
    this.bossInScene = false;
    this.maxProjectiles = 10;
    this.projectilesOnScreen = 0;
    this.globalWidth = this.cameras.main.width;
    this.globalHeight = this.cameras.main.height;

    this.createAnimations();
    this.initPlayer();
  }

  update() {
    let destroy = false;

    if (this.alive_monsters <= 0 && !this.bossInScene) {
      this.startBossBattle();
    } else if (this.bossInScene && this.boss.life <= 0) {
      let victory = this.add
        .image(this.globalWidth / 2, this.globalHeight / 2, "level_victory")
        .setDepth(1);
      victory.setInteractive();
      victory.on("pointerup", () => {
        this.scene.start("map", ["win", this.level]);
        this.levelSong.stop();
      });
    }

    this.enemies.getChildren().forEach((enemy) => {
      if (enemy.y >= this.globalHeight) {
        this.player.setVisible(false);
        let lose = this.add
          .image(this.globalWidth / 2, this.globalHeight / 2, "level_lose")
          .setDepth(1);
        lose.setInteractive();
        lose.on("pointerup", () => {
          this.scene.start("map", ["lose", this.level, this.inventory]);
          this.levelSong.stop();
        });
        destroy = true;
      }
    });

    if (destroy) this.destroy_enemies();
  }

  // INIT
  createAnimations() {
    //Explosion
    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 5,
    });
    this.createEnemyAnims();
  }

  initPlayer() {
    this.player = new Player(this, 500, 500, this.inventory);
    this.lasers = this.physics.add.group();
    this.bombs = this.physics.add.group();
    this.medicines = this.physics.add.group();
    this.laserSound = this.sound.add("blaster", Sound.blaster);
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
      this.onMedicineHit,
      null,
      this
    );
  }

  addSounds() {
    this.impactSound = this.sound.add("explosion", Sound.explosion);
    this.damageSound = this.sound.add("damage", Sound.damage);
  }

  // ENEMIES
  createEnemyAnims() {
    for (let i = 0; i < this.level_virus.length; i++)
      Anim_Factory.virus_anims(this, this.level_virus[i]);

    for (let i = 0; i < this.level_humans.length; i++)
      Anim_Factory.humans_anims(this, this.level_humans[i]);
  }

  destroy_enemies() {
    this.enemies.getChildren().forEach((enemy) => {
      this.enemies.killAndHide(enemy);
    });
  }

  startBossBattle() {
    this.boss = new Boss(this, 420, -50, this.level);
    this.physics.add.collider(
      this.boss,
      this.lasers,
      this.onHitBoss,
      null,
      this
    );
    this.bossInScene = true;
  }

  onHitBoss(boss, laser) {
    laser.destroy();
    this.impactSound.play();
    this.boss.recieveDamage(1);
    if (this.boss.life > 0) {
      this.boss.setTexture(this.boss.damage_image);
      this.time.delayedCall(100, () => {
        this.boss.setTexture(this.boss.image);
      });
    } else {
      this.boss.setTexture(this.boss.death_image);
      this.time.delayedCall(100, () => {
        this.boss.destroy();
      });
    }
  }

  // PLAYER ACTIONS
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

  createShield() {
    this.inventory.shield[1]--;
  }

  usePotion() {
    this.inventory.potion[1]--;
    if (this.inventory.potion[0] == "basic_potion") this.player.lives++;
  }

  useBomb() {
    this.inventory.bomb[1]--;
    let bomba = new Bomb(
      this,
      this.player.x,
      this.player.y + 20,
      this.inventory.bomb[0]
    );
    this.bombs.add(bomba);
  }

  onMedicineHit(enemy, medicine) {
    this.impactSound.play();
    medicine.destroy();
    enemy.medicine_hit();
    // console.log("monstruos vivos: " + this.alive_monsters);
    if (enemy.lives == 0) this.alive_monsters--;
  }

  onHit(enemy, laser) {
    this.impactSound.play();
    laser.destroy();
    enemy.weapon_hit();
    // console.log("monstruos vivos: " + this.alive_monsters);
    if (enemy.lives == 0) this.alive_monsters--;
  }

  onBombHit(enemy, bomb) {
    this.enemies.getChildren().forEach((child) => {
      if (
        child.y > 0 &&
        Phaser.Math.Difference(child.x, bomb.x) < bomb.range &&
        Phaser.Math.Difference(child.y, bomb.y) < bomb.range
      ) {
        child.lives -= bomb.damage;
        if (child.lives <= 0) {
          this.alive_monsters--;
        }
      }
    }, this);
    let expl = this.add.sprite(enemy.x, enemy.y, "explosion");
    expl.setScale(3);
    expl.play("explode");
    expl.on("animationcomplete", () => {
      expl.destroy();
    });
    bomb.destroy();
  }

  //OTHERS
  game_over() {
    this.gameOver = true;
    this.boss.destroy();
    this.player.setVisible(false);

    let lose = this.add
      .image(this.globalWidth / 2, this.globalHeight / 2, "level_lose")
      .setDepth(1);
    lose.setInteractive();
    lose.on("pointerup", () => {
      this.scene.start("map", ["lose", this.level, this.inventory]);
      this.levelSong.stop();
    });
  }

  // LOAD SECTION
  load_spritesheets() {
    //Explosions
    this.load.spritesheet("explosion", "/sprites/consumibles/explosion.png", {
      frameWidth: 50,
      frameHeight: 50,
    });
    try {
      this.load_player_spritesheets();
      this.load_enemies_spritesheets();
    } catch (error) {
      console.log(error.message);
      console.log(error.stack);
    }
  }

  load_player_spritesheets() {
    Anim_Factory.player_spritesheets(this, this.inventory.skin);
  }

  load_enemies_spritesheets() {
    for (let i = 0; i < this.level_virus.length; i++)
      Anim_Factory.virus_spritesheets(this, this.level_virus[i]);

    for (let i = 0; i < this.level_humans.length; i++)
      Anim_Factory.humans_spritesheets(this, this.level_humans[i]);
  }

  load_images() {
    this.load.image("player", "/sprites/ship.png");
    this.load.image("player_damage", "/sprites/ship_damage.png");
    this.load.image("boss", "/sprites/boss1.png");
    this.load.image("boss_damage", "/sprites/boss1_damage.png");
    this.load.image("slash", "/sprites/slash.png");
    this.load.image("super_slash", "/sprites/super_slash.png");
    this.load.image("plasma", "/sprites/plasma.png");
    this.load.image("level_victory", "/sprites/level_victory.png");
    this.load.image("level_lose", "you_lose.png");

    //Medicinas
    this.load.image("mask", "/sprites/Medicinas/mascarilla.png");
    this.load.image("tablet", "/sprites/Medicinas/tablet.png");
    this.load.image("gel", "/sprites/Medicinas/water_drop.png");

    //Armas
    this.load.image("laser", "/sprites/Armas/laser.png");
    this.load.image("fire", "/sprites/Armas/fire.png");
    this.load.image("bullet", "/sprites/Armas/bullet.png");

    //Virus
    //this.load.image("V1-damage", "/sprites/Virus/V1_damage.png");
    //this.load.image("V2-damage", "/sprites/Virus/V2_damage.png");
    //this.load.image("V3-damage", "/sprites/Virus/V3_damage.png");
    //this.load.image("V4-damage", "/sprites/Virus/V4_damage.png");
    //this.load.image("V5-damage", "/sprites/Virus/V5_damage.png");
    //this.load.image("V6-damage", "/sprites/Virus/V6_damage.png");

    //Consumibles
    this.load.image("basic_bomb", "/sprites/consumibles/basic_bomb.png");
    this.load.image("basic_shield", "/sprites/consumibles/shield.png");
    this.load.image("basic_kit", "/sprites/consumibles/first_aid.png");

    //Bosses
    this.load.image("B1", "/sprites/Boss/B1.png");
    this.load.image("B2", "/sprites/Boss/B2.png");
    this.load.image("B3", "/sprites/Boss/B3.png");
    this.load.image("B4", "/sprites/Boss/B4.png");
    this.load.image("B5", "/sprites/Boss/B5.png");
    this.load.image("B6", "/sprites/Boss/B6.png");
    this.load.image("B7", "/sprites/Boss/B7.png");
    this.load.image("B1_damage", "/sprites/Boss/B1_damage.png");
    this.load.image("B2_damage", "/sprites/Boss/B2_damage.png");
    this.load.image("B3_damage", "/sprites/Boss/B3_damage.png");
    this.load.image("B4_damage", "/sprites/Boss/B4_damage.png");
    this.load.image("B5_damage", "/sprites/Boss/B5_damage.png");
    this.load.image("B6_damage", "/sprites/Boss/B6_damage.png");
    this.load.image("B7_damage", "/sprites/Boss/B7_damage.png");
    this.load.image("B1_death", "/sprites/Boss/B1_death.png");
    this.load.image("B2_death", "/sprites/Boss/B2_death.png");
    this.load.image("B3_death", "/sprites/Boss/B3_death.png");
    this.load.image("B4_death", "/sprites/Boss/B4_death.png");
    this.load.image("B5_death", "/sprites/Boss/B5_death.png");
    this.load.image("B6_death", "/sprites/Boss/B6_death.png");
    this.load.image("B7_death", "/sprites/Boss/B7_death.png");
  }

  load_audio() {
    this.load.audio("blaster", "/sounds/blaster.mp3");
    this.load.audio("explosion", "/sounds/explosion.mp3");
    this.load.audio("damage", "/sounds/damage.mp3");
  }
}

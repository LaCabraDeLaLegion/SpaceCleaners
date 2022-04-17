import Player from "../player.js";
import Boss from "../boss.js";
import Sound from "../data/sounds.js";
import Bomb from "../weapons/consumibles/bomb.js";
import Attack from "../attacks/factory/attacks_enum.js";

export default class Level extends Phaser.Scene {
  constructor(key) {
    super({ key });
  }

  // PHASER METHODS
  init(data) {
    console.log("DATA", data[1]);

    this.inventory = {
      skin: "player_1",
      weapon: { name: "Basic Weapon", attack: Attack.Weapon1 },
      shield: { name: "basic shield", quantity: 0, quantity: 3, time: 200 },
      potion: { name: "basic potion", quantity: 3, health: 2 },
      bombs: { name: "basic bomb", quantity: 2, damage: 2 },
    };
    //this.inventory = data[1];
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
  initPlayer() {
    this.player = new Player(this, 500, 500, this.inventory);
    this.lasers = this.physics.add.group();
    this.bombs = this.physics.add.group();
    this.medicines = this.physics.add.group();
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
    this.gameOverSound = this.sound.add("game_over", Sound.gameOver);
  }

  // ENEMIES
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

  addMedicine(medicine) {
    this.medicine = medicine;
    this.medicine.addGroup(this.medicines);
  }

  createShield() {
    if (this.inventory.shield.quantity > 0) {
      this.inventory.shield.quantity--;
    }
  }

  usePotion() {
    if (this.inventory.potion.quantity > 0) {
      this.player.lives += this.inventory.potion.health;
      this.inventory.potion.quantity--;
    }
  }

  useBomb() {
    if (this.inventory.bombs.quantity > 0) {
      this.inventory.bombs.quantity--;
      let bomba = new Bomb(
        this,
        this.player.x,
        this.player.y + 20,
        this.inventory.bombs.name
      );
      this.bombs.add(bomba);
    }
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
    this.levelSong.stop();
    this.gameOverSound.play();
    if (this.bossInScene) this.boss.destroy();
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
}

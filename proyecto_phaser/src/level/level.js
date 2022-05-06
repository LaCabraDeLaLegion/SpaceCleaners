import Player from "../player.js";
import Boss from "../boss.js";
import Boss2 from "../bosses/boss2.js";
import Boss3 from "../bosses/boss3.js";
import Boss4 from "../bosses/boss4.js"
import Sound from "../data/sounds.js";
import Bomb from "../weapons/consumibles/bomb.js";

export default class Level extends Phaser.Scene {
  constructor(key) {
    super({ key });
  }

  // PHASER METHODS
  init(data) {
    console.log("DATA", data[0]);

    this.inventory = data[0];
    this.equipedInventory = {
      skin: this.inventory["others"].subcategories["skins"].items.find((i) => i.equiped === true),
      weapon: this.inventory["weapons"].subcategories["lasers"].items.find((i) => i.equiped === true),
      medicine: this.inventory["weapons"].subcategories["medicines"].items.find((i) => i.equiped === true),
      shield: this.inventory["consumibles"].subcategories["shields"].items.find((i) => i.equiped === true),
      potion: this.inventory["consumibles"].subcategories["potions"].items.find((i) => i.equiped === true),
      bomb: this.inventory["consumibles"].subcategories["bombs"].items.find((i) => i.equiped === true),
    };

    this.virus_killed = 0;
    this.humans_healed = 0;
  }

  create() {
    this.gameOver = false;
    this.alive_monsters = 0;
    this.bossInScene = false;
    this.maxProjectiles = 10;
    this.projectilesOnScreen = 0;
    this.globalWidth = this.cameras.main.width;
    this.globalHeight = this.cameras.main.height;
    this.fontStyle = {
      fontFamily: "GameFont",
      fontSize: "32px",
    };

    this.initPlayer();
    this.initUI();
  }

  update() {
    let destroy = false;

    if (this.alive_monsters <= 0 && !this.bossInScene) {
      this.startBossBattle();
    } else if (this.bossInScene && this.boss.life <= 0) {
      let victory = this.add
        .image(this.globalWidth / 2, this.globalHeight / 2, "level_victory")
        .setDepth(1);
      victory.setInteractive({
        cursor: "url(assets/cursors/selector.cur), pointer",
      });
      victory.on("pointerup", () => {
        this.inventory.money += this.reward;
        this.scene.start("details", [
          "win",
          this.level,
          this.inventory,
          this.virus_killed,
          this.humans_healed,
          this.reward,
        ]);
        this.bossSong.stop();
      });
    }

    this.enemies.getChildren().forEach((enemy) => {
      if (enemy.y >= this.globalHeight) {
        this.player.setVisible(false);
        let lose = this.add
          .image(this.globalWidth / 2, this.globalHeight / 2, "level_lose")
          .setDepth(1);
        lose.setInteractive({
          cursor: "url(assets/cursors/selector.cur), pointer",
        });
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
    this.player = new Player(this, 500, 500, this.equipedInventory);
    this.lasers = this.physics.add.group();
    this.bombs = this.physics.add.group();
    this.medicines = this.physics.add.group();
  }

  initUI() {
    this.add.image(20, 890, "livesUI").setDepth(1);
    this.add.image(20, 850, "potionsUI").setDepth(1);
    this.add.image(17, 810, "bombsUI").setDepth(1);
    this.add.image(20, 770, "shieldsUI").setDepth(1);

    this.textUI = [];

    this.livesText = this.add.text(
      40, 
      875, 
      this.player.lives, 
      this.fontStyle
    );

    this.potionsText = this.add.text(
      40,
      835,
      this.player.inventory.potion ? this.player.inventory.potion.quantity : 0,
      this.fontStyle
    );

    this.bombsText = this.add.text(
      40,
      795,
      this.player.inventory.bomb ? this.player.inventory.bomb.quantity : 0,
      this.fontStyle
    );

    this.shieldsText = this.add.text(
      40,
      755,
      this.player.inventory.shield ? this.player.inventory.shield.quantity : 0,
      this.fontStyle
    );

    this.textUI.push(
      this.livesText, 
      this.potionsText, 
      this.bombsText, 
      this.shieldsText
    );
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
    this.drinkPotionSound = this.sound.add("drink_potion", Sound.drinkPotion);
    this.errorSound = this.sound.add("error_sound");
    this.gameOverSound = this.sound.add("game_over", Sound.gameOver);
  }

  // ENEMIES
  destroy_enemies() {
    this.enemies.getChildren().forEach((enemy) => {
      this.enemies.killAndHide(enemy);
    });
  }

  startBossBattle() {
    this.levelSong.stop();

    this.time.delayedCall(1200, () => {
      this.bossSong.play();
    });

    switch (this.level) {
      case 1:
        this.boss = new Boss(this, 420, -50, this.level);
        break;
      case 2:
        this.boss = new Boss2(this, 420, -50, this.level);
        break;
      case 3:
        this.boss = new Boss3(this, 420, -50, this.level);
        break;
      case 4:
        this.boss = new Boss4(this, 420, -50, this.level);
        break;
      default:
        this.boss = new Boss(this, 420, -50, this.level);
        break;
    }

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
    this.boss.recieveDamage(1); //CAMBIAR POR EL DAÑO DEL LASER
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
    if (this.equipedInventory.shield.quantity > 0) {
      this.equipedInventory.shield.quantity--;
    }
  }

  usePotion() {
    if (this.equipedInventory.potion.quantity > 0) {
      if(this.player.lives == this.player.maxLives) {
        this.errorSound.play();
      } else {
        this.drinkPotionSound.play();
        this.equipedInventory.potion.quantity--;
        this.player.lives += this.equipedInventory.potion.health;
      }

      if(this.player.lives >= this.player.maxLives) {
        this.player.lives = this.player.maxLives;
      }
    }
  }

  useBomb() {
    if (this.equipedInventory.bomb.quantity > 0) {
      this.equipedInventory.bomb.quantity--;
      let bomba = new Bomb(
        this,
        this.player.x,
        this.player.y + 20,
        this.equipedInventory.bomb
      );
      this.bombs.add(bomba);
    }
  }

  onMedicineHit(enemy, medicine) {
    this.impactSound.play();
    medicine.destroy();
    enemy.medicine_hit(medicine);
    // console.log("monstruos vivos: " + this.alive_monsters);
    if (enemy.lives == 0) this.alive_monsters--;
  }

  onHit(enemy, laser) {
    this.impactSound.play();
    laser.destroy();
    enemy.weapon_hit(laser);
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
        child.weapon_hit(bomb);
        if (child.lives <= 0) this.alive_monsters--;
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
  updateUI() {
    this.textUI.forEach((text) => text.destroy());
    this.textUI = [];
  
    this.livesText = this.add.text(
      35, 
      875, 
      this.player.lives, 
      this.fontStyle
    );
  
    this.potionsText = this.add.text(
      35,
      835,
      this.player.inventory.potion ? this.player.inventory.potion.quantity : 0,
      this.fontStyle
    );
  
    this.bombsText = this.add.text(
      35,
      795,
      this.player.inventory.bomb ? this.player.inventory.bomb.quantity : 0,
      this.fontStyle
    );
  
    this.shieldsText = this.add.text(
      35,
      755,
      this.player.inventory.shield ? this.player.inventory.shield.quantity : 0,
      this.fontStyle
    );
  
    this.textUI.push(
      this.livesText, 
      this.potionsText, 
      this.bombsText, 
      this.shieldsText
    );
  }

  updateInventory() {
    if (this.equipedInventory.shield)
      this.inventory["consumibles"].subcategories["shields"].items.find(
        (i) => i.equiped === true
      ).quantity = this.equipedInventory.shield.quantity;
    if (this.equipedInventory.potion)
      this.inventory["consumibles"].subcategories["potions"].items.find(
        (i) => i.equiped === true
      ).quantity = this.equipedInventory.potion.quantity;
    if (this.equipedInventory.bomb)
      this.inventory["consumibles"].subcategories["bombs"].items.find(
        (i) => i.equiped === true
      ).quantity = this.equipedInventory.bomb.quantity;
  }

  game_over() {
    this.gameOver = true;
    this.bossSong.stop();
    this.gameOverSound.play();
    if (this.bossInScene) this.boss.destroy();
    this.player.setVisible(false);

    let lose = this.add
      .image(this.globalWidth / 2, this.globalHeight / 2, "level_lose")
      .setDepth(1);
    lose.setInteractive({
      cursor: "url(assets/cursors/selector.cur), pointer",
    });
    lose.on("pointerup", () => {
      this.scene.start("map", ["lose", this.level, this.inventory]);
      this.bossSong.stop();
    });
  }
}

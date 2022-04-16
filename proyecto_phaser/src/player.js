import Laser from "./weapons/laser.js";
import Medicine from "./weapons/medicine.js";
import Anim_Factory from "./level/anim_factory.js";

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, inventory) {
    super(scene, x, y, inventory.skin);

    Anim_Factory.player_anims(scene, inventory.skin);
    this.normal_animation = inventory.skin + "_walk";
    this.damage_animation = inventory.skin + "_walk_damage";
    this.heal_animation = inventory.skin + "_walk_heal";
    this.shield_animation = inventory.skin + "_walk_shield";

    this.cursors = this.scene.input.keyboard.createCursorKeys();

    //Movement
    this.keyW = this.scene.input.keyboard.addKey("W");
    this.keyA = this.scene.input.keyboard.addKey("A");
    this.keyS = this.scene.input.keyboard.addKey("S");
    this.keyD = this.scene.input.keyboard.addKey("D");

    //Medicine
    this.keyC = this.scene.input.keyboard.addKey("C");

    //Consumible
    this.key_one = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ONE
    );
    this.key_two = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.TWO
    );
    this.key_three = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.THREE
    );

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setCollideWorldBounds();
    this.shootTime = 0;
    this.medicineTime = 0;
    this.consumibleTime = 0;
    this.shieldTime = 0;
    this.healTime = 0;
    this.damageTime = 0;
    this.speed = 400;
    this.movingx = false;
    this.movingy = false;
    this.lives = 10;

    this.inventory = inventory;

    this.current_animation = this.normal_animation;
  }

  preUpdate(t, dt) {
    super.preUpdate(t, dt);

    this.shootTime--;
    this.medicineTime--;
    this.consumibleTime--;
    this.shieldTime--;
    this.damageTime--;
    this.healTime--;

    if (
      this.shieldTime <= 0 &&
      this.consumibleTime <= 0 &&
      this.damageTime <= 0 &&
      this.healTime <= 0
    ) {
      this.current_animation = this.normal_animation;
    }

    if (this.cursors.left.isDown || this.keyA.isDown) {
      if (!this.movingy) this.body.setVelocityX(-this.speed);
      else this.body.setVelocityX(-this.speed / 1.5);
      this.movingx = true;
    } else if (this.cursors.right.isDown || this.keyD.isDown) {
      if (!this.movingy) this.body.setVelocityX(this.speed);
      else this.body.setVelocityX(this.speed / 1.5);
      this.movingx = true;
    } else {
      this.body.setVelocityX(0);
      this.movingx = false;
    }

    if (this.cursors.up.isDown || this.keyW.isDown) {
      if (!this.movingx) this.body.setVelocityY(-this.speed);
      else this.body.setVelocityY(-this.speed / 1.5);
      this.movingy = true;
    } else if (this.cursors.down.isDown || this.keyS.isDown) {
      if (!this.movingx) this.body.setVelocityY(this.speed);
      else this.body.setVelocityY(this.speed / 1.5);
      this.movingy = true;
    } else {
      this.body.setVelocityY(0);
      this.movingy = false;
    }

    if (this.cursors.space.isDown && this.shootTime <= 0) {
      const laser = new Laser(this.scene, this.x, this.y - 50); //Crear arma segun inventario
      this.scene.addLaser(laser);
      this.shootTime = 15;
    }

    if (this.keyC.isDown && this.medicineTime <= 0) {
      const medicine = new Medicine(this.scene, this.x, this.y - 50); //Crear medicina segun inventario
      this.scene.addMedicine(medicine);
      this.medicineTime = 15;
    }

    if (
      this.key_one.isDown &&
      this.inventory.shield[1] > 0 &&
      this.consumibleTime <= 0
    ) {
      this.scene.createShield();
      this.consumibleTime = 500;
      this.shieldTime = 500;
      this.current_animation = this.shield_animation;
    } else if (
      this.key_two.isDown &&
      this.inventory.potions[1] > 0 &&
      this.consumibleTime <= 0
    ) {
      this.scene.usePotion();
      this.consumibleTime = 15;
      this.healTime = 50;
      this.current_animation = this.heal_animation;
    } else if (
      this.key_three.isDown &&
      this.inventory.bomb[1] > 0 &&
      this.consumibleTime <= 0
    ) {
      this.scene.useBomb();
      this.consumibleTime = 15;
    }

    if (
      this.cursors.up.isDown ||
      this.keyW.isDown ||
      this.cursors.left.isDown ||
      this.keyA.isDown ||
      this.cursors.down.isDown ||
      this.keyS.isDown ||
      this.cursors.right.isDown ||
      this.keyD.isDown
    ) {
      this.play(this.current_animation, this.current_animation);
    } else {
      this.play(this.current_animation, this.current_animation);
      this.anims.stop();
    }
  }

  damage(damage) {
    if (this.shieldTime <= 0) {
      this.damageTime = 50;
      this.anims.stop();
      this.play(this.damage_animation);
      this.lives -= damage;

      console.log("Vidas: " + this.lives);

      if (this.lives <= 0) this.scene.game_over();
    }
  }
}

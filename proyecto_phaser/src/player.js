import Medicine from "./weapons/medicine.js";
import Attack_Factory from "./attacks/factory/attack_factory.js";
import Sound from "./data/sounds.js";

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, inventory) {
    super(scene, x, y, inventory.skin.sprite);

    console.log(inventory);

    this.normal_animation = inventory.skin.sprite + "_walk";
    this.damage_animation = inventory.skin.sprite + "_walk_damage";
    this.heal_animation = inventory.skin.sprite + "_walk_heal";
    this.shield_animation = inventory.skin.sprite + "_walk_shield";

    this.can_shoot = true;
    this.can_cure = true;
    
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.can_move = true;

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

    this.attack = this.inventory.weapon.attack;
    this.attackSound = this.scene.sound.add("blaster", Sound.blaster);

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

    if ((this.cursors.left.isDown || this.keyA.isDown) && this.can_move) {
      if (!this.movingy) this.body.setVelocityX(-this.speed);
      else this.body.setVelocityX(-this.speed / 1.5);
      this.movingx = true;
    } else if ((this.cursors.right.isDown || this.keyD.isDown) && this.can_move) {
      if (!this.movingy) this.body.setVelocityX(this.speed);
      else this.body.setVelocityX(this.speed / 1.5);
      this.movingx = true;
    } else {
      this.body.setVelocityX(0);
      this.movingx = false;
    }

    if ((this.cursors.up.isDown || this.keyW.isDown) && this.can_move) {
      if (!this.movingx) this.body.setVelocityY(-this.speed);
      else this.body.setVelocityY(-this.speed / 1.5);
      this.movingy = true;
    } else if ((this.cursors.down.isDown || this.keyS.isDown) && this.can_move) {
      if (!this.movingx) this.body.setVelocityY(this.speed);
      else this.body.setVelocityY(this.speed / 1.5);
      this.movingy = true;
    } else {
      this.body.setVelocityY(0);
      this.movingy = false;
    }

    if (this.cursors.space.isDown && this.shootTime <= 0 && this.can_shoot) {
      Attack_Factory.createPlayerAttack(this.scene, this.attack, this);
      this.attackSound.play();
      this.shootTime = 15;
    }

    if (this.keyC.isDown && this.medicineTime <= 0 && this.can_cure ) {
      const medicine = new Medicine(this.scene, this.x, this.y - 50, this.inventory.medicine); //Crear medicina segun inventario
      this.scene.addMedicine(medicine);
      this.medicineTime = 15;
    }

    if (
      this.key_one.isDown &&
      this.inventory.shield &&
      this.inventory.shield.quantity > 0 &&
      this.consumibleTime <= 0
    ) {
      this.scene.createShield();
      this.consumibleTime = this.inventory.shield.time;
      this.shieldTime = this.inventory.shield.time;
      this.current_animation = this.shield_animation;
    } else if (
      this.key_two.isDown &&
      this.inventory.potion &&
      this.inventory.potion.quantity > 0 &&
      this.consumibleTime <= 0
    ) {
      this.scene.usePotion();
      this.consumibleTime = 15;
      this.healTime = 50;
      this.current_animation = this.heal_animation;
    } else if (
      this.key_three.isDown &&
      this.inventory.bomb &&
      this.inventory.bomb.quantity > 0 &&
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

import Laser from './laser.js';
export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "player");
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.keyW = this.scene.input.keyboard.addKey('W');
    this.keyA = this.scene.input.keyboard.addKey('A');
    this.keyS = this.scene.input.keyboard.addKey('S');
    this.keyD = this.scene.input.keyboard.addKey('D');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setCollideWorldBounds();
    this.shootTime = 0;
    this.speed = 400;
    this.movingx = false;
    this.movingy = false;
    this.lives = 10;
  }

  preUpdate(t, dt) {

    super.preUpdate(t, dt);

    this.shootTime--;

    if (this.cursors.left.isDown || this.keyA.isDown) {
      if (!this.movingy) this.body.setVelocityX(-this.speed);
      else this.body.setVelocityX(-this.speed / 1.5);
      this.movingx = true;
    }
    else if (this.cursors.right.isDown || this.keyD.isDown) {
      if (!this.movingy) this.body.setVelocityX(this.speed);
      else this.body.setVelocityX(this.speed / 1.5);
      this.movingx = true;
    }
    else {
      this.body.setVelocityX(0);
      this.movingx = false;
    }

    if (this.cursors.up.isDown || this.keyW.isDown) {
      if (!this.movingx) this.body.setVelocityY(-this.speed);
      else this.body.setVelocityY(-this.speed / 1.5);
      this.movingy = true;
    }
    else if(this.cursors.down.isDown || this.keyS.isDown) {
      if (!this.movingx) this.body.setVelocityY(this.speed);
      else this.body.setVelocityY(this.speed / 1.5);
      this.movingy = true;
    }
    else {
      this.body.setVelocityY(0);
      this.movingy = false;
    }

    if(this.cursors.space.isDown && this.shootTime <= 0) {
      this.scene.addLaser();
      this.shootTime = 15;
    }
  }

  damage(damage){
    this.lives -= damage;
    console.log("Vidas: "+ this.lives);
    if (this.lives <= 0)
      this.scene.game_over();
  }

}

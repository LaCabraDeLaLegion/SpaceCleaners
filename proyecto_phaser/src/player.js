import Laser from './laser.js';
export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "player");
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.scene.add.existing(this);
    this.shootTime = 0;
  }

  preUpdate(t, dt) {

    super.preUpdate(t, dt);

    this.shootTime--;

    if (this.cursors.left.isDown) {
      this.x -= 5;
    }

    if (this.cursors.right.isDown) {
      this.x += 5;
    }

    if (this.cursors.up.isDown) {
      this.y -= 5;
    }

    if(this.cursors.down.isDown) {
        this.y += 5;
    }

    if(this.cursors.space.isDown && this.shootTime <= 0) {
      this.scene.addLaser();
      this.shootTime = 15;
    }
  }

}

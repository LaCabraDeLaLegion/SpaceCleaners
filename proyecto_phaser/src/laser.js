export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "laser");
    this.scene.add.existing(this);
  }

  preUpdate(t, dt) {
    this.y -= 10;
  }
}

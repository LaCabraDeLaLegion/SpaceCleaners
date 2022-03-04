export default class Laser extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "laser");
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    // laserGroup.add(this);
  }

  addGroup(laserGroup) {
    laserGroup.add(this);
  }

  preUpdate(t, dt) {
    super.preUpdate(t, dt);

    this.y -= 10;

    if (this.y < 0) this.destroy();
  }
}

export default class Slash extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, type, target) {
    super(scene, x, y, `slash${type}`);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.target = target;
    this.damage = type;
    this.type = Number(type);

    if (target.x == this.x) this.directionX = 0;
    else this.directionX = target.x > this.x ? 1 : -1;
  }

  preUpdate(t, dt) {
    if (this.y === this.target.y) this.destroy();
    else {
      this.y += 2 + this.type;
      this.x += this.directionX * 2;
    }
  }
}

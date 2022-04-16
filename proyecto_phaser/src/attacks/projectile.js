export default class Projectile extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, data, target) {
    super(scene, x, y, data.name);
    this.velocityX = data.velocityX;
    this.velocityY = data.velocityY;
    this.angle = 0;
    this.angleIncrement = data.angle;
    this.damage = data.damage;
    this.sound = data.sound;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.damageSound = this.scene.sound.add("damage", data.sound);

    if (!target || target.x == this.x) this.directionX = 0;
    else this.directionX = target.x > this.x ? 1 : -1;

    this.scene.physics.add.overlap(this.scene.player, this, () => {
      this.scene.player.damage(this.damage);
      this.damageSound.play();
      this.scene.projectilesOnScreen--;
      this.destroy();
    });
  }

  preUpdate() {
    super.preUpdate();

    if (this.scene.gameOver || (this.y > this.scene.cameras.main.height)) {
      this.scene.projectilesOnScreen--;
      this.destroy();
    }
    else {
      this.y += this.velocityY;
      this.x += this.velocityX * this.directionX;
      this.angle += this.angleIncrement;
    }
  }
}

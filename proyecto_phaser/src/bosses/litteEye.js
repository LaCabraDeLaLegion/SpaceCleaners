import AttackFactory from "../attacks/factory/attack_factory.js";
import Attack from "../attacks/factory/attacks_enum.js";

export default class LitteEye extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, img) {
    super(scene, x, y, img);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.imgName = img;
    this.attackTime = 260;
    this.life = 50;
  }

  preUpdate(t, dt) {
    this.attackTime--;

    if (this.attackTime <= 0) {
      if (this.imgName === "eye_virus_1") {
        AttackFactory.createAttack(
          this.scene,
          Attack.EyeVirusAttack,
          { x: this.x, y: this.y },
          null
        );
      } else {
        AttackFactory.createAttack(
          this.scene,
          Attack.EyeVirusAttack2,
          { x: this.x, y: this.y },
          null
        );
      }

      this.attackTime = 260;
    }
  }

  recieveDamage(damage) {
    this.life -= damage;
  }
}

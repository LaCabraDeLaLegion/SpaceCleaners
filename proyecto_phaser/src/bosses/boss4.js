import AttackFactory from "../attacks/factory/attack_factory.js";
import Attack from "../attacks/factory/attacks_enum.js";

let images = ["B1", "B2", "B3", "B4_1", "B5", "B6", "B7"];
let damage_images = [
  "B1_damage",
  "B2_damage",
  "B3_damage",
  "B4_damage",
  "B5_damage",
  "B6_damage",
  "B7_damage",
];
let death_images = [
  "B1_death",
  "B2_death",
  "B3_death",
  "B4_death",
  "B5_death",
  "B6_death",
  "B7_death",
];

export default class Boss extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, boss_level) {
    let name = images[boss_level - 1];
    super(scene, x, y, name);
    this.level = boss_level;
    this.image = images[boss_level - 1];
    this.damage_image = damage_images[boss_level - 1];
    this.death_image = death_images[boss_level - 1];
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.dialog = false;
    this.direction = 1;
    this.attackTime = 360;
    this.moveTime = 60;
    this.life = 175;
    this.activeAttack = null;
    this.text = this.scene.add.text(350, 200, "I will destroy you!", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
    });
  }

  preUpdate(t, dt) {
    this.attackTime--;
    this.moveTime--;

    if (this.y < 100) this.y++;
    else if (!this.dialog) {
      this.dialog = true;
      this.text.destroy();
    } else {
      if (this.attackTime <= 0) {
        if (this.life >= 65) {
          AttackFactory.createAttack(
            this.scene,
            Attack.AttackBoss4,
            this,
            null
          );
        } else {
          AttackFactory.createAttack(
            this.scene,
            Attack.SuperAttackBoss3,
            this,
            null
          );
        }

        this.attackTime = 120;
      }

      if (this.moveTime <= 0) {
        if (this.direction == 1) {
          this.x = 340;
          this.y = 180;
          this.x = Math.random() * (340 - 250) + 250;
          this.y = Math.random() * (180 - 120) + 120;
          this.direction = 0;
        } else if (this.direction == 2) {
          this.x = Math.random() * (650 - 430) + 430;
          this.y = Math.random() * (200 - 170) + 170;
          this.direction = 0;
        } else {
          this.x = Math.random() * (650 - 120) + 120;
          this.y = 100;
          this.direction = Math.round(Math.random() * (2 - 1) + 1);
        }

        this.moveTime = 360;
      }
    }
  }

  recieveDamage(damage) {
    this.life -= damage;
  }
}

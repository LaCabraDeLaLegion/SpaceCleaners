import AttackFactory from "./attacks/factory/attack_factory.js";
import Attack from "./attacks/factory/attacks_enum.js";

let images = ["B1", "B2", "B3", "B4", "B5", "B6", "B7"];
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
    this.direction = -1;
    this.attackTime = 60;
    this.life = 50;
    this.text = this.scene.add.text(350, 200, "I will destroy you!", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
    });
  }

  preUpdate(t, dt) {
    this.attackTime--;

    if (this.y < 100) this.y++;
    else if (!this.dialog) {
      this.dialog = true;
      this.text.destroy();
    } else {
      if (this.attackTime <= 0) {
        
        if (this.life >= 25) {
          AttackFactory.createAttack(this.scene, Attack.AttackBoss1, this, {
            x: this.scene.player.x,
            y: this.scene.player.y,
          });
        } else {
          AttackFactory.createAttack(
            this.scene,
            Attack.SuperAttackBoos1,
            this,
            {
              x: this.scene.player.x,
              y: this.scene.player.y,
            }
          );
        }

        this.attackTime = 60;
      }

      switch (this.direction) {
        case -1:
          if (this.x <= 80) this.direction = 1;
          else this.x -= 2;
          break;
        case 1:
          if (this.x >= 800) this.direction = -1;
          else this.x += 2;
          break;
        case 0:
          break;
      }
    }
  }

  recieveDamage(damage) {
    this.life -= damage;
  }
}

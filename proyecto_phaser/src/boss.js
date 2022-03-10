let images = ["boss", "", "", "", "", ""];
let damage_images = ["boss_damage", "", "", "", "", ""];

export default class Boss extends Phaser.GameObjects.Sprite {

  constructor(scene, x, y, boss_level) {
    let name = images[boss_level - 1];
    super(scene, x, y, name);
    this.level = boss_level;
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
        this.scene.bossAttack(this.life >= 25 ? "1" : "2", 2);
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

  recieveDamage(damage){
      this.life -= damage;
      this.setTexture(damage_images[this.level - 1]);
  }
}

import Weapon from "./weapon.js";

export default class Laser extends Weapon {
  constructor(scene, x, y, data) {
    super(scene, x, y, data.name);
    this.addGroup(this.scene.lasers);
    this.damage = data.damage;
  }

  preUpdate(t, dt) {
    super.preUpdate(t, dt);

    this.y -= 10;

    if (this.y < 0) this.destroy();
  }
}

import Weapon from "./weapon.js";

export default class Laser extends Weapon {
  constructor(scene, x, y) {
    super(scene, x, y, "laser");
  }

  preUpdate(t, dt) {
    super.preUpdate(t, dt);

    this.y -= 10;

    if (this.y < 0) this.destroy();
  }
}

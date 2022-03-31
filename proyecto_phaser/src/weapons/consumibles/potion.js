import Weapon from "../weapon.js";

export default class Potion extends Weapon {
  constructor(scene, x, y) {
    super(scene, x, y, "potion");
  }

  preUpdate(t, dt) {
    super.preUpdate(t, dt);
  }

  consume(){
    this.destroy();
  }
}

import Weapon from "../weapon.js";

export default class Shield extends Weapon {
  constructor(scene, x, y) {
    //super(scene, x, y, "shield");
    super(scene, x, y);
  }

  preUpdate(t, dt) {
    super.preUpdate(t, dt);
  }

  consume(){
  }
}

import Weapon from "../weapon.js";

export default class Bomb extends Weapon {
  constructor(scene, x, y, name) {
      
    super(scene, x, y, name);
    if (name == "basic_bomb"){
        this.damage = 5;
        this.speed = 1;
        this.range = 100;
    }
  }

  preUpdate(t, dt) {
    super.preUpdate(t, dt);

    this.y -= this.speed;

    if (this.y < 0) this.destroy();
  }

}

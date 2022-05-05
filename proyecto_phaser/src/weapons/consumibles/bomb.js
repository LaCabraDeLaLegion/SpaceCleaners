import Weapon from "../weapon.js";

export default class Bomb extends Weapon {
  constructor(scene, x, y, data) {
      
    super(scene, x, y, data.img);
    this.damage = data.damage;
    this.speed = data.speed;
    this.range = data.range;
    
  }

  preUpdate(t, dt) {
    super.preUpdate(t, dt);

    this.y -= this.speed;

    if (this.y < 0) this.destroy();
  }

}

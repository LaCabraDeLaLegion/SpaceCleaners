import Weapon from "./weapon.js";

export default class Medicine extends Weapon {

    constructor(scene, x, y) {
      super(scene, x, y, "mask");
    }
  
    preUpdate(t, dt) {
      super.preUpdate(t, dt);
      
      this.y -= 8;
  
      if (this.y < 0) this.destroy();
  
    }
  }
  
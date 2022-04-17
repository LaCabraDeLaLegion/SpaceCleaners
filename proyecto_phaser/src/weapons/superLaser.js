import Weapon from "./weapon.js";

export default class SuperLaser extends Weapon {
  constructor(scene, x, y) {
    super(scene, x, y, "super_laser");
    this.timeAlive = 1220;
    this.addGroup(this.scene.lasers);
  }

  preUpdate(t, dt) {
    super.preUpdate(t, dt);
    this.timeAlive--;
    this.x = this.scene.player.x;
    this.y = this.scene.player.y - 450;
    console.log("PREUPDATE",this.timeAlive);
    if (this.timeAlive <= 0) {
      this.instance = null;
      this.destroy();
      console.log("LASER DESTRUIDO");
    }
  }

  static getInstance(scene, x, y) {
    console.log(this.instance);
    if (!this.instance) {
      this.instance = new SuperLaser(scene, x, y);
      console.log("NUEVO LASER EN ESCENA");
    } else {
      console.log("LE SUMO VIDA AL LASER ACTUAL");
      this.timeAlive = 1220;
    }

    return this.instance;
  }
}

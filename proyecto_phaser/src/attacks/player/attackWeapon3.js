import SuperLaser from "../../weapons/superLaser.js";

export default class AttackWeapon3 {
  /**
   * Crea un super laser
   */
  constructor(scene, player) {
    SuperLaser.getInstance(scene, player.x, player.y - 450);
  }
  
}

import SuperLaser from "../../weapons/superLaser.js";

export default class AttackWeapon3 {
  /**
   * Crea un super laser
   */
  constructor(scene, player) {
    new SuperLaser(scene, player.x - 20, player.y - 50);
  }
}

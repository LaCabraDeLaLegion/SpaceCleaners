import Laser from "../../weapons/laser.js";

export default class AttackWeapon1 {
  /**
   * Crea dos lásers simples
   */
  constructor(scene, player) {
    new Laser(scene, player.x - 20, player.y - 50);
    new Laser(scene, player.x + 20, player.y- 50);
  }
}

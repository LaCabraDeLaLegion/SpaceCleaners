import Laser from "../../weapons/laser.js";
import LasersData from "../../data/lasers.js";

export default class AttackWeapon1 {
  /**
   * Crea dos lásers simples
   */
  constructor(scene, player) {
    new Laser(scene, player.x - 20, player.y - 50, LasersData["laser1"]);
    new Laser(scene, player.x + 20, player.y- 50, LasersData["laser1"]);
  }
}

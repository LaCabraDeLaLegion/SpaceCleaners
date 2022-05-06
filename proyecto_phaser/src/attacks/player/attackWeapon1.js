import Laser from "../../weapons/laser.js";
import LasersData from "../../data/lasers.js";

export default class AttackWeapon1 {
  /**
   * Crea un láser simple
   */
  constructor(scene, player) {
    new Laser(scene, player.x, player.y - 50, LasersData["laser1"]);
  }
}

import Laser from "../../weapons/laser.js";
import LasersData from "../../data/lasers.js";

export default class AttackWeapon4 {
  /**
   * Crea 1 laser mejorado
   */
  constructor(scene, player) {
    new Laser(scene, player.x, player.y - 50, LasersData["laser2"]);
  }
}

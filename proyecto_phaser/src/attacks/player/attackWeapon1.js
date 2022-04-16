import Projectile from "../projectile.js";
import ProjectileData from "../../data/projectiles.js";
import Laser from "../../weapons/laser.js";

export default class AttackWeapon1 {
  /**
   * Crea dos proyectiles slashes normales uno al lado del otro
   */
  constructor(scene, player) {
    
    new Laser(scene, player.x, player.y - 50); 
    
  }
}

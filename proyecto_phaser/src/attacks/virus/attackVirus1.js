import Projectile from "../projectile.js";
import ProjectileData from "../../data/projectiles.js";

export default class AttackVirus1 {
  /**
   * Crea dos proyectiles slashes normales uno al lado del otro
   */
  constructor(scene, enemy, target) {
    new Projectile(
      scene,
      enemy.x,
      enemy.y + 20,
      ProjectileData["plasma"],
      target
    );
    
  }
}

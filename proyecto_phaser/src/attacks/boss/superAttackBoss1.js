import Projectile from "../projectile.js";
import ProjectileData from "../../data/projectiles.js";

export default class SuperAttackBoss1 {
  /**
   * Crea dos proyectiles super slashes uno al lado del otro
   */
  constructor(scene, enemy, target) {
    new Projectile(
      scene,
      enemy.x,
      enemy.y + 80,
      ProjectileData["super_slash"],
      target
    );
    new Projectile(
      scene,
      enemy.x + 50,
      enemy.y + 80,
      ProjectileData["super_slash"],
      target
    );
  }
}

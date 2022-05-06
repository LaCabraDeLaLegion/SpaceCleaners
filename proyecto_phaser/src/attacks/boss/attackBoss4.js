import Projectile from "../projectile.js";
import ProjectileData from "../../data/projectiles.js";

export default class AttackBoss3 {
  /**
   * Lanza varias llamas
   */
  constructor(scene, enemy, target) {
    new Projectile(
      scene,
      enemy.x,
      enemy.y + 200,
      ProjectileData["eye_laser"],
      target
    );
  }
}

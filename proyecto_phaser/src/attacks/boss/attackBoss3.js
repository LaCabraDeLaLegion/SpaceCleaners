import Projectile from "../projectile.js";
import ProjectileData from "../../data/projectiles.js";

export default class AttackBoss3 {
  /**
   * Lanza varias llamas
   */
  constructor(scene, enemy, target) {
    new Projectile(
      scene,
      enemy.x - 100,
      enemy.y + 80,
      ProjectileData["eye_laser_left"],
      target
    );
    new Projectile(
      scene,
      enemy.x - 100,
      enemy.y + 80,
      ProjectileData["eye_laser_left"],
      target
    );
    new Projectile(
      scene,
      enemy.x - 100,
      enemy.y + 80,
      ProjectileData["eye_laser_left"],
      target
    );
  }
}

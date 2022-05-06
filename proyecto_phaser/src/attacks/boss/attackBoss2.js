import Projectile from "../projectile.js";
import ProjectileData from "../../data/projectiles.js";

export default class AttackBoss1 {
  
  constructor(scene, enemy, target) {
    new Projectile(
      scene,
      enemy.x,
      enemy.y + 80,
      ProjectileData["slash"],
      target
    );
    new Projectile(
      scene,
      enemy.x + 50,
      enemy.y + 80,
      ProjectileData["slash"],
      target
    );
    new Projectile(
      scene,
      enemy.x + 50,
      enemy.y + 80,
      ProjectileData["fire"],
      target
    );
  }
}

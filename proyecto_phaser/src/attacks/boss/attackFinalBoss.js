import Projectile from "../projectile.js";
import ProjectileData from "../../data/projectiles.js";

export default class AttackFinalBoss {

  constructor(scene, enemy, target) {
    new Projectile(
      scene,
      enemy.x - 200,
      enemy.y + 150,
      ProjectileData["holy_fire"],
      target
    );
    new Projectile(
      scene,
      enemy.x - 100,
      enemy.y + 150,
      ProjectileData["holy_fire"],
      target
    );
    new Projectile(
      scene,
      enemy.x,
      enemy.y + 150,
      ProjectileData["holy_fire"],
      target
    );
    new Projectile(
      scene,
      enemy.x + 100,
      enemy.y + 150,
      ProjectileData["holy_fire"],
      target
    );
    new Projectile(
      scene,
      enemy.x + 200,
      enemy.y + 150,
      ProjectileData["holy_fire"],
      target
    );
  }
}

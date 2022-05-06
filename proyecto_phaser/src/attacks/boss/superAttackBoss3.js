import Projectile from "../projectile.js";
import ProjectileData from "../../data/projectiles.js";

export default class SuperAttackBoss2 {
  constructor(scene, enemy, target) {
    new Projectile(
      scene,
      enemy.x - 100,
      enemy.y + 80,
      ProjectileData["fire_left"],
      target
    );
    new Projectile(
      scene,
      enemy.x + 50,
      enemy.y + 80,
      ProjectileData["fire"],
      target
    );
    new Projectile(
      scene,
      enemy.x + 200,
      enemy.y + 80,
      ProjectileData["fire_right"],
      target
    );
    new Projectile(
      scene,
      enemy.x + 50,
      enemy.y + 80,
      ProjectileData["blue_fire"],
      target
    );
    new Projectile(
      scene,
      enemy.x - 100,
      enemy.y + 80,
      ProjectileData["blue_fire"],
      target
    );
    new Projectile(
      scene,
      enemy.x + 200,
      enemy.y + 80,
      ProjectileData["blue_fire"],
      target
    );
  }
}

import Projectile from "../projectile.js";
import ProjectileData from "../../data/projectiles.js";

export default class SuperAttackBoss2 {
  constructor(scene, enemy, target) {
    new Projectile(
      scene,
      enemy.x - 100,
      enemy.y + 80,
      ProjectileData["poison_arrow"],
      target
    );
    new Projectile(
      scene,
      enemy.x + 200,
      enemy.y + 80,
      ProjectileData["poison_arrow"],
      target
    );
    new Projectile(
      scene,
      enemy.x + 50,
      enemy.y + 80,
      ProjectileData["poison_arrow"],
      target
    );
    new Projectile(
      scene,
      enemy.x + 350,
      enemy.y + 80,
      ProjectileData["poison_arrow"],
      target
    );
    new Projectile(
      scene,
      enemy.x - 250,
      enemy.y + 80,
      ProjectileData["poison_arrow"],
      target
    );
  }
}

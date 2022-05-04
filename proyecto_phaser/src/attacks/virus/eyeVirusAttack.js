import Projectile from "../projectile.js";
import ProjectileData from "../../data/projectiles.js";

export default class EyeVirusAttack {
  constructor(scene, enemy, target) {
    new Projectile(
      scene,
      enemy.x,
      enemy.y,
      ProjectileData["eye_virus_attack"],
      target
    );
  }
}

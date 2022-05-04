import Projectile from "../projectile.js";
import ProjectileData from "../../data/projectiles.js";

export default class EyeVirusAttack2 {
  constructor(scene, enemy, target) {
    new Projectile(
      scene,
      enemy.x,
      enemy.y,
      ProjectileData["eye_virus_attack2"],
      target
    );
  }
}

import Projectile from "../projectile.js";
import ProjectileData from "../../data/projectiles.js";

export default class AttackVirus3 {
  
  constructor(scene, enemy, target) {
    new Projectile(
      scene,
      enemy.x,
      enemy.y + 20,
      ProjectileData["rock"],
      target
    );
    
  }
}

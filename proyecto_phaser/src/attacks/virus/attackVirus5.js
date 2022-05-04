import Projectile from "../projectile.js";
import ProjectileData from "../../data/projectiles.js";

export default class AttackVirus5 {
  
  constructor(scene, enemy, target) {
    new Projectile(
      scene,
      enemy.x,
      enemy.y + 20,
      ProjectileData["spiderweb"],
      target
    );
    
  }
}

import Attack from "./attacks_enum.js";
import AttackVirus1 from "../virus/attackVirus1.js";
import AttackBoss1 from "../boss/attackBoss1.js";
import SuperAttackBoss1 from "../boss/superAttackBoss1.js";
import AttackWeapon1 from "../player/attackWeapon1.js";

export default class Attack_Factory {
  static createAttack(scene, attack, enemy, target) {
    switch (attack) {
      case Attack.AttackBoss1:
        return new AttackBoss1(scene, enemy, target);
      case Attack.SuperAttackBoos1:
        return new SuperAttackBoss1(scene, enemy, target);
      case Attack.BasicAttack:
        return new AttackVirus1(scene, enemy, target);
      case Attack.SuperBasicAttack:
        break;
      default:
        break;
    }
  }

  static createPlayerAttack(scene, attack, player) {
    switch (attack) {
      case Attack.Weapon1:
        return new AttackWeapon1(scene, player);
      default:
        break;
    }
  }
}

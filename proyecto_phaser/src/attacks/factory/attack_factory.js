import Attack from "./attacks_enum.js";
import AttackBoss1 from "../attackBoss1.js";
import SuperAttackBoss1 from "../superAttackBoss1.js";

export default class Attack_Factory {
  static createAttack(scene, attack, enemy, target) {
    switch (attack) {
      case Attack.AttackBoss1:
        return new AttackBoss1(scene, enemy, target);
      case Attack.SuperAttackBoos1:
        return new SuperAttackBoss1(scene, enemy, target);
      case Attack.BasicAttack:
        break;
      case Attack.SuperBasicAttack:
        break;
    }
  }
}

import Attack from "./attacks_enum.js";
import AttackVirus1 from "../virus/attackVirus1.js";
import AttackBoss1 from "../boss/attackBoss1.js";
import AttackBoss2 from "../boss/attackBoss2.js";
import AttackBoss3 from "../boss/attackBoss3.js";
import SuperAttackBoss1 from "../boss/superAttackBoss1.js";
import SuperAttackBoss2 from "../boss/superAttackBoss2.js";
import AttackWeapon1 from "../player/attackWeapon1.js";
import AttackWeapon2 from "../player/attackWeapon2.js";
import AttackWeapon3 from "../player/attackWeapon3.js";
import EyeVirusAttack from "../virus/eyeVirusAttack.js";
import EyeVirusAttack2 from "../virus/eyeVirusAttack2.js";
export default class Attack_Factory {
  static createAttack(scene, attack, enemy, target) {
    switch (attack) {
      case Attack.AttackBoss1:
        return new AttackBoss1(scene, enemy, target);
      case Attack.SuperAttackBoss1:
        return new SuperAttackBoss1(scene, enemy, target);
      case Attack.AttackBoss2:
        return new AttackBoss2(scene, enemy, target);
      case Attack.SuperAttackBoss2:
        return new SuperAttackBoss2(scene, enemy, target);
      case Attack.AttackBoss3:
        return new AttackBoss3(scene, enemy, target);
      case Attack.BasicAttack:
        return new AttackVirus1(scene, enemy, target);
      case Attack.EyeVirusAttack:
        return new EyeVirusAttack(scene, enemy, target);
      case Attack.EyeVirusAttack2:
        return new EyeVirusAttack2(scene, enemy, target);
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
      case Attack.Weapon2:
        return new AttackWeapon2(scene, player);
      case Attack.Weapon3:
        return new AttackWeapon3(scene, player);
      default:
        break;
    }
  }
}

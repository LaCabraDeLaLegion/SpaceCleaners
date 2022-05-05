import Enemy from "./enemy.js";
import virus_data from "../data/virus_data.js";
import Attack_Factory from "../attacks/factory/attack_factory.js";
import Attack from "../attacks/factory/attacks_enum.js";

export default class Virus extends Enemy {
  
    constructor(scene, x, y, level, group, max_level, apparition_group) {

        const data = virus_data.data[level];

        super(scene, x + (100*apparition_group) - 50, y, level, group, max_level, apparition_group, data);

        this.type = "virus";
        this.attack = data.attack;
        this.attackTime = data.attackTime;
        this.attackCounter = data.attackTime;
        this.damage_anim = data.name + "_damage";
        this.death_anim = data.name + "_death";

    }

    
    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        if (!this.dying && this.lives <= 0) {
            this.dying = true;
            this.body.destroy();
            this.scene.virus_killed++;
            if (this.walking) this.anims.stop();
            this.on("animationcomplete", () => {
                this.play(this.death_anim);
                this.on("animationcomplete", () => this.destroy());
            });  
        }

        if (!this.dying && this.y > 0)
            this.attackCounter--;
        if (!this.dying && this.attackCounter === 0) {
            this.attackCounter = this.attackTime;
            const chance = Math.random() * 100;
            if (chance <= 5 && this.scene.projectilesOnScreen < this.scene.maxProjectiles) {
                this.scene.projectilesOnScreen++;
                Attack_Factory.createAttack(this.scene, this.attack, this, this.scene.player);
            }
        }
    }

   

    weapon_hit(weapon) {
        if (!this.mutating) {
            this.lives -= weapon.damage;
            this.play(this.damage_anim);
            this.takingdamage = true;
            this.on("animationcomplete", () => {
                this.takingdamage = false;
            });  
        }
    }
    


    medicine_hit() {
        if (!this.mutating) {
            if (this.level >= this.max_level){
                this.lives = this.level;
                this.lives += 1;
                this.anims.stop();
                this.play(this.walk_anim); 
            }
            else {
                this.mutating = true;
                this.play("mutation_anim");
                this.body.destroy();
                this.on("animationcomplete", () => {
                    this.setVisible(false);
                    let mutated_virus = new Virus(this.scene, this.x + 50, this.y, this.level + 1, this.group, this.max_level, 0);
                    mutated_virus.syncMovement(this.counter, this.x_right);
                    mutated_virus.can_move = this.can_move;
                    this.destroy();
                });
            }
        }
    }
}
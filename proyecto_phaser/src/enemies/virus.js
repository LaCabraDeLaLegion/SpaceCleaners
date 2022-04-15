import Enemy from "./enemy.js";
import virus_data from "../data/virus_data.js";

export default class Virus extends Enemy {
  
    constructor(scene, x, y, level, group, max_level, apparition_group) {

        const data = virus_data.data[level];

        super(scene, x + (100*apparition_group) - 50, y, level, group, max_level, apparition_group, data);

        this.type = "virus";
        this.damage_anim = data.name + "_damage";
        this.death_anim = data.name + "_death";

    }

    
    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        if (!this.takingdamage) {
            this.walking = true;
            if (!this.dying) this.play(this.walk_anim, this.walk_anim);
        }
        else 
            this.walking = false;
        
        if (!this.dying && this.lives <= 0) {
            this.dying = true;
            this.body.destroy();
            if (this.walking) this.anims.stop();
            this.on("animationcomplete", () => {
                this.play(this.death_anim);
                this.on("animationcomplete", () => this.destroy());
            });  
        }
    }

   

    weapon_hit() {
        console.log("virus.damage");
        this.lives--;
        this.play(this.damage_anim);
        this.takingdamage = true;
        this.on("animationcomplete", () => {
            this.takingdamage = false;
        });
    }
    


    medicine_hit() {
        if (this.level >= this.max_level){
            this.lives = this.level;
            this.lives += 1;
            this.anims.stop();
            this.play(this.walk_anim); 
            console.log("mutate");
        }
        else {
            this.setVisible(false);
            let mutated_virus = new Virus(this.scene, this.x + 50, this.y, this.level + 1, this.group, this.max_level, 0);
            console.log(mutated_virus.walk_anim);
            mutated_virus.syncMovement(this.counter, this.x_right);
            this.destroy();
            console.log("mutate");
        }
    }
}

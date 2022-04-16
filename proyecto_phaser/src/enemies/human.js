import Enemy from "./enemy.js";
import Virus from "./virus.js";
import humans_data from "../data/humans_data.js";
    
export default class Human extends Enemy {
  
    constructor(scene, x, y, level, group, max_level, apparition_group) { 
        
        const data = humans_data.data[level];

        super(scene, x + (100*apparition_group) - 50, y, level, group, max_level, apparition_group, data);
        
        this.type = "human";
        this.heal_anim = data.name + "_heal";
        this.healed_anim = data.name + "_healed";

    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        if (!this.healing) {
            this.walking = true;
            if (!this.healed) this.play(this.walk_anim, this.walk_anim);
        }
        else 
            this.walking = false;
        

        if (!this.healed && this.lives <= 0) {
            this.healed = true;
            this.body.destroy();
            if (this.walking) this.anims.stop();
            this.on("animationcomplete", () => {
                this.play(this.healed_anim);
                this.on("animationcomplete", () => this.destroy());
            }); 
                 
        }

    }

    weapon_hit(){
        console.log("level: " + this.level + "   max_level: " + this.max_level);
        if (this.level >= this.max_level){
            console.log("Data for new virus: " + this.x, this.y, this.level, this.group, this.max_level, this.apparition_group);
            this.setVisible(false);
            let virus = new Virus(this.scene, this.x + 50, this.y, this.level, this.group, this.max_level, 0);
            virus.syncMovement(this.counter, this.x_right);
            this.destroy();
        }
        else {
            this.setVisible(false);
            let virus = new Virus(this.scene, this.x + 50, this.y, this.level + 1, this.group, this.max_level, 0);
            virus.syncMovement(this.counter, this.x_right);
            this.destroy();
        }
    }

    medicine_hit(){
        this.lives--;
        this.play(this.heal_anim);
        this.healing = true;
        this.on("animationcomplete", () => {
            this.healing = false;
        });
    }
}

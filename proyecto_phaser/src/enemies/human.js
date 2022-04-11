import Enemy from "./enemy.js";
import Virus from "./virus.js";
    
let level_images = ["H1", "H2", "H3", "H4", "H5", "H6"];
let level_damage_images = ["H1-damage", "H2-damage", "H3-damage", "H4-damage", "H5-damage", "H6-damage"];
let level_animations = ["human_walk_1","human_walk_2","human_walk_3","human_walk_4","human_walk_5","human_walk_6"];
let level_lives = [1, 3, 5, 7];

export default class Human extends Enemy{
  
    constructor(scene, x, y, level_of_enemy, group, planet_level, apparition_group) {
        
        let name = level_images[level_of_enemy - 1];
        console.log("imagen humano " + name);
        super(scene, x + (100*apparition_group) - 50, y, name);
        
        this.addToGroup(group);
        this.group = group;
        this.type = "human";
        this.level = level_of_enemy;
        this.lives = level_lives[level_of_enemy - 1];
        this.animation = level_animations[level_of_enemy - 1];
        this.max_level = planet_level;
        this.vertical = false;
        this.apparition_group = apparition_group;
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        if (this.lives <= 0){
            this.scene.time.delayedCall(200, () => {
                this.dead = true;
                this.destroy();
                console.log("destroy");
            });
        }

    }

    weapon_hit(){
        console.log("level: " + this.level + "   max_level: " + this.max_level);
        if (this.level >= this.max_level){
            console.log("Data for new virus: " + this.x, this.y, this.level, this.group, this.max_level, 0);
            let virus = new Virus(this.scene, this.x, this.y, this.level, this.group, this.max_level, 0);
            virus.lives += 2;
            virus.play("virus_1");
            this.destroy();
            //virus.vertical = true;
        }
        else {
            let virus = new Virus(this.scene, this.x, this.y, this.level + 1, this.group, this.max_level, 0);
            virus.play("virus_1");
            /*this.scene.tweens.timeline({targets: virus, ease: "Linear", tweens:[
                {y: this.scene.cameras.main.height}
                ]});
            */
            this.destroy();
            //virus.vertical = true;
        }
    }

    medicine_hit(){
        this.lives--;
        /*
        this.anims.stop();
        this.setTexture(level_damage_images[this.level-1]);
        this.scene.time.delayedCall(150, () => {
            if (!this.dead) {
                this.setTexture(level_images[this.level - 1]);
                this.anims.play('virus_1'); //Falla esto
            }
        });
        */
    }
}

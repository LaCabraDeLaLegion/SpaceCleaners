import Enemy from "./enemy.js";

let level_images = ["V1", "V2", "V2", "V2"];
let level_damage_images = ["V1-damage", "V2-damage", "V3-damage", "V4-damage"];
let level_animations = ["virus_1", "virus_2", "virus_3", "virus_4"];
let level_damage_anims = ["virus_1_damage"];
let level_death_anims = ["virus_1_death"];
let level_lives = [1, 3, 5, 7];

export default class Virus extends Enemy{
  
    constructor(scene, x, y, level_of_enemy, group, planet_level) {
        
        let name = level_images[level_of_enemy - 1];

        super(scene, x, y, name);
        
        this.addToGroup(group);
        this.animation = level_animations[level_of_enemy - 1];
        this.damage_anim = level_damage_anims[level_of_enemy - 1];
        this.death_anim = level_death_anims[level_of_enemy - 1];
        this.group = group;
        this.type = "virus";
        this.level = level_of_enemy;
        this.lives = level_lives[level_of_enemy - 1];
        this.max_level = planet_level;
        this.vertical = false;
    }

    
    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        if (!this.dying && this.lives <= 0){
            this.dying = true;
            this.body.destroy();
            if (this.death_anim) {
                this.on("animationcomplete", () => this.play(this.death_anim));
                this.scene.time.delayedCall(700, () => {
                    this.destroy();
                    console.log("destroy");
                }); 
            }
            else if (this.damage_anim)
                this.on("animationcomplete", () => this.destroy());
            else this.destroy();
        }
    }

   

    weapon_hit(){
        console.log("virus.damage");
        this.lives--;
        if (this.damage_anim) {
            this.play(this.damage_anim);
            this.scene.time.delayedCall(450, () => {
                if (this.lives > 0) {
                    /*
                    Esto hay que ver como lo ponemos
                    */
                    this.play(level_animations[this.level-1]);
                }
            });
        }
    }


    medicine_hit() {
        if (this.level >= this.max_level){
            this.lives = level_lives[this.level - 1];
            this.lives += 2;
            this.anims.stop();
            this.play(level_animations[this.level-1]); //Esto es lo que falta por planetar
            /*this.scene.tweens.timeline({targets: this, ease: "Linear", tweens:[
                    {y: this.scene.cameras.main.height}
                    ]});
            */
            this.vertical = true;
            console.log("mutate");
        }
        else {
            this.level++;
            this.setTexture(level_images[this.level - 1]);
            this.lives = level_lives[this.level-1];
            this.anims.stop();
            this.damage_anim = level_damage_anims[this.level - 1];
            this.death_anim = level_death_anims[this.level - 1];
            this.play(level_animations[this.level-1]); //Esto es lo que falta por planetar
            /*this.scene.tweens.timeline({targets: this, ease: "Linear", tweens:[
                    {y: this.scene.cameras.main.height}
                    ]});
            */
            console.log("mutate");
            this.vertical = true;
        }
    }
}

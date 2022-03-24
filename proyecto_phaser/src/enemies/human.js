import Enemy from "./enemy.js";
import Virus from "./virus.js";
    
let level_images = ["H1", "H2", "H3", "H4"];
let level_damage_images = ["H1-damage", "H2-damage", "H3-damage", "H4-damage"];
let level_animations = ["human_walk_1","human_walk_2","human_walk_3","human_walk_4","human_walk_5","human_walk_6"];
let level_lives = [1, 3, 5, 7];

//Para crear movimientos personalizados para los monstruos creamos
//timelines especificos. Los tweens que se anadiran al timeline dependeran del nivel y tipo
//La lista tweens_monsters contiene para cada nivel representado por el indice la lista de tweens
let level_tweens = [
    [ //Provisional para el nivel 1
        {x: "+=50",
         y: "+=100"},
        {x: "-=50",
         y: "+=100"},
        {x: "+=50",
         y: "+=100"},
        {x: "-=50",
         y: "+=100"},
        {x: "+=50",
         y: "+=100"},
        {x: "-=50",
         y: "+=100"},
        {x: "+=50",
         y: "+=100"}
    ],
    [
        {},
        {},
        {},
        {}
    ]
];

export default class Human extends Enemy{
  
    constructor(scene, x, y, level_of_enemy, group, planet_level) {
        
        let name = level_images[level_of_enemy - 1];

        super(scene, x, y, name);
        
        this.addToGroup(group);
        this.group = group;
        this.type = "human";
        this.level = level_of_enemy;
        this.lives = level_lives[level_of_enemy - 1];
        this.movements = level_tweens[level_of_enemy - 1];
        this.animation = level_animations[level_of_enemy - 1];
        this.max_level = planet_level;
    }

    weapon_hit(){
        if (this.level >= this.max_level){
            let virus = new Virus(this.scene, this.x, this.y, this.level, this.group);
            virus.lives += 2;
            console.log("camera height: ", this.scene.cameras.main.height);
            virus.movements = [
                {y: this.scene.cameras.main.height}
                ];
            virus.play("virus_1");
            this.scene.tweens.timeline({targets: virus, ease: "Linear", duration:2000, tweens:virus.movements});
            this.destroy();
        }
        else {
            let virus = new Virus(this.scene, this.x, this.y, this.level + 1, this.group);
            virus.movements = [
                {y: this.scene.cameras.main.height}
                ];
            virus.play("virus_1");
            this.scene.tweens.timeline({targets: virus, ease: "Linear", duration:2000, tweens:virus.movements});
            this.destroy();
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

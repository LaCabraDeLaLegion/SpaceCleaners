import Enemy from "./enemy.js";

let level_images = ["V1", "V2", "V3", "V4"];
let level_damage_images = ["V1-damage", "V2-damage", "V3-damage", "V4-damage"];
let level_animations = ["virus_1", "virus_2", "virus_3", "virus_4"];
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

export default class Virus extends Enemy{
  
    constructor(scene, x, y, level_of_enemy, group) {
        
        let name = level_images[level_of_enemy - 1];

        super(scene, x, y, name);
        
        this.addToGroup(group);
        this.animation = level_animations[level_of_enemy - 1];
        this.group = group;
        this.type = "virus";
        this.level = level_of_enemy;
        this.lives = level_lives[level_of_enemy - 1];
        this.movements = level_tweens[level_of_enemy - 1];
    }

    weapon_hit(){
        console.log("virus.damage");
        this.lives--;
        this.anims.stop();
        this.setTexture(level_damage_images[this.level-1]);
        this.scene.time.delayedCall(150, () => {
            if (this.lives > 0) {
                /*
                Esto hay que ver como lo ponemos
                */
                this.setTexture(level_images[this.level - 1]);
                this.play(level_animations[this.level-1]);
            }
        });
    }

    medicine_hit(){
        this.level++;
        this.setTexture(level_images[this.level - 1]);
        this.lives = level_lives[this.level-1];
        this.anims.stop();
        this.play(level_animations[this.level-1]); //Esto es lo que falta por planetar
        console.log("mutate");
    }
}

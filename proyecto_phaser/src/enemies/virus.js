import Enemy from "./enemy.js";

let level_images = ["V1", "V1", "V3", "V4"];
let level_damage_images = ["V1-damage", "V1-damage", "V3-damage", "V4-damage"];
let level_lives = [1, 3, 5, 7];

//Para crear movimientos personalizados para los monstruos creamos
//timelines especificos. Los tweens que se anadiran al timeline dependeran del nivel y tipo
//La lista tweens_monsters contiene para cada nivel representado por el indice la lista de tweens
let level_tweens = [
    [ //Provisional para el nivel 1
        {x: "+= 400"},
        {y: "+= 200"},
        {x: "-= 400"},
        {y: "-= 200"}
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
        this.group = group;
        this.type = "virus";
        this.level = level_of_enemy;
        this.lives = level_lives[level_of_enemy - 1];
        this.movements = level_tweens[level_of_enemy - 1];
    }

    damage() {
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
                this.anims.play('virus_1'); //Falta esto
            }
        });
    }

    
    mutate(){
        this.level++;
        this.setTexture(level_images[this.level - 1]);
        this.setScale(1.5); //De momento, esto hay que quitarlo
        this.lives = level_lives[this.level-1];
        this.anims.stop();
        this.play('virus_1'); //Esto es lo que falta por planetar
        console.log("mutate");
    }
}
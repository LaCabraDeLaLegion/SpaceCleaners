import Enemy from "./enemy.js";
import Virus from "./virus.js";


let vertical_tween = [
{y: 400}
];

    
let level_images = ["H1", "H2", "H3", "H4"];
let level_damage_images = ["H1-damage", "H2-damage", "H3-damage", "H4-damage"];
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

export default class Human extends Enemy{
  
    constructor(scene, x, y, level_of_enemy, group) {
        
        let name = level_images[level_of_enemy - 1];

        super(scene, x, y, name);
        
        this.addToGroup(group);
        this.group = group;
        this.type = "human";
        this.level = level_of_enemy;
        this.lives = level_lives[level_of_enemy - 1];
        this.movements = level_tweens[level_of_enemy - 1];
    }

    damage() {
        //De momento no hay animacion de dano para el humano
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

    
    mutate(){
        //Idea actual. Creamos un virus en la misma posicion y en el mismo grupo. Le ponemos movimiento vertical. Destruimos el humano
        let virus = new Virus(this.scene, this.x, this.y, this.level + 1, this.group);
        virus.movements = vertical_tween;
        virus.play("virus_1");
        this.scene.tweens.timeline({targets: virus, ease: "Linear", duration:2000, tweens:virus.movements});
        this.destroy();
    }
}

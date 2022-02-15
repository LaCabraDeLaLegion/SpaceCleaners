let type = "monster"; // Monster para virus mutados y human para humanos infectados
let level = 1; //Nivel del enemigo
let lives = 1; //Numero de vidas
let movements = [ 
    {x: 400},
    {y: 300},
    {x: 60},
    {y: 60}
];

//Para crear movimientos personalizados para los monstruos creamos
//timelines especificos. Los tweens que se anadiran al timeline dependeran del nivel y tipo
//La lista tweens_monsters contiene para cada nivel representado por el indice la lista de tweens
let tweens_monsters = [
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
let tweens_humans = [
    [
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

export default class Enemy extends Phaser.GameObjects.Sprite {
  
    constructor(scene, x, y, name, type_of_enemy, level_of_enemy) {
        super(scene, x, y, name);
        this.scene.add.existing(this);
        type = type_of_enemy;
        level = level_of_enemy;
        if (level === 1){
            lives = 1;
        }

        if (type === "monster"){
            movements = tweens_monsters[level - 1];
        }
        else if (type === "human"){
            movements = tweens_humans[level - 1];
        }

    }

    preUpdate(t, dt) {

        super.preUpdate(t, dt);

        this.shootTime--;


    }

    getMovements(){
        return movements;
    }

}

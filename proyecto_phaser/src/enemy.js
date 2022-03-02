let images_monsters = ["V1", "V2", "V3", "V4"];
let images_humans = ["H1", "H2", "H3", "H4"];

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
  
    constructor(scene, x, y, type_of_enemy, level_of_enemy, enemyGroup) {
        
        let name = "";
        if (type_of_enemy == "monster"){
            name = images_monsters[level_of_enemy - 1];
        }
        else {
            name = images_humans[level_of_enemy - 1];
        }
        
        super(scene, x, y, name);
        
        this.scene.add.existing(this);
        
        this.scene.physics.add.existing(this);
        
        enemyGroup.add(this);
        
        this.type = type_of_enemy;
        level = level_of_enemy;
        if (level === 1){
            this.lives = 1;
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

        if (this.lives <= 0) this.destroy();

    }

    getMovements(){
        return movements;
    }

    damage() {
        this.lives--;
    }

    
    mutate(){
        this.level++;
        if (this.type === "human"){
            this.setTexture("V1");
            this.body.setSize(12, 12, false);
            this.type = "monster";
            this.anims.stop();
            this.play('virus_1');
        }
        else {
            this.setTexture("V1");
            this.setScale(1.5);
            this.lives++;
            this.body.setSize(12, 12, false);
            this.anims.stop();
            this.play('virus_1');
        }
        console.log("mutate");
    }
}

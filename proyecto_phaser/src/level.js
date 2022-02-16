import Player from "./player.js";
import Laser from "./laser.js";
import Enemy from "./enemy.js";


export default class Level extends Phaser.Scene {
  constructor() {
    super({ key: "level" });
  }

  preload() {
    this.load.setPath("assets/sprites/");
    this.load.image("player", "ship.png");
    this.load.image("laser", "laser.png");
    this.load.image("V1", "V1.png");
    this.load.image("H1", "H1.png");
  }

  create() {
    console.log("start");
    this.input.setDefaultCursor("url(assets/sprites/cursor.cur), pointer");
    this.player = new Player(this, 500, 500);
    this.player.setScale(0.25);
    // this.laser = this.add.group();
    // this.laser.enableBody = true;
    // this.laser.physicsBodyType = Phaser.Physics.ARCADE;
    // this.laser.createMultiple(50,'laser');
    

    this.virus = this.add.group();
    this.createEnemies();

  }

  addLaser(){
    this.laser = new Laser(this, this.player.x, this.player.y - 150);
    this.laser.setScale(0.25);
  }

  createEnemies(){
    this.createMonsters();
    this.createHumans();
  }

  createMonsters(){

    for (let x = 100; x < 200; x = x + 40){
        for (let y = 50; y < 150; y = y + 50){
          let monster = new Enemy(this, x, y, "V1", "monster", 1)
          this.virus.add(this.add.sprite(monster));
          this.alive_monsters = this.alive_monsters + 1;
          this.tweens.timeline({
            targets: monster,
            ease: "Linear",
            duration: 2000,
            tweens: monster.getMovements()
          });
        }
    }
  }

  createHumans(){

    let human = new Enemy(this, 200, 150, "H1", "human", 1)
    this.virus.add(this.add.sprite(human));
    this.alive_monsters = this.alive_monsters + 1;
    this.tweens.timeline({
      targets: human,
      ease: "Linear",
      duration: 2000,
      tweens: human.getMovements()
    });

    for (let x = 200; x < 200; x = x + 40){
      for (let y = 50; y < 150; y = y + 50){
        
      }
    }

  }
}
import Player from "./player.js";
import Laser from "./laser.js";

var virus;

export default class Level extends Phaser.Scene {
  constructor() {
    super({ key: "level" });
  }

  preload() {
    this.load.setPath("assets/sprites/");
    this.load.image("player", "ship.png");
    this.load.image("laser", "laser.png");
  }

  create() {
    console.log("start");
    this.input.setDefaultCursor("url(assets/sprites/cursor.cur), pointer");
    this.player = new Player(this, 500, 500);
    // this.laser = this.add.group();
    // this.laser.enableBody = true;
    // this.laser.physicsBodyType = Phaser.Physics.ARCADE;
    // this.laser.createMultiple(50,'laser');
    
    virus = this.add.group();
    virus.enableBody = true;
    virus.physicsBodyType = Phaser.Physics.ARCADE; 

    for (var y = 0; y < 4; y++)
    {
        for (var x = 0; x < 8; x++)
        {
            var monster = virus.create(x * 40 + 100, y * 50 + 40, 'V1');
            monster.setOrigin(0.5, 0.5);
        }
    }

    virus.x = 100;
    virus.y = 50;
    let tween = this.tweens.add({
      targets: virus.getChildren(), 
      ease: "Linear", 
      duration: 2000, 
      x: "+=200", 
      paused: false, 
      delay: 0, 
      loop: true,
      yoyo: true,
      repeat: -1,
      onLoop: listener()
    });
  }

  addLaser(){
    this.laser = new Laser(this, this.player.x, this.player.y - 150);
  }

}

function listener(){
  virus.y += 10;
}
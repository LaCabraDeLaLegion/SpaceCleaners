let earth_owner = "virus";
let earth_scale = 1;

export default class Map extends Phaser.Scene {
    constructor() {
      super({ key: "map" });
    }
  
    init(data){
        console.log("init data = " + data);
        if (data === "win"){
            earth_owner = "player";
            earth_scale = 2;
        }
    }

    preload() {
      this.load.setPath("assets/sprites/Map/");
      this.load.image("background_map", "background_map.png");
      this.load.image("grey_planet", "Baren.png");
      this.load.image("ice_planet", "Ice.png");
      this.load.image("lava_planet", "Lava.png");
      this.load.image("earth_planet", "Terran.png");
    }
  
    create() {
        this.add.image(450, 250, "background_map").setDepth(1).setScale(2).setRotation(300);
        let grey = this.add.image(350, 150, "grey_planet").setDepth(1).setScale(1.5);
        let ice = this.add.image(350, 350, "ice_planet").setDepth(1);
        let lava = this.add.image(650, 200, "lava_planet").setDepth(1).setScale(2);
        let earth = this.add.image(150, 250, "earth_planet").setDepth(1).setScale(earth_scale);

        earth.setInteractive();
        earth.on("pointerup", () => {
            this.scene.start("level");
        });
    }
  
  }
  
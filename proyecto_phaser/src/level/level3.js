import Level from "./level.js";
import Virus from "../enemies/virus.js";
import Human from "../enemies/human.js";
import virus_data from "../data/virus_data.js";
import humans_data from "../data/humans_data.js";

const enemy_virus = virus_data.data;
const enemy_humans = humans_data.data;

export default class Level3 extends Level {

    constructor() {
      super("level3");
    }
  
    init(data) {
        super.init(data);
        this.level = 3;
        this.virus_maxlevel = 3;
        this.human_maxlevel = 3;
        this.level_virus = [enemy_virus[1], enemy_virus[2], enemy_virus[3]];
        this.level_humans = [enemy_humans[1], enemy_humans[2], enemy_humans[3]];
        console.log("Nivel = 3");
      }
  
    preload() {
      super.preload();
      this.load_images();
      this.load_audio();
    }
  
    create() {
      super.create();

      this.addSounds();

      this.initEnemies();

      this.levelSong.play();
    }

    initEnemies() {
      super.initEnemies();
      this.createEnemies();
    }
  
    createEnemies() {
      this.createMonsters();
      this.createHumans();
    }

    createMonsters() {
      this.alive_monsters = 50;

      //Grupo 1
      let monster = new Virus(this, 50, -100, 1, this.enemies, this.level, 1);
      monster = new Virus(this, 100, -100, 1, this.enemies, this.level, 1);
      monster = new Virus(this, 250, -100, 1, this.enemies, this.level, 1);
      monster = new Virus(this, 300, -100, 1, this.enemies, this.level, 1);
    
      monster = new Virus(this, 50, -50, 2, this.enemies, this.level, 1);
      monster = new Virus(this, 100, -50, 2, this.enemies, this.level, 1);
      monster = new Virus(this, 250, -50, 2, this.enemies, this.level, 1);
      monster = new Virus(this, 300, -50, 2, this.enemies, this.level, 1);

      //Grupo 2
      monster = new Virus(this, 50, -250, 2, this.enemies, this.level, 2);
      monster = new Virus(this, 100, -250, 2, this.enemies, this.level, 2);
      monster = new Virus(this, 300, -250, 2, this.enemies, this.level, 2);
      monster = new Virus(this, 350, -250, 2, this.enemies, this.level, 2);

      monster = new Virus(this, 50, -200, 2, this.enemies, this.level, 2);
      monster = new Virus(this, 100, -200, 2, this.enemies, this.level, 2);
      monster = new Virus(this, 300, -200, 2, this.enemies, this.level, 2);
      monster = new Virus(this, 350, -200, 2, this.enemies, this.level, 2);

      //Grupo 3

      monster = new Virus(this, 100, -450, 2, this.enemies, this.level, 3);
      monster = new Virus(this, 150, -450, 2, this.enemies, this.level, 3);
      monster = new Virus(this, 300, -450, 2, this.enemies, this.level, 3);
      monster = new Virus(this, 350, -450, 2, this.enemies, this.level, 3);

      monster = new Virus(this, 150, -400, 3, this.enemies, this.level, 3);
      monster = new Virus(this, 300, -400, 3, this.enemies, this.level, 3);

      //Grupo 4

      monster = new Virus(this, 150, -550, 3, this.enemies, this.level, 4);
      monster = new Virus(this, 200, -550, 3, this.enemies, this.level, 4);
      monster = new Virus(this, 250, -550, 3, this.enemies, this.level, 4);
  }

  createHumans() {
    //Grupo 1

    let human = new Human(this, 150, -100, 1, this.enemies, this.level, 1);
    human = new Human(this, 200, -100, 1, this.enemies, this.level, 1);
    human = new Human(this, 150, -50, 2, this.enemies, this.level, 1);
    human = new Human(this, 200, -50, 2, this.enemies, this.level, 1);

    //Grupo 2

    human = new Human(this, 150, -250, 2, this.enemies, this.level, 2);
    human = new Human(this, 200, -250, 2, this.enemies, this.level, 2);
    human = new Human(this, 250, -250, 2, this.enemies, this.level, 2);

    human = new Human(this, 150, -200, 2, this.enemies, this.level, 2);
    human = new Human(this, 200, -200, 2, this.enemies, this.level, 2);
    human = new Human(this, 250, -200, 2, this.enemies, this.level, 2);

    //Grupo 3

    human = new Human(this, 50, -450, 3, this.enemies, this.level, 3);
    human = new Human(this, 200, -450, 2, this.enemies, this.level, 3);
    human = new Human(this, 250, -450, 2, this.enemies, this.level, 3);
    human = new Human(this, 400, -450, 3, this.enemies, this.level, 3);

    human = new Human(this, 200, -400, 3, this.enemies, this.level, 3);
    human = new Human(this, 250, -400, 3, this.enemies, this.level, 3);

    human = new Human(this, 200, -350, 3, this.enemies, this.level, 3);
    human = new Human(this, 250, -350, 3, this.enemies, this.level, 3);

    //Grupo 4

    human = new Human(this, 50, -600, 3, this.enemies, this.level, 4);
    human = new Human(this, 100, -600, 3, this.enemies, this.level, 4);
    human = new Human(this, 150, -600, 3, this.enemies, this.level, 4);
    human = new Human(this, 200, -600, 3, this.enemies, this.level, 4);
    human = new Human(this, 250, -600, 3, this.enemies, this.level, 4);
    human = new Human(this, 300, -600, 3, this.enemies, this.level, 4);
    human = new Human(this, 350, -600, 3, this.enemies, this.level, 4);

    human = new Human(this, 100, -550, 3, this.enemies, this.level, 4);
    human = new Human(this, 300, -550, 3, this.enemies, this.level, 4);

  }

    addSounds() {
        super.addSounds();
        this.levelSong = this.sound.add("level", {
          mute: false,
          volume: 2,
          rate: 1,
          detune: 0,
          seek: 0,
          loop: false,
          delay: 0,
        });
    }

    load_images() {  
        super.load_images();
    } 

    load_audio() {
        super.load_audio();
        this.load.audio("level", "/sounds/level1_song.mp3");
    }    

}
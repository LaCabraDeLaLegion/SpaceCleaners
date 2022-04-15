import Level from "./level.js";
import Virus from "../enemies/virus.js";
import Human from "../enemies/human.js";
import virus_data from "../data/virus_data.js";
import humans_data from "../data/humans_data.js";

const enemy_virus = virus_data.data;
const enemy_humans = humans_data.data;

export default class Level7 extends Level {

    constructor() {
      super("level7");
    }
    
    init(data) {
      super.init(data);
      this.level = 7;
      this.virus_maxlevel = 6;
      this.human_maxlevel = 6;
      this.level_virus = [enemy_virus[5], enemy_virus[6]];
      this.level_humans = [enemy_humans[5], enemy_humans[6]];
      console.log("Nivel = 7");
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
      let monster = new Virus(this, 50, -100, 5, this.enemies, 6, 1);
      monster = new Virus(this, 100, -100, 5, this.enemies, 6, 1);
      monster = new Virus(this, 250, -100, 5, this.enemies, 6, 1);
      monster = new Virus(this, 300, -100, 5, this.enemies, 6, 1);
    
      monster = new Virus(this, 50, -50, 6, this.enemies, 6, 1);
      monster = new Virus(this, 100, -50, 6, this.enemies, 6, 1);
      monster = new Virus(this, 250, -50, 6, this.enemies, 6, 1);
      monster = new Virus(this, 300, -50, 6, this.enemies, 6, 1);

      //Grupo 2
      monster = new Virus(this, 50, -250, 5, this.enemies, 6, 2);
      monster = new Virus(this, 100, -250, 5, this.enemies, 6, 2);
      monster = new Virus(this, 300, -250, 5, this.enemies, 6, 2);
      monster = new Virus(this, 350, -250, 5, this.enemies, 6, 2);

      monster = new Virus(this, 50, -200, 6, this.enemies, 6, 2);
      monster = new Virus(this, 100, -200, 6, this.enemies, 6, 2);
      monster = new Virus(this, 300, -200, 6, this.enemies, 6, 2);
      monster = new Virus(this, 350, -200, 6, this.enemies, 6, 2);

      //Grupo 3

      monster = new Virus(this, 100, -450, 5, this.enemies, 6, 3);
      monster = new Virus(this, 150, -450, 5, this.enemies, 6, 3);
      monster = new Virus(this, 300, -450, 5, this.enemies, 6, 3);
      monster = new Virus(this, 350, -450, 5, this.enemies, 6, 3);

      monster = new Virus(this, 150, -400, 6, this.enemies, 6, 3);

      //Grupo 4

      monster = new Virus(this, 150, -550, 6, this.enemies, 6, 4);
      monster = new Virus(this, 200, -550, 6, this.enemies, 6, 4);
      monster = new Virus(this, 250, -550, 6, this.enemies, 6, 4);
  }

  createHumans() {
    //Grupo 1

    let human = new Human(this, 150, -100, 5, this.enemies, 6, 1);
    human = new Human(this, 200, -100, 5, this.enemies, 6, 1);
    human = new Human(this, 150, -50, 5, this.enemies, 6, 1);
    human = new Human(this, 200, -50, 5, this.enemies, 6, 1);

    //Grupo 2

    human = new Human(this, 150, -250, 6, this.enemies, 6, 2);
    human = new Human(this, 200, -250, 6, this.enemies, 6, 2);
    human = new Human(this, 250, -250, 6, this.enemies, 6, 2);

    human = new Human(this, 150, -200, 6, this.enemies, 6, 2);
    human = new Human(this, 200, -200, 6, this.enemies, 6, 2);
    human = new Human(this, 250, -200, 6, this.enemies, 6, 2);

    //Grupo 3

    human = new Human(this, 50, -450, 5, this.enemies, 6, 3);
    human = new Human(this, 200, -450, 5, this.enemies, 6, 3);
    human = new Human(this, 250, -450, 5, this.enemies, 6, 3);
    human = new Human(this, 400, -450, 5, this.enemies, 6, 3);

    human = new Human(this, 150, -400, 6, this.enemies, 6, 3);
    human = new Human(this, 200, -400, 6, this.enemies, 6, 3);

    human = new Human(this, 150, -350, 5, this.enemies, 6, 3);
    human = new Human(this, 200, -350, 5, this.enemies, 6, 3);

    //Grupo 4

    human = new Human(this, 50, -600, 6, this.enemies, 6, 4);
    human = new Human(this, 100, -600, 6, this.enemies, 6, 4);
    human = new Human(this, 150, -600, 6, this.enemies, 6, 4);
    human = new Human(this, 200, -600, 6, this.enemies, 6, 4);
    human = new Human(this, 250, -600, 6, this.enemies, 6, 4);
    human = new Human(this, 300, -600, 6, this.enemies, 6, 4);
    human = new Human(this, 350, -600, 6, this.enemies, 6, 4);

    human = new Human(this, 100, -550, 6, this.enemies, 6, 4);
    human = new Human(this, 300, -550, 6, this.enemies, 6, 4);
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
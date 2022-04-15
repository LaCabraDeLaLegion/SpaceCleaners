import Level from "./level.js";
import Virus from "../enemies/virus.js";
import Human from "../enemies/human.js";

export default class Level6 extends Level {

    constructor() {
      super("level6");
    }
  
    init(data) {
      super.init(data);
      this.level = 6;
      this.virus_maxlevel = 6;
      this.human_maxlevel = 6;
      this.level_virus = ["virus_5", "virus_6"];
      this.level_humans = ["human_4", "human_5", "human_6"];
      console.log("Nivel = 6");
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
      this.alive_monsters = 40;

      //Grupo 1
      let monster = new Virus(this, 100, -100, 5, this.enemies, this.level, 1);
      monster = new Virus(this, 150, -100, 5, this.enemies, this.level, 1);
      monster = new Virus(this, 250, -100, 5, this.enemies, this.level, 1);
      monster = new Virus(this, 300, -100, 5, this.enemies, this.level, 1);
    
      monster = new Virus(this, 100, -50, 5, this.enemies, this.level, 1);
      monster = new Virus(this, 150, -50, 5, this.enemies, this.level, 1);
      monster = new Virus(this, 250, -50, 5, this.enemies, this.level, 1);
      monster = new Virus(this, 300, -50, 5, this.enemies, this.level, 1);

      //Grupo 2
      monster = new Virus(this, 100, -250, 6, this.enemies, this.level, 2);
      monster = new Virus(this, 150, -250, 6, this.enemies, this.level, 2);
      monster = new Virus(this, 250, -250, 6, this.enemies, this.level, 2);
      monster = new Virus(this, 300, -250, 6, this.enemies, this.level, 2);

      monster = new Virus(this, 100, -200, 5, this.enemies, this.level, 2);
      monster = new Virus(this, 150, -200, 5, this.enemies, this.level, 2);
      monster = new Virus(this, 250, -200, 5, this.enemies, this.level, 2);
      monster = new Virus(this, 300, -200, 5, this.enemies, this.level, 2);

      //Grupo 3

      monster = new Virus(this, 100, -400, 6, this.enemies, this.level, 3);
      monster = new Virus(this, 150, -400, 6, this.enemies, this.level, 3);
      monster = new Virus(this, 250, -400, 6, this.enemies, this.level, 3);
      monster = new Virus(this, 300, -400, 6, this.enemies, this.level, 3);
  }

  createHumans() {
    //Grupo 1
    let human = new Human(this, 50, -100, 4, this.enemies, this.level, 1);
    human = new Human(this, 200, -100, 4, this.enemies, this.level, 1);
    human = new Human(this, 350, -100, 4, this.enemies, this.level, 1);

    human = new Human(this, 50, -50, 4, this.enemies, this.level, 1);
    human = new Human(this, 200, -50, 4, this.enemies, this.level, 1);
    human = new Human(this, 350, -50, 4, this.enemies, this.level, 1);

    //Grupo 2

    human = new Human(this, 50, -250, 5, this.enemies, this.level, 2);
    human = new Human(this, 200, -250, 5, this.enemies, this.level, 2);
    human = new Human(this, 350, -250, 5, this.enemies, this.level, 2);

    human = new Human(this, 200, -200, 5, this.enemies, this.level, 2);

    //Grupo 3

    human = new Human(this, 50, -400, 5, this.enemies, this.level, 3);
    human = new Human(this, 50, -400, 5, this.enemies, this.level, 3);
    human = new Human(this, 50, -400, 5, this.enemies, this.level, 3);

    human = new Human(this, 50, -350, 6, this.enemies, this.level, 3);
    human = new Human(this, 100, -350, 6, this.enemies, this.level, 3);
    human = new Human(this, 150, -350, 6, this.enemies, this.level, 3);
    human = new Human(this, 200, -350, 6, this.enemies, this.level, 3);
    human = new Human(this, 250, -350, 6, this.enemies, this.level, 3);
    human = new Human(this, 300, -350, 6, this.enemies, this.level, 3);
    human = new Human(this, 350, -350, 6, this.enemies, this.level, 3);
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
import Anim_Factory from "./anim_factory.js";
import Level from "./level.js";
import Virus from "../enemies/virus.js";
import Human from "../enemies/human.js";

export default class Level1 extends Level {

    constructor() {
      super("level7");
    }
    
    init(data) {
      super.init(data);
      this.level = 7;
      console.log("Nivel = 7");
    }
  
    preload() {
      super.preload();
      this.load_images();
      this.load_spritesheets();
      this.load_audio();
    }
  
    create() {
        super.create();
  
        this.createAnimations();
        this.addSounds();
  
        this.initPlayer();
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
        monster.play(monster.animation);
        monster = new Virus(this, 100, -100, 5, this.enemies, 6, 1);
        monster.play(monster.animation);
        monster = new Virus(this, 250, -100, 5, this.enemies, 6, 1);
        monster.play(monster.animation);
        monster = new Virus(this, 300, -100, 5, this.enemies, 6, 1);
        monster.play(monster.animation);
      
        monster = new Virus(this, 50, -50, 6, this.enemies, 6, 1);
        monster.play(monster.animation);
        monster = new Virus(this, 100, -50, 6, this.enemies, 6, 1);
        monster.play(monster.animation);
        monster = new Virus(this, 250, -50, 6, this.enemies, 6, 1);
        monster.play(monster.animation);
        monster = new Virus(this, 300, -50, 6, this.enemies, 6, 1);
        monster.play(monster.animation);
  
        //Grupo 2
        monster = new Virus(this, 50, -250, 5, this.enemies, 6, 2);
        monster.play(monster.animation);
        monster = new Virus(this, 100, -250, 5, this.enemies, 6, 2);
        monster.play(monster.animation);
        monster = new Virus(this, 300, -250, 5, this.enemies, 6, 2);
        monster.play(monster.animation);
        monster = new Virus(this, 350, -250, 5, this.enemies, 6, 2);
        monster.play(monster.animation);
  
        monster = new Virus(this, 50, -200, 6, this.enemies, 6, 2);
        monster.play(monster.animation);
        monster = new Virus(this, 100, -200, 6, this.enemies, 6, 2);
        monster.play(monster.animation);
        monster = new Virus(this, 300, -200, 6, this.enemies, 6, 2);
        monster.play(monster.animation);
        monster = new Virus(this, 350, -200, 6, this.enemies, 6, 2);
        monster.play(monster.animation);
  
        //Grupo 3
  
        monster = new Virus(this, 100, -450, 5, this.enemies, 6, 3);
        monster.play(monster.animation);
        monster = new Virus(this, 150, -450, 5, this.enemies, 6, 3);
        monster.play(monster.animation);
        monster = new Virus(this, 300, -450, 5, this.enemies, 6, 3);
        monster.play(monster.animation);
        monster = new Virus(this, 350, -450, 5, this.enemies, 6, 3);
        monster.play(monster.animation);
  
        monster = new Virus(this, 150, -400, 6, this.enemies, 6, 3);
        monster.play(monster.animation);
        monster = new Virus(this, 300, -400, 6, this.enemies, 6, 3);
        monster.play(monster.animation);
  
        //Grupo 4
  
        monster = new Virus(this, 150, -550, 6, this.enemies, 6, 4);
        monster.play(monster.animation);
        monster = new Virus(this, 200, -550, 6, this.enemies, 6, 4);
        monster.play(monster.animation);
        monster = new Virus(this, 250, -550, 6, this.enemies, 6, 4);
        monster.play(monster.animation);       
    }

    createHumans() {
      //Grupo 1

      let human = new Human(this, 150, -100, 5, this.enemies, 6, 1);
      human.play(human.animation);
      human = new Human(this, 200, -100, 5, this.enemies, 6, 1);
      human.play(human.animation);
      human = new Human(this, 150, -50, 5, this.enemies, 6, 1);
      human.play(human.animation);
      human = new Human(this, 200, -50, 5, this.enemies, 6, 1);
      human.play(human.animation);

      //Grupo 2

      human = new Human(this, 150, -250, 6, this.enemies, 6, 2);
      human.play(human.animation);
      human = new Human(this, 200, -250, 6, this.enemies, 6, 2);
      human.play(human.animation);
      human = new Human(this, 250, -250, 6, this.enemies, 6, 2);
      human.play(human.animation);

      human = new Human(this, 150, -200, 6, this.enemies, 6, 2);
      human.play(human.animation);
      human = new Human(this, 200, -200, 6, this.enemies, 6, 2);
      human.play(human.animation);
      human = new Human(this, 250, -200, 6, this.enemies, 6, 2);
      human.play(human.animation);

      //Grupo 3

      human = new Human(this, 50, -450, 5, this.enemies, 6, 3);
      human.play(human.animation);
      human = new Human(this, 200, -450, 5, this.enemies, 6, 3);
      human.play(human.animation);
      human = new Human(this, 250, -450, 5, this.enemies, 6, 3);
      human.play(human.animation);
      human = new Human(this, 400, -450, 5, this.enemies, 6, 3);
      human.play(human.animation);

      human = new Human(this, 150, -400, 6, this.enemies, 6, 3);
      human.play(human.animation);
      human = new Human(this, 200, -400, 6, this.enemies, 6, 3);
      human.play(human.animation);

      human = new Human(this, 150, -350, 5, this.enemies, 6, 3);
      human.play(human.animation);
      human = new Human(this, 200, -350, 5, this.enemies, 6, 3);
      human.play(human.animation);

      //Grupo 4

      human = new Human(this, 50, -600, 6, this.enemies, 6, 4);
      human.play(human.animation);
      human = new Human(this, 100, -600, 6, this.enemies, 6, 4);
      human.play(human.animation);
      human = new Human(this, 150, -600, 6, this.enemies, 6, 4);
      human.play(human.animation);
      human = new Human(this, 200, -600, 6, this.enemies, 6, 4);
      human.play(human.animation);
      human = new Human(this, 250, -600, 6, this.enemies, 6, 4);
      human.play(human.animation);
      human = new Human(this, 300, -600, 6, this.enemies, 6, 4);
      human.play(human.animation);
      human = new Human(this, 350, -600, 6, this.enemies, 6, 4);
      human.play(human.animation);

      human = new Human(this, 100, -550, 6, this.enemies, 6, 4);
      human.play(human.animation);
      human = new Human(this, 300, -550, 6, this.enemies, 6, 4);
      human.play(human.animation);
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

    createAnimations() {
        super.createAnimations();
        this.createEnemyAnims();
    }

    createEnemyAnims() {
      Anim_Factory.humans_anims(this, "human_5");
      Anim_Factory.humans_anims(this, "human_6");
      Anim_Factory.virus_anims(this, "virus_5");
      Anim_Factory.virus_anims(this, "virus_6");
    }

    load_spritesheets() {
        super.load_spritesheets();
        this.load_enemy_spritesheets();
    }

    load_enemy_spritesheets() {
      Anim_Factory.humans_spritesheets(this, "human_5");
      Anim_Factory.humans_spritesheets(this, "human_6");
      Anim_Factory.virus_spritesheets(this, "virus_5");
      Anim_Factory.virus_spritesheets(this, "virus_6");
    }

    load_images() {  
        super.load_images();
    } 

    load_audio() {
        super.load_audio();
        this.load.audio("level", "/sounds/level1_song.mp3");
    }    

}
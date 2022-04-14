import Anim_Factory from "./anim_factory.js";
import Level from "./level.js";
import Virus from "../enemies/virus.js";
import Human from "../enemies/human.js";

export default class Level1 extends Level {

    constructor() {
      super("level2");
    }
  
    init(data) {
        super.init(data);
        this.level = 2;
        console.log("Nivel = 2");
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
        
        this.alive_monsters = 40;

        //Grupo 1
        let monster = new Virus(this, 100, -100, 1, this.enemies, this.level, 1);
        monster.play(monster.animation);
        monster = new Virus(this, 150, -100, 1, this.enemies, this.level, 1);
        monster.play(monster.animation);
        monster = new Virus(this, 250, -100, 1, this.enemies, this.level, 1);
        monster.play(monster.animation);
        monster = new Virus(this, 300, -100, 1, this.enemies, this.level, 1);
        monster.play(monster.animation);
      
        monster = new Virus(this, 100, -50, 1, this.enemies, this.level, 1);
        monster.play(monster.animation);
        monster = new Virus(this, 150, -50, 1, this.enemies, this.level, 1);
        monster.play(monster.animation);
        monster = new Virus(this, 250, -50, 1, this.enemies, this.level, 1);
        monster.play(monster.animation);
        monster = new Virus(this, 300, -50, 1, this.enemies, this.level, 1);
        monster.play(monster.animation);
  
        //Grupo 2
        monster = new Virus(this, 100, -250, 1, this.enemies, this.level, 2);
        monster.play(monster.animation);
        monster = new Virus(this, 150, -250, 1, this.enemies, this.level, 2);
        monster.play(monster.animation);
        monster = new Virus(this, 250, -250, 1, this.enemies, this.level, 2);
        monster.play(monster.animation);
        monster = new Virus(this, 300, -250, 1, this.enemies, this.level, 2);
        monster.play(monster.animation);
  
        monster = new Virus(this, 100, -200, 1, this.enemies, this.level, 2);
        monster.play(monster.animation);
        monster = new Virus(this, 150, -200, 1, this.enemies, this.level, 2);
        monster.play(monster.animation);
        monster = new Virus(this, 250, -200, 1, this.enemies, this.level, 2);
        monster.play(monster.animation);
        monster = new Virus(this, 300, -200, 1, this.enemies, this.level, 2);
        monster.play(monster.animation);
  
        //Grupo 3
  
        monster = new Virus(this, 100, -400, 2, this.enemies, this.level, 3);
        monster.play(monster.animation);
        monster = new Virus(this, 150, -400, 2, this.enemies, this.level, 3);
        monster.play(monster.animation);
        monster = new Virus(this, 250, -400, 2, this.enemies, this.level, 3);
        monster.play(monster.animation);
        monster = new Virus(this, 300, -400, 2, this.enemies, this.level, 3);
        monster.play(monster.animation);      
    }

    createHumans() {
      //Grupo 1
      let human = new Human(this, 50, -100, 1, this.enemies, this.level, 1);
      human.play(human.animation);
      human = new Human(this, 200, -100, 1, this.enemies, this.level, 1);
      human.play(human.animation);
      human = new Human(this, 350, -100, 1, this.enemies, this.level, 1);
      human.play(human.animation);

      human = new Human(this, 50, -50, 1, this.enemies, this.level, 1);
      human.play(human.animation);
      human = new Human(this, 200, -50, 1, this.enemies, this.level, 1);
      human.play(human.animation);
      human = new Human(this, 350, -50, 1, this.enemies, this.level, 1);
      human.play(human.animation);

      //Grupo 2

      human = new Human(this, 50, -250, 1, this.enemies, this.level, 2);
      human.play(human.animation);
      human = new Human(this, 200, -250, 1, this.enemies, this.level, 2);
      human.play(human.animation);
      human = new Human(this, 350, -250, 1, this.enemies, this.level, 2);
      human.play(human.animation);

      human = new Human(this, 200, -200, 1, this.enemies, this.level, 2);
      human.play(human.animation);

      //Grupo 3

      human = new Human(this, 50, -400, 2, this.enemies, this.level, 3);
      human.play(human.animation);
      human = new Human(this, 200, -400, 2, this.enemies, this.level, 3);
      human.play(human.animation);
      human = new Human(this, 350, -400, 2, this.enemies, this.level, 3);
      human.play(human.animation);

      human = new Human(this, 50, -350, 2, this.enemies, this.level, 3);
      human.play(human.animation);
      human = new Human(this, 100, -350, 2, this.enemies, this.level, 3);
      human.play(human.animation);
      human = new Human(this, 150, -350, 2, this.enemies, this.level, 3);
      human.play(human.animation);
      human = new Human(this, 200, -350, 2, this.enemies, this.level, 3);
      human.play(human.animation);
      human = new Human(this, 250, -350, 2, this.enemies, this.level, 3);
      human.play(human.animation);
      human = new Human(this, 300, -350, 2, this.enemies, this.level, 3);
      human.play(human.animation);
      human = new Human(this, 350, -350, 2, this.enemies, this.level, 3);
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
      Anim_Factory.humans_anims(this, "human_1");
      Anim_Factory.humans_anims(this, "human_2");
      Anim_Factory.virus_anims(this, "virus_1");
      Anim_Factory.virus_anims(this, "virus_2");
    }

    load_spritesheets() {
      super.load_spritesheets();
      this.load_enemy_spritesheets();
    }

    load_enemy_spritesheets() {
      Anim_Factory.humans_spritesheets(this, "human_1");
      Anim_Factory.humans_spritesheets(this, "human_2");
      Anim_Factory.virus_spritesheets(this, "virus_1");
      Anim_Factory.virus_spritesheets(this, "virus_2");
    }

    load_images() {  
      super.load_images();
    } 

    load_audio() {
      super.load_audio();
      this.load.audio("level", "/sounds/level1_song.mp3");
    }    

}
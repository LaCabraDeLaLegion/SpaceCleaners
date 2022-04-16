import Level from "./level.js";
import Virus from "../enemies/virus.js";
import Human from "../enemies/human.js";
import virus_data from "../data/virus_data.js";
import humans_data from "../data/humans_data.js";
import Sound from "../data/sounds.js";

const enemy_virus = virus_data.data;
const enemy_humans = humans_data.data;

export default class Level2 extends Level {
  constructor() {
    super("level2");
  }

  init(data) {
    super.init(data);
    this.level = 2;
    this.virus_maxlevel = 2;
    this.human_maxlevel = 2;
    this.level_virus = [enemy_virus[1], enemy_virus[2]];
    this.level_humans = [enemy_humans[1], enemy_humans[2]];
    console.log("Nivel = 2");
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
    let monster = new Virus(this, 100, -100, 1, this.enemies, this.level, 1);
    monster = new Virus(this, 150, -100, 1, this.enemies, this.level, 1);
    monster = new Virus(this, 250, -100, 1, this.enemies, this.level, 1);
    monster = new Virus(this, 300, -100, 1, this.enemies, this.level, 1);

    monster = new Virus(this, 100, -50, 1, this.enemies, this.level, 1);
    monster = new Virus(this, 150, -50, 1, this.enemies, this.level, 1);
    monster = new Virus(this, 250, -50, 1, this.enemies, this.level, 1);
    monster = new Virus(this, 300, -50, 1, this.enemies, this.level, 1);

    //Grupo 2
    monster = new Virus(this, 100, -250, 1, this.enemies, this.level, 2);
    monster = new Virus(this, 150, -250, 1, this.enemies, this.level, 2);
    monster = new Virus(this, 250, -250, 1, this.enemies, this.level, 2);
    monster = new Virus(this, 300, -250, 1, this.enemies, this.level, 2);

    monster = new Virus(this, 100, -200, 1, this.enemies, this.level, 2);
    monster = new Virus(this, 150, -200, 1, this.enemies, this.level, 2);
    monster = new Virus(this, 250, -200, 1, this.enemies, this.level, 2);
    monster = new Virus(this, 300, -200, 1, this.enemies, this.level, 2);

    //Grupo 3

    monster = new Virus(this, 100, -400, 2, this.enemies, this.level, 3);
    monster = new Virus(this, 150, -400, 2, this.enemies, this.level, 3);
    monster = new Virus(this, 250, -400, 2, this.enemies, this.level, 3);
    monster = new Virus(this, 300, -400, 2, this.enemies, this.level, 3);
  }

  createHumans() {
    //Grupo 1
    let human = new Human(this, 50, -100, 1, this.enemies, this.level, 1);
    human = new Human(this, 200, -100, 1, this.enemies, this.level, 1);
    human = new Human(this, 350, -100, 1, this.enemies, this.level, 1);

    human = new Human(this, 50, -50, 1, this.enemies, this.level, 1);
    human = new Human(this, 200, -50, 1, this.enemies, this.level, 1);
    human = new Human(this, 350, -50, 1, this.enemies, this.level, 1);

    //Grupo 2

    human = new Human(this, 50, -250, 1, this.enemies, this.level, 2);
    human = new Human(this, 200, -250, 1, this.enemies, this.level, 2);
    human = new Human(this, 350, -250, 1, this.enemies, this.level, 2);

    human = new Human(this, 200, -200, 1, this.enemies, this.level, 2);

    //Grupo 3

    human = new Human(this, 50, -400, 2, this.enemies, this.level, 3);
    human = new Human(this, 200, -400, 2, this.enemies, this.level, 3);
    human = new Human(this, 350, -400, 2, this.enemies, this.level, 3);

    human = new Human(this, 50, -350, 2, this.enemies, this.level, 3);
    human = new Human(this, 100, -350, 2, this.enemies, this.level, 3);
    human = new Human(this, 150, -350, 2, this.enemies, this.level, 3);
    human = new Human(this, 200, -350, 2, this.enemies, this.level, 3);
    human = new Human(this, 250, -350, 2, this.enemies, this.level, 3);
    human = new Human(this, 300, -350, 2, this.enemies, this.level, 3);
    human = new Human(this, 350, -350, 2, this.enemies, this.level, 3);
  }
  addSounds() {
    super.addSounds();
    this.levelSong = this.sound.add("level2", Sound.level);
  }

  load_images() {
    super.load_images();
  }

  load_audio() {
    super.load_audio();
    this.load.audio("level2", "/sounds/level2_song.mp3");
  }
}

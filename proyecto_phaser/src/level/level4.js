import Level from "./level.js";
import Virus from "../enemies/virus.js";
import Human from "../enemies/human.js";
import virus_data from "../data/virus_data.js";
import humans_data from "../data/humans_data.js";
import Sound from "../data/sounds.js";

const enemy_virus = virus_data.data;
const enemy_humans = humans_data.data;

export default class Level4 extends Level {
  constructor() {
    super("level4");
  }

  init(data) {
    super.init(data);
    this.level = 4;
    this.virus_maxlevel = 4;
    this.human_maxlevel = 4;
    console.log("Nivel = 4");
    this.reward = 400;
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
    let monster = new Virus(this, 100, -100, 2, this.enemies, this.level, 1);
    monster = new Virus(this, 150, -100, 2, this.enemies, this.level, 1);
    monster = new Virus(this, 250, -100, 2, this.enemies, this.level, 1);
    monster = new Virus(this, 300, -100, 2, this.enemies, this.level, 1);

    monster = new Virus(this, 100, -50, 2, this.enemies, this.level, 1);
    monster = new Virus(this, 150, -50, 2, this.enemies, this.level, 1);
    monster = new Virus(this, 250, -50, 2, this.enemies, this.level, 1);
    monster = new Virus(this, 300, -50, 2, this.enemies, this.level, 1);

    //Grupo 2
    monster = new Virus(this, 100, -250, 3, this.enemies, this.level, 2);
    monster = new Virus(this, 150, -250, 3, this.enemies, this.level, 2);
    monster = new Virus(this, 250, -250, 3, this.enemies, this.level, 2);
    monster = new Virus(this, 300, -250, 3, this.enemies, this.level, 2);

    monster = new Virus(this, 100, -200, 3, this.enemies, this.level, 2);
    monster = new Virus(this, 150, -200, 3, this.enemies, this.level, 2);
    monster = new Virus(this, 250, -200, 3, this.enemies, this.level, 2);
    monster = new Virus(this, 300, -200, 3, this.enemies, this.level, 2);

    //Grupo 3

    monster = new Virus(this, 100, -400, 4, this.enemies, this.level, 3);
    monster = new Virus(this, 150, -400, 4, this.enemies, this.level, 3);
    monster = new Virus(this, 250, -400, 4, this.enemies, this.level, 3);
    monster = new Virus(this, 300, -400, 4, this.enemies, this.level, 3);
  }

  createHumans() {
    //Grupo 1
    let human = new Human(this, 50, -100, 2, this.enemies, this.level, 1);
    human = new Human(this, 200, -100, 2, this.enemies, this.level, 1);
    human = new Human(this, 350, -100, 2, this.enemies, this.level, 1);

    human = new Human(this, 50, -50, 2, this.enemies, this.level, 1);
    human = new Human(this, 200, -50, 2, this.enemies, this.level, 1);
    human = new Human(this, 350, -50, 2, this.enemies, this.level, 1);

    //Grupo 2

    human = new Human(this, 50, -250, 3, this.enemies, this.level, 2);
    human = new Human(this, 200, -250, 3, this.enemies, this.level, 2);
    human = new Human(this, 350, -250, 3, this.enemies, this.level, 2);

    human = new Human(this, 200, -200, 3, this.enemies, this.level, 2);

    //Grupo 3

    human = new Human(this, 50, -400, 3, this.enemies, this.level, 3);
    human = new Human(this, 200, -400, 3, this.enemies, this.level, 3);
    human = new Human(this, 350, -400, 3, this.enemies, this.level, 3);

    human = new Human(this, 50, -350, 4, this.enemies, this.level, 3);
    human = new Human(this, 100, -350, 4, this.enemies, this.level, 3);
    human = new Human(this, 150, -350, 4, this.enemies, this.level, 3);
    human = new Human(this, 200, -350, 4, this.enemies, this.level, 3);
    human = new Human(this, 250, -350, 4, this.enemies, this.level, 3);
    human = new Human(this, 300, -350, 4, this.enemies, this.level, 3);
    human = new Human(this, 350, -350, 4, this.enemies, this.level, 3);
  }

  addSounds() {
    super.addSounds();
    this.levelSong = this.sound.add("level1", Sound.level);
  }

}

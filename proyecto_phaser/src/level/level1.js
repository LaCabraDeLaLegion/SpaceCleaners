import Level from "./level.js";
import Virus from "../enemies/virus.js";
import Human from "../enemies/human.js";
import virus_data from "../data/virus_data.js";
import humans_data from "../data/humans_data.js";
import Sound from "../data/sounds.js";

export default class Level1 extends Level {
  constructor() {
    super("level1");
  }

  init(data) {
    super.init(data);
    this.level = 1;
    this.virus_maxlevel = 1;
    this.human_maxlevel = 1;
    this.reward = 300;
  }

  create() {
    super.create();
    this.add
      .image(this.globalWidth / 2, this.globalHeight / 2, "level1_background")
      .setDepth(-1)
      .setScale(1);
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
    this.alive_monsters = 30;

    // Grupo 1

    let monster = new Virus(this, 50, 50, 1, this.enemies, this.level, 1);
    monster = new Virus(this, 100, 50, 1, this.enemies, this.level, 1);
    monster = new Virus(this, 200, 50, 1, this.enemies, this.level, 1);
    monster = new Virus(this, 250, 50, 1, this.enemies, this.level, 1);

    monster = new Virus(this, 50, 100, 1, this.enemies, this.level, 1);
    monster = new Virus(this, 100, 100, 1, this.enemies, this.level, 1);
    monster = new Virus(this, 200, 100, 1, this.enemies, this.level, 1);
    monster = new Virus(this, 250, 100, 1, this.enemies, this.level, 1);

    //Grupo 2
    monster = new Virus(this, 50, -50, 1, this.enemies, this.level, 2);
    monster = new Virus(this, 100, -50, 1, this.enemies, this.level, 2);
    monster = new Virus(this, 200, -50, 1, this.enemies, this.level, 2);
    monster = new Virus(this, 250, -50, 1, this.enemies, this.level, 2);

    monster = new Virus(this, 50, -100, 1, this.enemies, this.level, 2);
    monster = new Virus(this, 100, -100, 1, this.enemies, this.level, 2);
    monster = new Virus(this, 200, -100, 1, this.enemies, this.level, 2);
    monster = new Virus(this, 250, -100, 1, this.enemies, this.level, 2);

    //Grupo 3
    monster = new Virus(this, 50, -250, 1, this.enemies, this.level, 3);
    monster = new Virus(this, 100, -250, 1, this.enemies, this.level, 3);
    monster = new Virus(this, 200, -250, 1, this.enemies, this.level, 3);
    monster = new Virus(this, 250, -250, 1, this.enemies, this.level, 3);
  }

  createHumans() {
    //Grupo 1
    let human = new Human(this, 150, 50, 1, this.enemies, this.level, 1);
    human = new Human(this, 150, 100, 1, this.enemies, this.level, 1);

    //Grupo 2
    human = new Human(this, 150, -100, 1, this.enemies, this.level, 2);
    human = new Human(this, 150, -50, 1, this.enemies, this.level, 2);

    //Grupo 3
    human = new Human(this, 150, -250, 1, this.enemies, this.level, 3);

    human = new Human(this, 50, -200, 1, this.enemies, this.level, 3);
    human = new Human(this, 100, -200, 1, this.enemies, this.level, 3);
    human = new Human(this, 150, -200, 1, this.enemies, this.level, 3);
    human = new Human(this, 200, -200, 1, this.enemies, this.level, 3);
    human = new Human(this, 250, -200, 1, this.enemies, this.level, 3);
  }

  addSounds() {
    super.addSounds();
    this.levelSong = this.sound.add("level1", Sound.level);
    this.bossSong = this.sound.add("boss1_song", Sound.bossSound1);
  }
}

import Level from "./level.js";
import Virus from "../enemies/virus.js";
import Human from "../enemies/human.js";
import virus_data from "../data/virus_data.js";
import humans_data from "../data/humans_data.js";
import Sound from "../data/sounds.js";
import Ender from "../bosses/ender.js";

const enemy_virus = virus_data.data;
const enemy_humans = humans_data.data;

let battle_texts = [
  [
    ["Habeis llegado lejos terricola."],
    [
      "Me imagino que no penseries que esta pandemia a nivel galactico ha sido cosa del azar.",
    ],
  ],
  [
    ["Exacto, yo soy el creador de tanto virus!"],
    ["Un cuerpo tan débil como el tuyo no podra acercarse a mi."],
  ],
  [["Despidete de todo lo que conoces..."]],
];
export default class Level7 extends Level {
  constructor() {
    super("level7");
  }

  init(data) {
    super.init(data);
    this.level = 7;
    this.virus_maxlevel = 6;
    this.human_maxlevel = 6;
    this.reward = 500;
    this.bossTranformation = true;
  }

  create() {
    super.create();
    this.counter = 0;
    this.battle_texts = battle_texts;
    this.add
      .image(this.globalWidth / 2, this.globalHeight / 2, "level2_background")
      .setDepth(-1)
      .setScale(1.7);
    this.addSounds();
    this.initEnemies();
    this.levelSong.play();
    this.enderInScene = false;

    this.text = this.add
      .text(
        30,
        this.cameras.main.height - 170,
        this.battle_texts[this.counter],
        {
          fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
          fontSize: "24px",
        }
      )
      .setDepth(11);

    this.ok = this.add
      .image(730, this.cameras.main.height - 70, "ok")
      .setDepth(10)
      .setOrigin(0, 0);
    this.ok.setInteractive({
      cursor: "url(assets/cursors/selector.cur), pointer",
    });
    this.ok.on("pointerup", () => {
      this.counter++;

      if (this.counter >= this.battle_texts.length) {
        this.ok.input.enabled = false;
        this.setTutorialContainerVisibility(false);
        if (this.battle_texts == battle_texts) {
          this.counter = 0;
          this.texts = battle_texts;
          this.text.setText(this.texts[this.counter]);
          this.planet_1.setInteractive({
            cursor: "url(assets/cursors/selector.cur), pointer",
          });
        } else if (this.texts == battle_texts) {
          this.counter = 0;
          this.texts = map_store_texts;
          this.text.setText(this.texts[this.counter]);
          this.setPlanetsVisibility(true);
          this.setLocksVisibility(true);
          this.setTutorialContainerVisibility(true);
          this.ok.enabled = true;
          this.lock2.setVisible(false);
          this.planet_1.setTexture("planet_1_player");
          this.ok.input.enabled = true;
        } else if (this.texts == map_store_texts) {
          this.counter = 0;
          this.scene.start("menu");
        }
      } else {
        if (this.texts == battle_texts) {
          if (this.counter == 2) {
            this.player.can_move = true;
            this.setTutorialContainerVisibility(false);
            this.ok.enabled = false;
          } else if (this.counter == 4) {
            this.player.can_shoot = true;
            this.setTutorialContainerVisibility(false);
            this.ok.enabled = false;
          } else if (this.counter == 5) {
            this.player.can_cure = true;
            this.player.can_shoot = false;
            this.setTutorialContainerVisibility(false);
            this.ok.enabled = false;
          } else if (this.counter == 6) {
            this.player.can_cure = true;
            this.player.can_shoot = true;
            this.setTutorialContainerVisibility(false);
            this.ok.enabled = false;
          } else if (this.counter == 8) {
            this.setTutorialContainerVisibility(false);
            this.ok.enabled = false;
            this.events.emit("boss_fight");
          }
        }
        this.text.setText(this.battle_texts[this.counter]);
      }
    });
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
    this.alive_monsters = 2; //50

    //Grupo 1
    let monster = new Virus(this, 50, -100, 5, this.enemies, 6, 1);
    // monster = new Virus(this, 100, -100, 5, this.enemies, 6, 1);
    // monster = new Virus(this, 250, -100, 5, this.enemies, 6, 1);
    // monster = new Virus(this, 300, -100, 5, this.enemies, 6, 1);

    // monster = new Virus(this, 50, -50, 6, this.enemies, 6, 1);
    // monster = new Virus(this, 100, -50, 6, this.enemies, 6, 1);
    // monster = new Virus(this, 250, -50, 6, this.enemies, 6, 1);
    // monster = new Virus(this, 300, -50, 6, this.enemies, 6, 1);

    // //Grupo 2
    // monster = new Virus(this, 50, -250, 5, this.enemies, 6, 2);
    // monster = new Virus(this, 100, -250, 5, this.enemies, 6, 2);
    // monster = new Virus(this, 300, -250, 5, this.enemies, 6, 2);
    // monster = new Virus(this, 350, -250, 5, this.enemies, 6, 2);

    // monster = new Virus(this, 50, -200, 6, this.enemies, 6, 2);
    // monster = new Virus(this, 100, -200, 6, this.enemies, 6, 2);
    // monster = new Virus(this, 300, -200, 6, this.enemies, 6, 2);
    // monster = new Virus(this, 350, -200, 6, this.enemies, 6, 2);

    // //Grupo 3

    // monster = new Virus(this, 100, -450, 5, this.enemies, 6, 3);
    // monster = new Virus(this, 150, -450, 5, this.enemies, 6, 3);
    // monster = new Virus(this, 300, -450, 5, this.enemies, 6, 3);
    // monster = new Virus(this, 350, -450, 5, this.enemies, 6, 3);

    // monster = new Virus(this, 150, -400, 6, this.enemies, 6, 3);

    //Grupo 4

    // monster = new Virus(this, 150, -550, 6, this.enemies, 6, 4);
    // monster = new Virus(this, 200, -550, 6, this.enemies, 6, 4);
    // monster = new Virus(this, 250, -550, 6, this.enemies, 6, 4);
  }

  createHumans() {
    //Grupo 1

    let human = new Human(this, 150, -100, 5, this.enemies, 6, 1);
    // human = new Human(this, 200, -100, 5, this.enemies, 6, 1);
    // human = new Human(this, 150, -50, 5, this.enemies, 6, 1);
    // human = new Human(this, 200, -50, 5, this.enemies, 6, 1);

    // //Grupo 2

    // human = new Human(this, 150, -250, 6, this.enemies, 6, 2);
    // human = new Human(this, 200, -250, 6, this.enemies, 6, 2);
    // human = new Human(this, 250, -250, 6, this.enemies, 6, 2);

    // human = new Human(this, 150, -200, 6, this.enemies, 6, 2);
    // human = new Human(this, 200, -200, 6, this.enemies, 6, 2);
    // human = new Human(this, 250, -200, 6, this.enemies, 6, 2);

    // //Grupo 3

    // human = new Human(this, 50, -450, 5, this.enemies, 6, 3);
    // human = new Human(this, 200, -450, 5, this.enemies, 6, 3);
    // human = new Human(this, 250, -450, 5, this.enemies, 6, 3);
    // human = new Human(this, 400, -450, 5, this.enemies, 6, 3);

    // human = new Human(this, 150, -400, 6, this.enemies, 6, 3);
    // human = new Human(this, 200, -400, 6, this.enemies, 6, 3);

    // human = new Human(this, 150, -350, 5, this.enemies, 6, 3);
    // human = new Human(this, 200, -350, 5, this.enemies, 6, 3);

    // //Grupo 4

    // human = new Human(this, 50, -600, 6, this.enemies, 6, 4);
    // human = new Human(this, 100, -600, 6, this.enemies, 6, 4);
    // human = new Human(this, 150, -600, 6, this.enemies, 6, 4);
    // human = new Human(this, 200, -600, 6, this.enemies, 6, 4);
    // human = new Human(this, 250, -600, 6, this.enemies, 6, 4);
    // human = new Human(this, 300, -600, 6, this.enemies, 6, 4);
    // human = new Human(this, 350, -600, 6, this.enemies, 6, 4);

    // human = new Human(this, 100, -550, 6, this.enemies, 6, 4);
    // human = new Human(this, 300, -550, 6, this.enemies, 6, 4);
  }

  addSounds() {
    super.addSounds();
    this.levelSong = this.sound.add("level1", Sound.level);
    this.bossSong = this.sound.add("final_boss_song", Sound.finalBossSound);
    this.enderSong = this.sound.add("ender_song", Sound.enderSound);
  }

  setTutorialContainerVisibility(visibility) {
    this.container.setVisible(visibility);
    this.ok.setVisible(visibility);
    this.text.setVisible(visibility);
  }

  update() {
    let destroy = false;

    if (this.alive_monsters <= 0 && !this.bossInScene) {
      this.startBossBattle();
    } else if (this.bossInScene && this.boss.life <= 0 && !this.enderInScene) {
      this.boss.life = 200;
      this.bossTranformation = false;
      this.boss.setTexture("ender");
      this.boss.image = "ender";
      this.boss.damage_image = "ender";
      this.boss.death_image = "ender_death";
      this.enderInScene = true;
      this.bossSong.stop();
      this.bossSong = this.enderSong;
      this.bossSong.play();
    } else if (this.bossInScene && this.boss.life <= 0 && this.enderInScene) {
      let victory = this.add
        .image(this.globalWidth / 2, this.globalHeight / 2, "level_victory")
        .setDepth(1);
      victory.setInteractive({
        cursor: "url(assets/cursors/selector.cur), pointer",
      });
      victory.on("pointerup", () => {
        this.inventory.money += this.reward;
        this.scene.start("details", [
          "win",
          this.level,
          this.inventory,
          this.virus_killed,
          this.humans_healed,
          this.reward,
        ]);
        this.bossSong.stop();
      });
    }

    this.enemies.getChildren().forEach((enemy) => {
      if (enemy.y >= this.globalHeight) {
        this.player.setVisible(false);
        let lose = this.add
          .image(this.globalWidth / 2, this.globalHeight / 2, "level_lose")
          .setDepth(1);
        lose.setInteractive({
          cursor: "url(assets/cursors/selector.cur), pointer",
        });
        lose.on("pointerup", () => {
          this.scene.start("map", ["lose", this.level, this.inventory]);
          this.levelSong.stop();
        });
        destroy = true;
      }
    });

    if (destroy) this.destroy_enemies();
  }
}

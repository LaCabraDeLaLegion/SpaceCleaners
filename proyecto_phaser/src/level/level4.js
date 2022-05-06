import Level from "./level.js";
import Virus from "../enemies/virus.js";
import Human from "../enemies/human.js";
import virus_data from "../data/virus_data.js";
import humans_data from "../data/humans_data.js";
import Sound from "../data/sounds.js";
import AttackFactory from "../attacks/factory/attack_factory.js";
import Attack from "../attacks/factory/attacks_enum.js";
import LitteEye from "../bosses/litteEye.js";

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
    this.eyeFrecuencie = 500;
    this.littleEyeLeft = null;
    this.littleEyeRight = null;
  }

  create() {
    super.create();
    this.add
      .image(this.globalWidth / 2, this.globalHeight / 2, "level4_background")
      .setDepth(-1)
      .setScale(1.7);
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
    this.bossSong = this.sound.add("boss4_song", Sound.bossSound4);
  }

  update() {
    let destroy = false; // to delete?

    if (this.alive_monsters <= 0 && !this.bossInScene) {
      this.startBossBattle();

      this.littleEyes = this.physics.add.group();

      this.littleEyeLeft = new LitteEye(
        this,
        30,
        450,
        "eye_virus_1",
        this.littleEyes
      );
      this.littleEyeRight = new LitteEye(
        this,
        730,
        450,
        "eye_virus_2",
        this.littleEyes
      );
      this.littleEyeLeftDown = new LitteEye(
        this,
        30,
        650,
        "eye_virus_1",
        this.littleEyes
      );
      this.littleEyeRightDown = new LitteEye(
        this,
        730,
        650,
        "eye_virus_2",
        this.littleEyes
      );
      this.littleEyeLeftUp = new LitteEye(
        this,
        30,
        250,
        "eye_virus_1",
        this.littleEyes
      );
      this.littleEyeRightUp = new LitteEye(
        this,
        730,
        250,
        "eye_virus_2",
        this.littleEyes
      );

      this.physics.add.collider(
        this.littleEyes,
        this.lasers,
        this.onHitLittleEye,
        null,
        this
      );
    } else if (this.bossInScene && this.boss.life <= 0) {
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
        this.levelSong.stop();
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

  onHitLittleEye(litteEye, laser) {
    laser.destroy();
    this.impactSound.play();
    litteEye.recieveDamage(1); //CAMBIAR POR EL DAÑO DEL LASER
    if (litteEye.life > 0) {
      //this.littleEyeLeftDown.setTexture(this.littleEyeLeftDown.damage_image);
      //this.time.delayedCall(100, () => {
      //this.littleEyeLeftDown.setTexture(this.littleEyeLeftDown.image);
      //});
    } else {
      //this.littleEyeLeftDown.setTexture(this.littleEyeLeftDown.death_image);
      this.time.delayedCall(100, () => {
        litteEye.destroy();
      });
    }
  }
}

import Player from "./player.js";
import Laser from "./laser.js";
import Enemy from "./enemy.js";

export default class Level extends Phaser.Scene {
  constructor() {
    super({ key: "level" });
  }

  preload() {
    this.load.setPath("assets/");

    //Images
    this.load.image("player", "/sprites/ship.png");
    this.load.image("laser", "/sprites/laser.png");
    this.load.image("V1", "/sprites/V1.png");
    this.load.image("H1", "/sprites/H1.png");
    this.load.image("level_victory", "/sprites/level_victory.png");

    //Audio
    this.load.audio("blaster", "/sounds/blaster.mp3");
    this.load.audio("explosion", "/sounds/explosion.mp3");
    this.load.audio("level", "/sounds/level1_song.mp3");
  }

  create() {
    this.input.setDefaultCursor("url(assets/sprites/cursor.cur), pointer");

    this.alive_monsters = 0;
    this.levelSong = this.sound.add("level", {
      mute: false,
      volume: 2,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    });

    this.initPlayer();
    this.initEnemies();

    this.levelSong.play();
  }

  update(){

    if (this.alive_monsters <= 0){
      let victory = this.add.image(450, 250, "level_victory").setDepth(1);
      victory.setInteractive();
      victory.on("pointerup", () => {
        this.scene.start("map", "win")
      });
    }
  }

  initPlayer() {
    this.player = new Player(this, 500, 500);
    this.player.setScale(2);

    this.lasers = this.physics.add.group();
    this.laserSound = this.sound.add("blaster", {
      mute: false,
      volume: 0.5,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    });
  }

  initEnemies() {
    this.enemies = this.physics.add.group();
    this.physics.add.collider(
      this.enemies,
      this.lasers,
      this.onHit,
      null,
      this
    );
    this.impactSound = this.sound.add("explosion", {
      mute: false,
      volume: 0.2,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    });

    this.virus = this.add.group();
    this.createEnemies();
  }

  addLaser() {
    this.laser = new Laser(
      this,
      this.player.x,
      this.player.y - 50,
      this.lasers
    );
    this.laser.setScale(0.25);
    this.laserSound.play();
  }

  onHit(enemy, laser) {
    laser.destroy();

    if (enemy.type === "monster") {
      this.impactSound.play();
      enemy.damage();
      console.log("monstruos vivos: " + this.alive_monsters);
      if (enemy.lives == 0){
        this.alive_monsters--;
      }
    } else {
      enemy.mutate();
    }
  }

  createEnemies() {
    this.createMonsters();
    this.createHumans();
  }

  createMonsters() {
    for (let x = 100; x < 200; x = x + 40) {
      for (let y = 50; y < 150; y = y + 50) {
        let monster = new Enemy(this, x, y, "monster", 1, this.enemies);
        monster.setScale(3);
        this.virus.add(this.add.sprite(monster));
        this.alive_monsters = this.alive_monsters + 1;
        this.tweens.timeline({
          targets: monster,
          ease: "Linear",
          duration: 2000,
          tweens: monster.getMovements(),
        });
      }
    }
  }

  createHumans() {
    let human = new Enemy(this, 200, 150, "human", 1, this.enemies);
    this.virus.add(this.add.sprite(human));
    this.alive_monsters = this.alive_monsters + 1;
    this.tweens.timeline({
      targets: human,
      ease: "Linear",
      duration: 2000,
      tweens: human.getMovements(),
    });

    for (let x = 200; x < 200; x = x + 40) {
      for (let y = 50; y < 150; y = y + 50) {}
    }

    console.log("Bichos vivos iniciales: " + this.alive_monsters);
  }
}

import Anim_Factory from "./level/anim_factory.js";


export default class Loader extends Phaser.Scene {
    constructor() {
      super({ key: "Loader" });
    }
  
    preload() {
      let progressBar = this.add.graphics();
      let progressBox = this.add.graphics();
      const gameHeight = this.cameras.main.height
      const gameWidth = this.cameras.main.width;
      progressBox.fillStyle(0x222222, 0.8);
      progressBox.fillRect(gameWidth / 2 - 150, gameHeight / 2 - 100, 320, 50);

      this.make.text({
        x: gameWidth / 2 - 45,
        y: gameHeight / 2 - 120,
        text: 'Loading...',
        style: {
            fontFamily: "MinimalPixel",
            fontSize: '25px'
        }
      });

      this.load.on('progress', function (value) {
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(gameWidth / 2 - 140, gameHeight / 2 - 90, 300 * value, 30);
      });

      this.load.setPath("assets");
      this.load_images();
      this.load_spritesheets();
      this.load_audio();
    }

    create() {
      this.createAnimations();
      this.scene.start("introduction");
    }

    load_spritesheets() {
        //Explosions
        this.load.spritesheet("explosion", "/sprites/consumibles/explosion.png", {
          frameWidth: 50,
          frameHeight: 50,
        });
        this.load.spritesheet("plasmaa", "/sprites/plasma.png", {
            frameWidth: 20,
            frameHeight: 45,
          });
        Anim_Factory.player_spritesheets(this);
        Anim_Factory.virus_spritesheets(this);
        Anim_Factory.humans_spritesheets(this);
      }
    
      load_images() {
        this.load.image("player", "/sprites/ship.png");
        this.load.image("player_damage", "/sprites/ship_damage.png");
        this.load.image("boss", "/sprites/Boss/B1.png");
        this.load.image("boss_damage", "/sprites/Boss/B1_damage.png");
        this.load.image("slash", "/sprites/slash.png");
        this.load.image("super_slash", "/sprites/super_slash.png");
        this.load.image("level_victory", "/sprites/level_victory.png");
        this.load.image("level_lose", "you_lose.png");
    
        //Medicinas
        this.load.image("mask", "/sprites/Medicinas/mascarilla.png");
        this.load.image("tablet", "/sprites/Medicinas/tablet.png");
        this.load.image("gel", "/sprites/Medicinas/water_drop.png");
    
        //Armas
        this.load.image("laser", "/sprites/Armas/laser.png");
        this.load.image("super_laser", "/sprites/Armas/super_laser.png")
        this.load.image("fire", "/sprites/Armas/fire.png");
        this.load.image("bullet", "/sprites/Armas/bullet.png");
    
        //Consumibles
        this.load.image("basic_bomb", "/sprites/consumibles/basic_bomb.png");
        this.load.image("basic_shield", "/sprites/consumibles/shield.png");
        this.load.image("basic_kit", "/sprites/consumibles/first_aid.png");
    
        //Bosses
        this.load.image("B1", "/sprites/Boss/B1.png");
        this.load.image("B2", "/sprites/Boss/B2.png");
        this.load.image("B3", "/sprites/Boss/B3.png");
        this.load.image("B4", "/sprites/Boss/B4.png");
        this.load.image("B5", "/sprites/Boss/B5.png");
        this.load.image("B6", "/sprites/Boss/B6.png");
        this.load.image("B7", "/sprites/Boss/B7.png");
        this.load.image("B1_damage", "/sprites/Boss/B1_damage.png");
        this.load.image("B2_damage", "/sprites/Boss/B2_damage.png");
        this.load.image("B3_damage", "/sprites/Boss/B3_damage.png");
        this.load.image("B4_damage", "/sprites/Boss/B4_damage.png");
        this.load.image("B5_damage", "/sprites/Boss/B5_damage.png");
        this.load.image("B6_damage", "/sprites/Boss/B6_damage.png");
        this.load.image("B7_damage", "/sprites/Boss/B7_damage.png");
        this.load.image("B1_death", "/sprites/Boss/B1_death.png");
        this.load.image("B2_death", "/sprites/Boss/B2_death.png");
        this.load.image("B3_death", "/sprites/Boss/B3_death.png");
        this.load.image("B4_death", "/sprites/Boss/B4_death.png");
        this.load.image("B5_death", "/sprites/Boss/B5_death.png");
        this.load.image("B6_death", "/sprites/Boss/B6_death.png");
        this.load.image("B7_death", "/sprites/Boss/B7_death.png");
      }
    
      load_audio() {
        this.load.audio("blaster", "/sounds/blaster.mp3");
        this.load.audio("explosion", "/sounds/explosion.mp3");
        this.load.audio("damage", "/sounds/damage.mp3");
        this.load.audio("game_over", "/sounds/game_over.wav");
        this.load.audio("level1", "/sounds/level1_song.mp3");
        this.load.audio("level2", "/sounds/level2_song.mp3");
      }

      createAnimations() {
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 5,
        });  
        this.anims.create({
            key: "plasma_anim",
            frames: this.anims.generateFrameNumbers("plasmaa"),
            frameRate: 5,
            repeat: -1,
        }); 
        Anim_Factory.player_anims(this);
        Anim_Factory.virus_anims(this);
        Anim_Factory.humans_anims(this);
      }

}
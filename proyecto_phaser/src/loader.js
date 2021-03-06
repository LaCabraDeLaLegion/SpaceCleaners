import Anim_Factory from "./level/anim_factory.js";

export default class Loader extends Phaser.Scene {
  constructor() {
    super({ key: "Loader" });
  }

  preload() {
    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    const gameHeight = this.cameras.main.height;
    const gameWidth = this.cameras.main.width;
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(gameWidth / 2 - 150, gameHeight / 2 - 100, 320, 50);

    this.make.text({
      x: gameWidth / 2 - 45,
      y: gameHeight / 2 - 120,
      text: "Loading...",
      style: {
        fontFamily: "MinimalPixel",
        fontSize: "25px",
      },
    });

    this.load.on("progress", function (value) {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(
        gameWidth / 2 - 140,
        gameHeight / 2 - 90,
        300 * value,
        30
      );
    });

    this.load.setPath("assets");
    this.load_images();
    this.load_spritesheets();
    this.load_audio();
  }

  create() {
    this.input.setDefaultCursor("url(assets/cursors/pointer.cur), pointer");
    this.createAnimations();
    this.scene.start("introduction");
  }

  load_spritesheets() {
    //Explosions
    this.load.spritesheet("explosion", "/sprites/consumibles/explosion.png", {
      frameWidth: 50,
      frameHeight: 50,
    });
    this.load.spritesheet("mutation", "/sprites/mutation.png", {
      frameWidth: 100,
      frameHeight: 100,
    });

    //Proyectiles
    this.load.spritesheet("plasma", "/sprites/plasma.png", {
      frameWidth: 20,
      frameHeight: 45,
    });

    Anim_Factory.player_spritesheets(this);
    Anim_Factory.virus_spritesheets(this);
    Anim_Factory.humans_spritesheets(this);
  }

  load_images() {
    //this.load.image("player", "/sprites/ship.png");
    //this.load.image("player_damage", "/sprites/ship_damage.png");
    this.load.image("boss", "/sprites/Boss/B1.png");
    this.load.image("boss_damage", "/sprites/Boss/B1_damage.png");
    this.load.image("slash", "/sprites/slash.png");
    this.load.image("fireball", "/sprites/fireball.png");
    this.load.image("rock", "/sprites/rock.png");
    this.load.image("poison_beam", "/sprites/poison_beam.png");
    this.load.image("spiderweb", "/sprites/spiderweb.png");
    this.load.image("thunder", "/sprites/thunder.png");
    this.load.image("super_slash", "/sprites/super_slash.png");
    this.load.image("poison_arrow", "/sprites/poison_arrow.png");
    this.load.image("fire", "/sprites/fire.png");
    this.load.image("blue_fire", "/sprites/blue_fire.png");
    this.load.image("holy_fire", "/sprites/holy_fire.png");
    this.load.image("eye_laser", "/sprites/eye_laser_2.png");
    this.load.image("eye_virus_1", "/sprites/Virus/eye_virus_1.png");
    this.load.image("eye_virus_2", "/sprites/Virus/eye_virus_2.png");
    this.load.image("eye_virus_attack", "/sprites/eye_virus_attack.png");
    this.load.image("level_victory", "/sprites/level_victory.png");
    this.load.image("portal", "/sprites/portal.png");
    this.load.image("level_lose", "you_lose.png");
    //this.load.image("continue", "/sprites/continue.png");

    // Level UI
    this.load.image("livesUI", "/sprites/UI/lives.png");
    this.load.image("potionsUI", "/sprites/UI/potions.png");
    this.load.image("bombsUI", "/sprites/UI/bombs.png");
    this.load.image("shieldsUI", "/sprites/UI/shields.png");
    this.load.image("level1_background", "/sprites/UI/level1_background.png");
    this.load.image("level2_background", "/sprites/UI/level2_background.png");
    this.load.image("level3_background", "/sprites/UI/level3_background.png");
    this.load.image("level4_background", "/sprites/UI/level4_background.png");
    this.load.image("level5_background", "/sprites/UI/level5_background.png");
    this.load.image("level6_background", "/sprites/UI/level6_background.png");
    this.load.image("level7_background", "/sprites/UI/level7_background.png");

    //Tienda
    this.load.image("background_shop", "/sprites/Shop/background_shop.png");
    this.load.image("close", "/sprites/Shop/shop_close.png");
    this.load.image("category", "/sprites/Shop/category.png");
    this.load.image("category_selected", "/sprites/Shop/category_selected.png");
    this.load.image("up", "/sprites/Shop/shop_up.png");
    this.load.image("down", "/sprites/Shop/shop_down.png");
    this.load.image("up_disabled", "/sprites/Shop/shop_up_disabled.png");
    this.load.image("down_disabled", "/sprites//Shop/shop_down_disabled.png");
    this.load.image("item", "/sprites/Shop/shop_item.png");
    this.load.image("item_equiped", "/sprites/Shop/shop_item_equiped.png");
    this.load.image("buy", "/sprites/Shop/shop_buy.png");
    this.load.image("sold", "/sprites/Shop/shop_sold.png");
    this.load.image("cash", "/sprites/Shop/cash.png");
    this.load.image("buy_btn_hover", "/sprites/Shop/buy_btn_hover.png");
    this.load.image("select_btn_hover", "/sprites/Shop/buy_btn_hover.png");

    this.load.image("coin", "/sprites/coin.png");

    //Medicinas
    this.load.image("mask", "/sprites/Medicinas/mascarilla.png");
    this.load.image("tablet", "/sprites/Medicinas/tablet.png");
    this.load.image("gel", "/sprites/Medicinas/water_drop.png");

    //Armas
    this.load.image("laser1", "/sprites/Weapons/laser1.png");
    this.load.image("laser2", "/sprites/Weapons/laser2.png");
    //this.load.image("super_laser", "/sprites/Armas/super_laser.png");
    this.load.image("fire", "/sprites/Armas/fire.png");
    //this.load.image("bullet", "/sprites/Armas/bullet.png");
    this.load.image("basic_laser", "/sprites/Weapons/basic_laser.png");
    this.load.image("double_laser", "/sprites/Weapons/double_laser.png");
    this.load.image("enhanced_laser", "/sprites/Weapons/enhanced_laser.png");

    //Consumibles
    this.load.image("basic_bomb", "/sprites/consumibles/basic_bomb.png");
    this.load.image("basic_shield", "/sprites/consumibles/shield.png");
    this.load.image("basic_kit", "/sprites/consumibles/first_aid.png");
    this.load.image("basic_potion", "/sprites/Potions/basic_potion.png");
    this.load.image("advanced_potion", "/sprites/Potions/advanced_potion.png");
    this.load.image("holy_potion", "/sprites/Potions/holy_potion.png");

    //Skins
    this.load.image("skin1", "/sprites/Players/skin1.png");
    this.load.image("skin2", "/sprites/Players/skin2.png");
    this.load.image("skin3", "/sprites/Players/skin3.png");

    //Bosses
    this.load.image("B1", "/sprites/Boss/B1.png");
    this.load.image("B2", "/sprites/Boss/B2.png");
    this.load.image("B3", "/sprites/Boss/B3.png");
    this.load.image("B4_1", "/sprites/Boss/B4_1.png");
    this.load.image("B4_2", "/sprites/Boss/B4_2.png");
    this.load.image("B5", "/sprites/Boss/B5.png");
    this.load.image("B6", "/sprites/Boss/B6.png");
    this.load.image("FB", "/sprites/Boss/FB.png");
    this.load.image("B1_damage", "/sprites/Boss/B1_damage.png");
    this.load.image("B2_damage", "/sprites/Boss/B2_damage.png");
    this.load.image("B3_damage", "/sprites/Boss/B3_damage.png");
    this.load.image("B4_damage", "/sprites/Boss/B4_damage.png");
    //this.load.image("B4_damage", "/sprites/Boss/B4_damage.png");
    this.load.image("B5_damage", "/sprites/Boss/B5_damage.png");
    this.load.image("B6_damage", "/sprites/Boss/B6_damage.png");
    this.load.image("B7_damage", "/sprites/Boss/B7_damage.png");
    this.load.image("B1_death", "/sprites/Boss/B1_death.png");
    this.load.image("B2_death", "/sprites/Boss/B2_death.png");
    this.load.image("B3_death", "/sprites/Boss/B3_death.png");
    //this.load.image("B4_death", "/sprites/Boss/B4_death.png");
    this.load.image("B5_death", "/sprites/Boss/B5_death.png");
    this.load.image("B6_death", "/sprites/Boss/B6_death.png");
    this.load.image("FB_death", "/sprites/Boss/FB_death.png");
    this.load.image("ender", "/sprites/Boss/ender.png");
  }

  load_audio() {
    this.load.audio("blaster", "/sounds/blaster.mp3");
    this.load.audio("explosion", "/sounds/explosion.mp3");
    this.load.audio("damage", "/sounds/damage.mp3");
    this.load.audio("drink_potion", "/sounds/drink_potion.wav");
    this.load.audio("game_over", "/sounds/game_over.wav");
    this.load.audio("level1", "/sounds/level1_song.mp3");
    this.load.audio("level2", "/sounds/level2_song.mp3");
    this.load.audio("level3", "/sounds/level3_song.wav");
    this.load.audio("boss1_song", "/sounds/boss1_song.wav");
    this.load.audio("boss2_song", "/sounds/boss2_song.wav");
    this.load.audio("boss3_song", "/sounds/boss3_song.mp3");
    this.load.audio("boss4_song", "/sounds/boss4_song.wav");
    this.load.audio("final_boss_song", "/sounds/final_boss.mp3");
    this.load.audio("ender_song", "/sounds/ender_song.wav");
    this.load.audio("error_sound", "/sounds/error.mp3");
  }

  createAnimations() {
    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 5,
    });
    this.anims.create({
      key: "plasma_anim",
      frames: this.anims.generateFrameNumbers("plasma"),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "mutation_anim",
      frames: this.anims.generateFrameNumbers("mutation"),
      frameRate: 8,
      repeat: 1,
    });
    Anim_Factory.player_anims(this);
    Anim_Factory.virus_anims(this);
    Anim_Factory.humans_anims(this);
  }
}

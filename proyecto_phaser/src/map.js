import Attack from "./attacks/factory/attacks_enum.js";
import Sound from "./data/sounds.js";
import InitialInventory from "./data/init_inventory.js";

let planet_owners = [
  "humanos",
  "virus",
  "virus",
  "virus",
  "virus",
  "virus",
  "virus",
  "virus",
];

let planets_state = [
  "unlocked",
  "locked",
  "locked",
  "locked",
  "locked",
  "locked",
  "locked",
  "unlocked",
];

let planet_counter = 1;

export default class Map extends Phaser.Scene {
  constructor() {
    super({ key: "map" });
    this.probability = 20;
    //10 turns where the enemies do not get planets back
    this.truce = 10;
  }

  init(data) {
    // console.log("init data = " + data);

    this.globalWidth = this.cameras.main.width;
    this.globalHeight = this.cameras.main.height;

    this.truce--;

    if (data[0] === "win") {
      planet_owners[data[1]] = "humanos";
      planet_counter++;
      if (data[1] < 7) {
        if (planets_state[data[1] + 1] == "locked") {
          //Desbloquear cosas en la tienda e inventario
        }
        planets_state[data[1] + 1] = "unlocked";
      }
    }

    let random = Phaser.Math.Between(0, 100);
    if (random <= this.probability && this.truce < 0) {
      let found = false;
      let index = 7;
      while (found === false) {
        if (planet_owners[index] === "humanos") {
          found = true;
          planet_owners[index] = "virus";
        }
        index--;
      }
      planet_counter--;
    }

    if (!data[2]) this.inventory = InitialInventory;
    else this.inventory = data[2];
  }

  preload() {
    this.load.setPath("assets/sprites/Map/");
    this.load.image("background_map", "background_map.png");

    //Audio
    this.load.audio("button", "../../sounds/button.ogg");
    this.load.image("play", "../../sounds/play.png");
    this.load.audio("button", "../../sounds/button.ogg");
    this.load.audio("buySound", "../../sounds/buy.wav");

    //Shop
    this.load.image("shop_btn", "../logo_shop.png");

    //Inventory
    this.load.image("inventory_btn", "../logo_inventory.png");

    //Lock
    this.load.image("lock", "lock.png");

    //Virus
    this.load.spritesheet("planet_1_virus", "planet_1_virus.png", {
      frameWidth: 50,
      frameHeight: 50,
    });
    this.load.spritesheet("planet_2_virus", "planet_2_virus.png", {
      frameWidth: 50,
      frameHeight: 50,
    });
    this.load.spritesheet("planet_3_virus", "planet_3_virus.png", {
      frameWidth: 75,
      frameHeight: 75,
    });
    this.load.spritesheet("planet_4_virus", "planet_4_virus.png", {
      frameWidth: 50,
      frameHeight: 50,
    });
    this.load.spritesheet("planet_5_virus", "planet_5_virus.png", {
      frameWidth: 50,
      frameHeight: 50,
    });
    this.load.spritesheet("earth", "earth.png", {
      frameWidth: 50,
      frameHeight: 50,
    });
    this.load.spritesheet("planet_6_virus", "planet_6_virus.png", {
      frameWidth: 50,
      frameHeight: 50,
    });
    this.load.spritesheet("planet_7_virus", "planet_7_virus.png", {
      frameWidth: 100,
      frameHeight: 100,
    });

    //Player
    this.load.spritesheet("planet_1_player", "planet_1_humans.png", {
      frameWidth: 50,
      frameHeight: 50,
    });
    this.load.spritesheet("planet_2_player", "planet_2_humans.png", {
      frameWidth: 50,
      frameHeight: 50,
    });
    this.load.spritesheet("planet_3_player", "planet_3_humans.png", {
      frameWidth: 75,
      frameHeight: 75,
    });
    this.load.spritesheet("planet_4_player", "planet_4_humans.png", {
      frameWidth: 50,
      frameHeight: 50,
    });
    this.load.spritesheet("planet_5_player", "planet_5_humans.png", {
      frameWidth: 50,
      frameHeight: 50,
    });
    this.load.spritesheet("earth", "earth.png", {
      frameWidth: 50,
      frameHeight: 50,
    });
    this.load.spritesheet("planet_6_player", "planet_6_humans.png", {
      frameWidth: 50,
      frameHeight: 50,
    });
    this.load.spritesheet("planet_7_player", "planet_7_humans.png", {
      frameWidth: 100,
      frameHeight: 100,
    });
  }

  create() {
    //Sounds
    this.buttonSound = this.sound.add("button");
    this.playSound = this.sound.add("playSound", Sound.playSound);

    //Shop
    let shopButton = this.add
      .image((this.globalWidth / 10) * 8, this.globalHeight / 9, "shop_btn")
      .setDepth(2)
      .setScale(0.3);
    shopButton.setInteractive({
      cursor: "url(assets/cursors/selector.cur), pointer",
    });
    shopButton.on("pointerover", () => {
      shopButton.setScale(0.4);
      this.buttonSound.play();
    });
    shopButton.on("pointerout", () => {
      shopButton.setScale(0.3);
    });
    shopButton.on("pointerup", () => {
      this.playSound.play();
      this.time.delayedCall(0, () => {
        // this.introSong.pause();
        this.scene.start("shop", this.inventory);
      });
    });

    //Inventory
    let inventoryButton = this.add
      .image(
        (this.globalWidth / 10) * 8,
        this.globalHeight / 5,
        "inventory_btn"
      )
      .setDepth(2)
      .setScale(0.3);
    inventoryButton.setInteractive({
      cursor: "url(assets/cursors/selector.cur), pointer",
    });
    inventoryButton.on("pointerover", () => {
      inventoryButton.setScale(0.4);
      this.buttonSound.play();
    });
    inventoryButton.on("pointerout", () => {
      inventoryButton.setScale(0.3);
    });
    inventoryButton.on("pointerup", () => {
      this.playSound.play();
      this.time.delayedCall(0, () => {
        // this.introSong.pause();
        this.scene.start("inventory", this.inventory);
      });
    });

    if (planet_counter >= 8) {
      this.scene.start("win");
    } else if (planet_counter < 1) {
      this.scene.start("gameover");
    }

    this.planetSound = this.sound.add("button");

    this.add
      .image(this.globalWidth / 2, this.globalHeight / 2, "background_map")
      .setDepth(1)
      .setScale(2.5);

    if (planet_owners[1] === "virus") {
      this.planet_1 = this.physics.add.sprite(
        this.globalWidth / 3,
        (this.globalHeight / 9) * 2,
        "planet_1_virus"
      );
      this.planet_1.setDepth(2);
    } else {
      this.planet_1 = this.physics.add.sprite(
        this.globalWidth / 3,
        (this.globalHeight / 9) * 2,
        "planet_1_player"
      );
      this.planet_1.setDepth(2);
    }

    if (planet_owners[2] === "virus") {
      this.planet_2 = this.physics.add.sprite(
        this.globalWidth / 2,
        (this.globalHeight / 9) * 3,
        "planet_2_virus"
      );
      this.planet_2.setDepth(2);
    } else {
      this.planet_2 = this.physics.add.sprite(
        this.globalWidth / 2,
        (this.globalHeight / 9) * 3,
        "planet_2_player"
      );
      this.planet_2.setDepth(2);
    }

    if (planet_owners[3] === "virus") {
      this.planet_3 = this.physics.add.sprite(
        this.globalWidth / 5,
        (this.globalHeight / 9) * 4,
        "planet_3_virus"
      );
      this.planet_3.setDepth(2);
    } else {
      this.planet_3 = this.physics.add.sprite(
        this.globalWidth / 5,
        (this.globalHeight / 9) * 4,
        "planet_3_player"
      );
      this.planet_3.setDepth(2);
    }

    if (planet_owners[4] === "virus") {
      this.planet_4 = this.physics.add.sprite(
        this.globalWidth / 2,
        (this.globalHeight / 9) * 5,
        "planet_4_virus"
      );
      this.planet_4.setDepth(2);
    } else {
      this.planet_4 = this.physics.add.sprite(
        this.globalWidth / 2,
        (this.globalHeight / 9) * 5,
        "planet_4_player"
      );
      this.planet_4.setDepth(2);
    }

    if (planet_owners[5] === "virus") {
      this.planet_5 = this.physics.add.sprite(
        (this.globalWidth / 5) * 4,
        (this.globalHeight / 9) * 6,
        "planet_5_virus"
      );
      this.planet_5.setDepth(2);
    } else {
      this.planet_5 = this.physics.add.sprite(
        (this.globalWidth / 5) * 4,
        (this.globalHeight / 9) * 6,
        "planet_5_player"
      );
      this.planet_5.setDepth(2);
    }

    if (planet_owners[6] === "virus") {
      this.planet_6 = this.physics.add.sprite(
        (this.globalWidth / 5) * 3,
        (this.globalHeight / 9) * 7,
        "planet_6_virus"
      );
      this.planet_6.setDepth(2);
    } else {
      this.planet_6 = this.physics.add.sprite(
        (this.globalWidth / 5) * 3,
        (this.globalHeight / 9) * 7,
        "planet_6_player"
      );
      this.planet_6.setDepth(2);
    }

    if (planet_owners[7] === "virus") {
      this.planet_7 = this.physics.add.sprite(
        this.globalWidth / 3,
        (this.globalHeight / 9) * 8,
        "planet_7_virus"
      );
      this.planet_7.setDepth(2).setScale(2);
    } else {
      this.planet_7 = this.physics.add.sprite(
        this.globalWidth / 3,
        (this.globalHeight / 9) * 8,
        "planet_7_player"
      );
      this.planet_7.setDepth(2).setScale(2);
    }

    this.earth = this.physics.add.sprite(
      this.globalWidth / 2,
      this.globalHeight / 9,
      "earth"
    );
    this.earth.setDepth(2);

    this.planet_1.setInteractive({
      cursor: "url(assets/cursors/selector.cur), pointer",
    });
    this.planet_1.on("pointerover", () => {
      this.planet_1.setScale(1.25);
      this.planetSound.play();
    });
    this.planet_1.on("pointerout", () => {
      this.planet_1.setScale(1);
    });
    this.planet_1.on("pointerup", () => {
      this.scene.start("level1", [this.inventory]);
    });

    if (planets_state[2] == "unlocked") {
      this.planet_2.setInteractive({
        cursor: "url(assets/cursors/selector.cur), pointer",
      });
      this.planet_2.on("pointerover", () => {
        this.planet_2.setScale(1.25);
        this.planetSound.play();
      });
      this.planet_2.on("pointerout", () => {
        this.planet_2.setScale(1);
      });
      this.planet_2.on("pointerup", () => {
        this.scene.start("level2", [this.inventory]);
      });
    } else {
      this.physics.add
        .sprite(this.planet_2.x, this.planet_2.y, "lock")
        .setDepth(5)
        .setScale(1.5);
    }

    if (planets_state[3] == "unlocked") {
      this.planet_3.setInteractive({
        cursor: "url(assets/cursors/selector.cur), pointer",
      });
      this.planet_3.on("pointerover", () => {
        this.planet_3.setScale(1.25);
        this.planetSound.play();
      });
      this.planet_3.on("pointerout", () => {
        this.planet_3.setScale(1);
      });
      this.planet_3.on("pointerup", () => {
        this.scene.start("level3", [this.inventory]);
      });
    } else {
      this.physics.add
        .sprite(this.planet_3.x, this.planet_3.y, "lock")
        .setDepth(5)
        .setScale(2);
    }

    if (planets_state[4] == "unlocked") {
      this.planet_4.setInteractive({
        cursor: "url(assets/cursors/selector.cur), pointer",
      });
      this.planet_4.on("pointerover", () => {
        this.planet_4.setScale(1.25);
        this.planetSound.play();
      });
      this.planet_4.on("pointerout", () => {
        this.planet_4.setScale(1);
      });
      this.planet_4.on("pointerup", () => {
        this.scene.start("level4", [this.inventory]);
      });
    } else {
      this.physics.add
        .sprite(this.planet_4.x, this.planet_4.y, "lock")
        .setDepth(5)
        .setScale(1.5);
    }

    if (planets_state[5] == "unlocked") {
      this.planet_5.setInteractive({
        cursor: "url(assets/cursors/selector.cur), pointer",
      });
      this.planet_5.on("pointerover", () => {
        this.planet_5.setScale(1.25);
        this.planetSound.play();
      });
      this.planet_5.on("pointerout", () => {
        this.planet_5.setScale(1);
      });
      this.planet_5.on("pointerup", () => {
        this.scene.start("level5", [this.inventory]);
      });
    } else {
      this.physics.add
        .sprite(this.planet_5.x, this.planet_5.y, "lock")
        .setDepth(5)
        .setScale(1.5);
    }

    if (planets_state[6] == "unlocked") {
      this.planet_6.setInteractive({
        cursor: "url(assets/cursors/selector.cur), pointer",
      });
      this.planet_6.on("pointerover", () => {
        this.planet_6.setScale(1.25);
        this.planetSound.play();
      });
      this.planet_6.on("pointerout", () => {
        this.planet_6.setScale(1);
      });
      this.planet_6.on("pointerup", () => {
        this.scene.start("level6", [this.inventory]);
      });
    } else {
      this.physics.add
        .sprite(this.planet_6.x, this.planet_6.y, "lock")
        .setDepth(5)
        .setScale(1.5);
    }

    if (planets_state[7] == "unlocked") {
      this.planet_7.setInteractive({
        cursor: "url(assets/cursors/selector.cur), pointer",
      });
      this.planet_7.on("pointerover", () => {
        this.planet_7.setScale(1.25);
        this.planetSound.play();
      });
      this.planet_7.on("pointerout", () => {
        this.planet_7.setScale(1);
      });
      this.planet_7.on("pointerup", () => {
        this.scene.start("level7", [this.inventory]);
      });
    } else {
      this.physics.add
        .sprite(this.planet_7.x, this.planet_7.y, "lock")
        .setDepth(5)
        .setScale(4);
    }
  }
}

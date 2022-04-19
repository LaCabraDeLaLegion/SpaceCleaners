import store from "./data/store.js";
import Sound from "./data/sounds.js";

export default class Inventory extends Phaser.Scene {
  constructor() {
    super({ key: "inventory" });

    this.categories = ["potions", "weapons", "shields", "skins"];

    this.currentInterface = [];
  }

  init(data) {
    this.inventory = data;
    this.globalWidth = this.cameras.main.width;
    this.globalHeight = this.cameras.main.height;
    this.fontStyle = {
      fontFamily: 'GameFont',
      fontSize: '20px',
    }
  }

  preload() {
    this.load.setPath("assets/");
    this.load_audio();
  }

  create() {
    this.add
      .image(0, 0, "background_shop")
      .setOrigin(0, 0)
      .setDepth(0)
      .setScale(10);

    this.createUI();
    this.createTopBar();

    this.buttonSound = this.sound.add("button");
    this.playSound = this.sound.add("playSound", Sound.playSound);
    this.buySound = this.sound.add("buySound", Sound.buySound);
  }

  load_audio() {
    this.load.audio("button", "../../sounds/button.ogg");
    this.load.audio("playSound", "../../sounds/play.wav");
    this.load.audio("buySound", "../sounds/buy.wav");
  }

  createTopBar() {
    let category1 = this.add
      .image(this.globalWidth / 11, this.globalHeight / 10, "category")
      .setOrigin(0, 0)
      .setDepth(1)
      .setScale(this.globalWidth / 1500);
    category1.setInteractive();
    category1.on("pointerover", () => {
      category1
        .setTexture("category_selected")
        .setScale(this.globalWidth / 1500);
      this.buttonSound.play();
    });
    category1.on("pointerout", () => {
      category1.setTexture("category").setScale(this.globalWidth / 1500);
    });
    category1.on("pointerup", () => {
      this.playSound.play();
      category1
        .setTexture("category_selected")
        .setScale(this.globalWidth / 1500);
      this.createCategory("potions", 1);
    });

    let category2 = this.add
      .image(
        this.globalWidth / 11 + (this.globalWidth / 11) * 2.27,
        this.globalHeight / 10,
        "category"
      )
      .setOrigin(0, 0)
      .setDepth(1)
      .setScale(this.globalWidth / 1500);
    category2.setInteractive();
    category2.on("pointerover", () => {
      category2
        .setTexture("category_selected")
        .setScale(this.globalWidth / 1500);
      this.buttonSound.play();
    });
    category2.on("pointerout", () => {
      category2.setTexture("category").setScale(this.globalWidth / 1500);
    });
    category2.on("pointerup", () => {
      this.playSound.play();
      category2
        .setTexture("category_selected")
        .setScale(this.globalWidth / 1500);
      this.createCategory("weapons", 1);
    });

    let category3 = this.add
      .image(
        this.globalWidth / 11 + (this.globalWidth / 11) * 4.54,
        this.globalHeight / 10,
        "category"
      )
      .setOrigin(0, 0)
      .setDepth(1)
      .setScale(this.globalWidth / 1500);
    category3.setInteractive();
    category3.on("pointerover", () => {
      category3
        .setTexture("category_selected")
        .setScale(this.globalWidth / 1500);
      this.buttonSound.play();
    });
    category3.on("pointerout", () => {
      category3.setTexture("category").setScale(this.globalWidth / 1500);
    });
    category3.on("pointerup", () => {
      this.playSound.play();
      category3
        .setTexture("category_selected")
        .setScale(this.globalWidth / 1500);
      this.createCategory("shields", 1);
    });

    let category4 = this.add
      .image(
        this.globalWidth / 11 + (this.globalWidth / 11) * 6.81,
        this.globalHeight / 10,
        "category"
      )
      .setOrigin(0, 0)
      .setDepth(1)
      .setScale(this.globalWidth / 1500);
    category4.setInteractive();
    category4.on("pointerover", () => {
      category4
        .setTexture("category_selected")
        .setScale(this.globalWidth / 1500);
      this.buttonSound.play();
    });
    category4.on("pointerout", () => {
      category4.setTexture("category").setScale(this.globalWidth / 1500);
    });
    category4.on("pointerup", () => {
      this.playSound.play();
      category4
        .setTexture("category_selected")
        .setScale(this.globalWidth / 1500);
      this.createCategory("Skins", 1);
    });

    this.add
      .text(
        (this.globalWidth / 10) * 1.5,
        (this.globalHeight / 10.5) * 1.125,
        "Pociones",
        this.fontStyle
      )
      .setDepth(2)
      .setScale(this.globalWidth / 600);
    this.add
      .text(
        (this.globalWidth / 10) * 3.4,
        (this.globalHeight / 10.5) * 1.125,
        "Armas",
        this.fontStyle
      )
      .setDepth(2)
      .setScale(this.globalWidth / 600);
    this.add
      .text(
        (this.globalWidth / 10) * 5.5,
        (this.globalHeight / 10.5) * 1.125,
        "Escudos",
        this.fontStyle
      )
      .setDepth(2)
      .setScale(this.globalWidth / 600);
    this.add
      .text(
        (this.globalWidth / 10) * 7.75,
        (this.globalHeight / 10.5) * 1.125,
        "Skins",
        this.fontStyle
      )
      .setDepth(2)
      .setScale(this.globalWidth / 600);

    this.createCategory("potions", 1);
  }

  createUI() {
    let close = this.add
      .image(this.globalWidth * 0.95, this.globalHeight * 0.04, "close")
      .setDepth(1)
      .setScale(this.globalWidth / 400);
    close.setInteractive();
    close.on("pointerover", () => {
      close.setScale(this.globalWidth / 300);
      this.buttonSound.play();
    });
    close.on("pointerout", () => {
      close.setScale(this.globalWidth / 400);
    });
    close.on("pointerup", () => {
      this.playSound.play();
      this.time.delayedCall(1000, () => {
        this.scene.start("map", [null, null, this.inventory]);
      });
    });

    this.add
      .image(5, 10, "cash")
      .setOrigin(0, 0)
      .setDepth(1)
      .setScale(this.globalWidth / 125);

    this.currentMoney = this.add
      .text(
        this.globalWidth *
          (0.25 - this.inventory.money.toString().length * 0.01),
        this.globalHeight * 0.035,
        this.inventory.money,
        this.fontStyle
      )
      .setDepth(2)
      .setScale(this.globalWidth / 600);
  }

  createItem(item, position, category) {
    let item_bar = null;
    if(item.equiped) {
      item_bar = this.add
      .image(
        this.globalWidth / 8,
        (this.globalHeight / 5) * (1 + position),
        "item_equiped"
      )
      .setOrigin(0, 0)
      .setDepth(1)
      .setScale(this.globalWidth / 130);
    } else {
      item_bar = this.add
      .image(
        this.globalWidth / 8,
        (this.globalHeight / 5) * (1 + position),
        "item"
      )
      .setOrigin(0, 0)
      .setDepth(1)
      .setScale(this.globalWidth / 130);
    }
    let item_img = this.add
      .image(
        (this.globalWidth / 8) * 1.3,
        (this.globalHeight / 5.1) * (1.15 + position * 1.02),
        item.img
      )
      .setOrigin(0, 0)
      .setDepth(2)
      .setScale(this.globalWidth / item.scale);
    let quantity = "";
    if (item.quantity) 
        quantity = " x " + item.quantity;
    let item_name = this.add
      .text(
        (this.globalWidth / 8) * 2.7,
        (this.globalHeight / 5.5) * (1.3 + position * 1.1),
        item.name + quantity,
        this.fontStyle
      )
      .setDepth(2)
      .setScale(this.globalWidth / 600);
    let item_desc = this.add
      .text(
        (this.globalWidth / 8) * 2.7,
        (this.globalHeight / 5.5) * (1.55 + position * 1.1),
        item.desc,
        this.fontStyle
      )
      .setDepth(2)
      .setScale(this.globalWidth / 750);
    if (!item.equiped) {
      let select_btn = this.add
      .image(
        (this.globalWidth / 8) * 5.5,
        (this.globalHeight / 5) * (1.23 + position),
        "buy"
      )
      .setOrigin(0, 0)
      .setDepth(2)
      .setScale(this.globalWidth / 280);
      select_btn.setInteractive();
      select_btn.on("pointerover", () => {
        select_btn.setTexture("select_btn_hover");
        this.buttonSound.play();
      });
      select_btn.on("pointerout", () => {
        select_btn.setTexture("buy");
      });
      select_btn.on("pointerup", () => {
        this.equipItem({ ...item, category });
      });
      let item_selection = this.add
      .text(
        (this.globalWidth / 8) * 5.75,
        (this.globalHeight / 5) * (1.25 + position),
        "Equipar",
        this.fontStyle
      )
      .setDepth(3)
      .setScale(this.globalWidth / 750);

      this.currentInterface.push( 
        select_btn,
        item_selection
      );
    }
    
    this.currentInterface.push(
      item_bar,
      item_img,
      item_name,
      item_desc,
    );
  }

  createCategory(category, page) {
    this.destroyCurrentInterface();

    let up = this.add
      .image(this.globalWidth * 0.945, this.globalHeight * 0.4, "up")
      .setDepth(1)
      .setScale(this.globalWidth / 400);
    if (page === 1) up.setTexture("up_disabled");
    else {
      up.setInteractive();
      up.on("pointerover", () => {
        up.setScale(this.globalWidth / 300);
        this.buttonSound.play();
      });
      up.on("pointerout", () => {
        up.setScale(this.globalWidth / 400);
      });
      up.on("pointerup", () => {
        this.playSound.play();
        this.createCategory(category, --page);
      });
    }

    let down = this.add
      .image(this.globalWidth * 0.945, this.globalHeight * 0.6, "down")
      .setDepth(1)
      .setScale(this.globalWidth / 400);
    if (page === this.inventory[category].length % 4)
      down.setTexture("down_disabled");
    else {
      down.setInteractive();
      down.on("pointerover", () => {
        down.setScale(this.globalWidth / 300);
        this.buttonSound.play();
      });
      down.on("pointerout", () => {
        down.setScale(this.globalWidth / 400);
      });
      down.on("pointerup", () => {
        this.playSound.play();
        this.createCategory(category, ++page);
      });
    }

    this.currentInterface.push(up, down);

    let position = 0;
    for (let item of this.inventory[category]) {
      console.log(item);
      this.createItem(item, position, category);
      position += 0.85;
    }
    
  }

  destroyCurrentInterface() {
    this.currentInterface.forEach((item) => item.destroy());
    this.currentInterface = [];
  }

  equipItem(item) {
    for (let items of this.inventory[item.category]) {
      items.equiped = false;
    }
    let inventory_item = this.inventory[item.category].find((i) => i.name === item.name);
    inventory_item.equiped = true;
    this.createCategory(item.category, item.page);
  }
}

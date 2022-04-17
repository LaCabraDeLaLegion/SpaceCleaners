import store from "./data/store.js";
import Sound from "./data/sounds.js";

export default class Inventory extends Phaser.Scene {
  constructor() {
    super({ key: "inventory" });

    this.categories = {
      potions: store.potions,
      weapons: store.weapons,
    };

    this.currentInterface = [];
  }

  init(data) {
    this.inventory = data;
    this.globalWidth = this.cameras.main.width;
    this.globalHeight = this.cameras.main.height;
  }

  preload() {
    this.load.setPath("assets/");
    this.load_images();
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

  load_images() {
    this.load.image("background_shop", "/sprites/background_shop.png");
    this.load.image("close", "/sprites/shop_close.png");
    this.load.image("category", "/sprites/category.png");
    this.load.image("category_selected", "/sprites/category_selected.png");
    this.load.image("up", "/sprites/shop_up.png");
    this.load.image("down", "/sprites/shop_down.png");
    this.load.image("up_disabled", "/sprites/shop_up_disabled.png");
    this.load.image("down_disabled", "/sprites/shop_down_disabled.png");
    this.load.image("basic_potion", "/sprites/Potions/basic_potion.png");
    this.load.image("advanced_potion", "/sprites/Potions/advanced_potion.png");
    this.load.image("holy_potion", "/sprites/Potions/holy_potion.png");
    this.load.image("cash", "/sprites/cash.png");
    this.load.image("item", "/sprites/shop_item.png");
    this.load.image("item1", "/sprites/mascarilla.png");
    this.load.image("item2", "/sprites/weapon.png");
    this.load.image("buy", "/sprites/shop_buy.png");
    this.load.image("buy_btn_hover", "/sprites/buy_btn_hover.png");
    this.load.image("coin", "/sprites/coin.png");
  }

  load_audio() {
    this.load.audio("button", "../../sounds/button.ogg");
    this.load.audio("playSound", "../../sounds/play.wav");
    this.load.audio("buySound", "../sounds/buy.wav");
  }

  createTopBar() {
    let category1 = this.add
      .image(this.globalWidth / 9.35, this.globalHeight / 10, "category")
      .setOrigin(0, 0)
      .setDepth(1)
      .setScale(this.globalWidth / 1200);
    category1.setInteractive();
    category1.on("pointerover", () => {
      category1
        .setTexture("category_selected")
        .setScale(this.globalWidth / 1200);
      this.buttonSound.play();
    });
    category1.on("pointerout", () => {
      category1.setTexture("category").setScale(this.globalWidth / 1200);
    });
    category1.on("pointerup", () => {
      this.playSound.play();
      category1
        .setTexture("category_selected")
        .setScale(this.globalWidth / 1200);
      this.createCategory("potions", 1);
    });

    let category2 = this.add
      .image(
        (this.globalWidth / 9.35) * 3.5,
        this.globalHeight / 10,
        "category"
      )
      .setOrigin(0, 0)
      .setDepth(1)
      .setScale(this.globalWidth / 1200);
    category2.setInteractive();
    category2.on("pointerover", () => {
      category2
        .setTexture("category_selected")
        .setScale(this.globalWidth / 1200);
      this.buttonSound.play();
    });
    category2.on("pointerout", () => {
      category2.setTexture("category").setScale(this.globalWidth / 1200);
    });
    category2.on("pointerup", () => {
      this.playSound.play();
      category2
        .setTexture("category_selected")
        .setScale(this.globalWidth / 1200);
      this.createCategory("weapons", 1);
    });

    let category3 = this.add
      .image((this.globalWidth / 9.35) * 6, this.globalHeight / 10, "category")
      .setOrigin(0, 0)
      .setDepth(1)
      .setScale(this.globalWidth / 1200);
    category3.setInteractive();
    category3.on("pointerover", () => {
      category3
        .setTexture("category_selected")
        .setScale(this.globalWidth / 1200);
      this.buttonSound.play();
    });
    category3.on("pointerout", () => {
      category3.setTexture("category").setScale(this.globalWidth / 1200);
    });
    category3.on("pointerup", () => {
      this.playSound.play();
      category3
        .setTexture("category_selected")
        .setScale(this.globalWidth / 1200);
      this.createCategory("shields", 1);
    });

    this.add
      .text(
        (this.globalWidth / 9.35) * 1.5,
        (this.globalHeight / 10) * 1.15,
        "potions",
        { fontFamily: "MinimalPixel" }
      )
      .setDepth(2)
      .setScale(this.globalWidth / 600);
    this.add
      .text(
        (this.globalWidth / 9.35) * 4,
        (this.globalHeight / 10) * 1.15,
        "Weapons",
        { fontFamily: "MinimalPixel" }
      )
      .setDepth(2)
      .setScale(this.globalWidth / 600);
    this.add
      .text(
        (this.globalWidth / 9.35) * 6.5,
        (this.globalHeight / 10) * 1.15,
        "Shields",
        { fontFamily: "MinimalPixel" }
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
        { fontFamily: "MinimalPixel" }
      )
      .setDepth(2)
      .setScale(this.globalWidth / 600);
  }

  createItem(item, position, category) {
    let item_bar = this.add
      .image(
        this.globalWidth / 8,
        (this.globalHeight / 5) * (1 + position),
        "item"
      )
      .setOrigin(0, 0)
      .setDepth(1)
      .setScale(this.globalWidth / 130);
    let item_img = this.add
      .image(
        (this.globalWidth / 8) * 1.3,
        (this.globalHeight / 5.1) * (1.15 + (position*1.02)),
        item.img
      )
      .setOrigin(0, 0)
      .setDepth(2)
      .setScale(this.globalWidth / 200);
    let item_name = this.add
      .text(
        (this.globalWidth / 8) * 2.7,
        (this.globalHeight / 5.5) * (1.2 + position * 1.1),
        item.info.name +
          " (" +
          item.info.quantity +
          "/" +
          item.maxQuantity +
          ")",
        { fontFamily: "MinimalPixel" }
      )
      .setDepth(2)
      .setScale(this.globalWidth / 600);
    let item_desc = this.add
      .text(
        (this.globalWidth / 8) * 2.7,
        (this.globalHeight / 5.5) * (1.5 + position * 1.1),
        item.desc,
        { fontFamily: "MinimalPixel" }
      )
      .setDepth(2)
      .setScale(this.globalWidth / 750);
    let buy_btn = this.add
      .image(
        (this.globalWidth / 8) * 5.5,
        (this.globalHeight / 5) * (1.3 + position),
        "buy"
      )
      .setOrigin(0, 0)
      .setDepth(2)
      .setScale(this.globalWidth / 300);
    buy_btn.setInteractive();
    buy_btn.on("pointerover", () => {
      buy_btn.setTexture("buy_btn_hover");
      this.buttonSound.play();
    });
    buy_btn.on("pointerout", () => {
      buy_btn.setTexture("buy");
    });
    buy_btn.on("pointerup", () => {
      this.buyItem({ ...item, category });
    });
    let item_buyText = this.add
      .text(
        (this.globalWidth / 8) * 5.75,
        (this.globalHeight / 5) * (1.345 + position),
        "Buy",
        { fontFamily: "MinimalPixel" }
      )
      .setDepth(3)
      .setScale(this.globalWidth / 750);
    let item_coin = this.add
      .image(
        (this.globalWidth / 8) * 5.5,
        (this.globalHeight / 5) * (1.15 + position),
        "coin"
      )
      .setOrigin(0, 0)
      .setDepth(2)
      .setScale(this.globalWidth / 200);
    let item_price = this.add
      .text(
        (this.globalWidth / 8) * 5.75,
        (this.globalHeight / 5) * (1.17 + position),
        item.price,
        { fontFamily: "MinimalPixel" }
      )
      .setDepth(2)
      .setScale(this.globalWidth / 750);
    this.currentInterface.push(
      item_bar,
      item_img,
      item_name,
      item_desc,
      buy_btn,
      item_buyText,
      item_coin,
      item_price
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
    if (page === this.categories[category].num_pages)
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
    this.categories[category].items
      .filter((item) => item.page === page)
      .forEach((item) => {
        this.createItem(item, position, category);
        position += 0.85;
      });
  }

  destroyCurrentInterface() {
    this.currentInterface.forEach((item) => item.destroy());
    this.currentInterface = [];
  }

  buyItem(item) {
    if (item.price <= this.inventory.money) {
      this.buySound.play();
      this.inventory.money -= item.price;

      switch (item.category) {
        case "potions":
          this.inventory.potions.push(item.info);
          break;
        case "weapons":
          this.inventory.weapons.push(item.info);
          break;
      }

      this.currentMoney.destroy();

      this.currentMoney = this.add
        .text(
          this.globalWidth *
            (0.25 - this.inventory.money.toString().length * 0.01),
          this.globalHeight * 0.05,
          this.inventory.money,
          { fontFamily: "MinimalPixel" }
        )
        .setDepth(2)
        .setScale(this.globalWidth / 600);
    }
  }
}
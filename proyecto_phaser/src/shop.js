import store from "./data/store.js";
import Sound from "./data/sounds.js";
export default class Shop extends Phaser.Scene {
  constructor() {
    super({ key: "shop" });

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
        (this.globalHeight / 5.1) * (1.15 + position * 1.02),
        item.info.img
      )
      .setOrigin(0, 0)
      .setDepth(2)
      .setScale(this.globalWidth / item.info.scale);
    let item_name = this.add
      .text(
        (this.globalWidth / 8) * 2.7,
        (this.globalHeight / 5.5) * (1.3 + position * 1.1),
        item.info.name,
        this.fontStyle
      )
      .setDepth(2)
      .setScale(this.globalWidth / 600);
    let item_desc = this.add
      .text(
        (this.globalWidth / 8) * 2.7,
        (this.globalHeight / 5.5) * (1.55 + position * 1.1),
        item.info.desc,
        this.fontStyle
      )
      .setDepth(2)
      .setScale(this.globalWidth / 750);

    let bought = this.inventory[category].findIndex(
      (i) => i.name === item.info.name
    );   

    if (item.rebuy || bought === -1) {
      let buy_btn = this.add
      .image(
        (this.globalWidth / 8) * 5.5,
        (this.globalHeight / 5) * (1.23 + position),
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
          (this.globalWidth / 8) * 5.7,
          (this.globalHeight / 5) * (1.25 + position),
          "Comprar",
          this.fontStyle
        )
        .setDepth(3)
        .setScale(this.globalWidth / 750);
      let item_coin = this.add
        .image(
          (this.globalWidth / 8) * 5.5,
          (this.globalHeight / 5) * (1.1 + position),
          "coin"
        )
        .setOrigin(0, 0)
        .setDepth(2)
        .setScale(this.globalWidth / 200);
      let item_price = this.add
        .text(
          (this.globalWidth / 8) * 5.75,
          (this.globalHeight / 5) * (1.12 + position),
          item.price,
          this.fontStyle
        )
        .setDepth(2)
        .setScale(this.globalWidth / 750);

        this.currentInterface.push(
          buy_btn,
          item_buyText,
          item_coin,
          item_price
        );
    } else {
      let item_sold = this.add
      .image(
        (this.globalWidth / 8) * 5.5,
        (this.globalHeight / 5) * (1.23 + position),
        "sold"
      )
      .setOrigin(0, 0)
      .setDepth(2)
      .setScale(this.globalWidth / 300);
      let item_soldText = this.add
      .text(
        (this.globalWidth / 8) * 5.7,
        (this.globalHeight / 5) * (1.25 + position),
        "Vendido",
        this.fontStyle
      )
      .setDepth(3)
      .setScale(this.globalWidth / 750);
      
      this.currentInterface.push(
        item_sold,
        item_soldText,
      );
    }
    
    this.currentInterface.push(
      item_bar,
      item_img,
      item_name,
      item_desc
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
          let potion = this.inventory.potions.findIndex(
            (p) => p.name === item.info.name
          );
          if (potion !== -1) this.inventory.potions[potion].quantity++;
          else this.inventory.potions.push({ ...item.info, quantity: 1 });
          break;
        case "weapons":
          this.inventory.weapons.push(item.info);
          this.createCategory(item.category, item.page)
          break;
      }

      this.currentMoney.destroy();

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
  }
}

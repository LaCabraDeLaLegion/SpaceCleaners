import store from "./data/store.js";
import Sound from "./data/sounds.js";
export default class Shop extends Phaser.Scene {
  constructor() {
    super({ key: "shop" });

    this.store = store;

    this.currentCategory = [];
    this.currentSubcategory = [];
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

  createUI() {
    let close = this.add
      .image(this.globalWidth * 0.95, this.globalHeight * 0.04, "close")
      .setDepth(1)
      .setScale(this.globalWidth / 400);
    close.setInteractive({ cursor: "url(assets/cursors/selector.cur), pointer" });
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

  createTopBar() {
    const categoryKeys = Object.keys(this.store);
    let position = 0;
    for (let key of categoryKeys) {
      let category = store[key];
      if (category.subcategories) {
        let cat_btn = this.add
      .image(
        this.globalWidth / 7.5 * (position + 1.275), 
        this.globalHeight / 10, 
        "category")
      .setOrigin(0, 0)
      .setDepth(1)
      .setScale(this.globalWidth / 1500);
      cat_btn.setInteractive({ cursor: "url(assets/cursors/selector.cur), pointer" });
      cat_btn.on("pointerover", () => {
        cat_btn
          .setTexture("category_selected")
          .setScale(this.globalWidth / 1500);
        this.buttonSound.play();
      });
      cat_btn.on("pointerout", () => {
        cat_btn.setTexture("category").setScale(this.globalWidth / 1500);
      });
      cat_btn.on("pointerup", () => {
        this.playSound.play();
        cat_btn
          .setTexture("category_selected")
          .setScale(this.globalWidth / 1500);
        this.createCategory(category, key, null);
      });

      this.add
      .text(
        (this.globalWidth / 7.5) * (position + 1.4),
        (this.globalHeight / 10.5) * 1.125,
        category.name,
        this.fontStyle
      )
      .setDepth(2)
      .setScale(this.globalWidth / 600);

      position += 1.85;
      }
    }
    if (categoryKeys.length > 0)
      this.createCategory(store[categoryKeys[0]], categoryKeys[0], null);
  }

  createCategory(category, categoryKey, subcategoryKey) {
    this.destroyCurrentCategory();
    this.destroyCurrentSubcategory();

    const subcatKeys = Object.keys(category.subcategories);
    let position = 0;
    for (let key of subcatKeys) {
      let subcategory = category.subcategories[key];
      let subcat_btn = this.add
        .image(
          this.globalWidth / 11 , 
          this.globalHeight / 7 * (position + 1.2), 
          "category")
        .setOrigin(0, 0)
        .setDepth(1)
        .setScale(this.globalWidth / 1500);
      subcat_btn.setInteractive({ cursor: "url(assets/cursors/selector.cur), pointer" });
      subcat_btn.on("pointerover", () => {
        subcat_btn
          .setTexture("category_selected")
          .setScale(this.globalWidth / 1500);
          this.buttonSound.play();
      });
      subcat_btn.on("pointerout", () => {
        subcat_btn.setTexture("category").setScale(this.globalWidth / 1500);
      });
      subcat_btn.on("pointerup", () => {
        this.playSound.play();
        subcat_btn
          .setTexture("category_selected")
          .setScale(this.globalWidth / 1500);
        this.createSubcategory(subcategory, categoryKey, key, 1);
      });

      let subcat_text = this.add
      .text(
        (this.globalWidth / 10) * 1.15,
        (this.globalHeight / 7) * (position + 1.225),
        subcategory.name,
        this.fontStyle
      )
      .setDepth(2)
      .setScale(this.globalWidth / 600);

      this.currentCategory.push(subcat_btn, subcat_text);

      position += 0.45;
    }

    if (subcatKeys.length > 0 && !subcategoryKey)
      this.createSubcategory(category.subcategories[subcatKeys[0]], categoryKey, subcatKeys[0], 1);
    else 
      this.createSubcategory(category.subcategories[subcategoryKey], categoryKey, subcategoryKey, 1);
  }

  createSubcategory(subcategory, categoryKey, subcategoryKey, page) {
    this.destroyCurrentSubcategory();

    let up = this.add
      .image(this.globalWidth * 0.955, this.globalHeight * 0.4, "up")
      .setDepth(1)
      .setScale(this.globalWidth / 400);
    if (page === 1) up.setTexture("up_disabled");
    else {
      up.setInteractive({ cursor: "url(assets/cursors/selector.cur), pointer" });
      up.on("pointerover", () => {
        up.setScale(this.globalWidth / 300);
        this.buttonSound.play();
      });
      up.on("pointerout", () => {
        up.setScale(this.globalWidth / 400);
      });
      up.on("pointerup", () => {
        this.playSound.play();
        this.createSubcategory(subcategory, --page);
      });
    }

    let down = this.add
      .image(this.globalWidth * 0.955, this.globalHeight * 0.6, "down")
      .setDepth(1)
      .setScale(this.globalWidth / 400);
    if (page === subcategory.num_pages)
      down.setTexture("down_disabled");
    else {
      down.setInteractive({ cursor: "url(assets/cursors/selector.cur), pointer" });
      down.on("pointerover", () => {
        down.setScale(this.globalWidth / 300);
        this.buttonSound.play();
      });
      down.on("pointerout", () => {
        down.setScale(this.globalWidth / 400);
      });
      down.on("pointerup", () => {
        this.playSound.play();
        this.createSubcategory(subcategory, ++page);
      });
    }

    this.currentSubcategory.push(up, down);

    let position = 0;
    subcategory.items
      .filter((item) => item.page === page)
      .forEach((item) => {
        this.createItem(item, position, categoryKey, subcategoryKey)
        position += 1;
      });
  }

  createItem(item, position, categoryKey, subcategoryKey) {
    let item_bar = this.add
      .image(
        this.globalWidth / 3.2,
        (this.globalHeight / 7) * (position + 1.2),
        "item"
      )
      .setOrigin(0, 0)
      .setDepth(1)
      .setScale(this.globalWidth / 160);
    let item_img = this.add
      .image(
        (this.globalWidth / 3.2) * 1.075,
        (this.globalHeight / 7) * (position + 1.3),
        item.info.img
      )
      .setOrigin(0, 0)
      .setDepth(2)
      .setScale(this.globalWidth / item.info.scale);
    let item_name = this.add
      .text(
        (this.globalWidth / 3.2) * 1.55,
        (this.globalHeight / 7) * (position + 1.35),
        item.info.name,
        this.fontStyle
      )
      .setDepth(2)
      .setScale(this.globalWidth / 650);
    let item_desc = this.add
      .text(
        (this.globalWidth / 3.2) * 1.55,
        (this.globalHeight / 7) * (position + 1.8),
        item.info.desc,
        this.fontStyle
      )
      .setDepth(2)
      .setScale(this.globalWidth / 800);

    let bought = this.inventory[categoryKey].subcategories[subcategoryKey].items.findIndex(
      (i) => i.name === item.info.name
    );

    if (item.rebuy || bought === -1) {
      let buy_btn = this.add
      .image(
        (this.globalWidth / 8) * 5.8,
        (this.globalHeight / 7) * (position + 1.53),
        "buy"
      )
      .setOrigin(0, 0)
      .setDepth(2)
      .setScale(this.globalWidth / 300);
      buy_btn.setInteractive({ cursor: "url(assets/cursors/selector.cur), pointer" });
      buy_btn.on("pointerover", () => {
        buy_btn.setTexture("buy_btn_hover");
        this.buttonSound.play();
      });
      buy_btn.on("pointerout", () => {
        buy_btn.setTexture("buy");
      });
      buy_btn.on("pointerup", () => {
        this.buyItem(item, categoryKey, subcategoryKey);
      });
      let item_buyText = this.add
        .text(
          (this.globalWidth / 8) * 5.95,
          (this.globalHeight / 7) * (position + 1.565),
          "Comprar",
          this.fontStyle
        )
        .setDepth(3)
        .setScale(this.globalWidth / 750);
      let item_coin = this.add
        .image(
          (this.globalWidth / 8) * 5.85,
          (this.globalHeight / 7) * (position + 1.35),
          "coin"
        )
        .setOrigin(0, 0)
        .setDepth(2)
        .setScale(this.globalWidth / 200);
      let item_price = this.add
        .text(
          (this.globalWidth / 8) * 6.15,
          (this.globalHeight / 7) * (position + 1.35),
          item.price,
          this.fontStyle
        )
        .setDepth(2)
        .setScale(this.globalWidth / 750);

        this.currentSubcategory.push(
          buy_btn,
          item_buyText,
          item_coin,
          item_price
        );
    } else {
      let item_sold = this.add
      .image(
        (this.globalWidth / 8) * 5.8,
        (this.globalHeight / 7) * (position + 1.45),
        "sold"
      )
      .setOrigin(0, 0)
      .setDepth(2)
      .setScale(this.globalWidth / 300);
      let item_soldText = this.add
      .text(
        (this.globalWidth / 8) * 5.95,
        (this.globalHeight / 7) * (position + 1.485),
        "Vendido",
        this.fontStyle
      )
      .setDepth(3)
      .setScale(this.globalWidth / 750);
      
      this.currentSubcategory.push(
        item_sold,
        item_soldText,
      );
    }
    
    this.currentSubcategory.push(
      item_bar,
      item_img,
      item_name,
      item_desc
    );

  }

  destroyCurrentCategory() {
    this.currentCategory.forEach((item) => item.destroy());
    this.currentCategory = [];
  }

  destroyCurrentSubcategory() {
    this.currentSubcategory.forEach((item) => item.destroy());
    this.currentSubcategory = [];
  }

  buyItem(item, categoryKey, subcategoryKey) {
    if (item.price <= this.inventory.money) {
      this.buySound.play();
      this.inventory.money -= item.price;

      let itemIndex = this.inventory[categoryKey].subcategories[subcategoryKey].items.findIndex(
        (i) => i.name === item.info.name
      );

      console.log(itemIndex);

      if (itemIndex !== -1)
        this.inventory[categoryKey].subcategories[subcategoryKey].items[itemIndex].quantity++;
      else {
        if (item.rebuy) item.info.quantity = 1;
        this.inventory[categoryKey].subcategories[subcategoryKey].items.push(item.info);
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

    this.createCategory(store[categoryKey], categoryKey, subcategoryKey);
  }
}

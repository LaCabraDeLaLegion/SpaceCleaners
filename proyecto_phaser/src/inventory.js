import store from "./data/store.js";
import Sound from "./data/sounds.js";

export default class Inventory extends Phaser.Scene {
  constructor() {
    super({ key: "inventory" });

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

  createTopBar() {
    const categoryKeys = Object.keys(this.inventory);
    let position = 0;
    for (let key of categoryKeys) {
      let category = this.inventory[key];
      let cat_btn = this.add
      .image(
        this.globalWidth / 7.5 * (position + 1.275), 
        this.globalHeight / 10, 
        "category")
      .setOrigin(0, 0)
      .setDepth(1)
      .setScale(this.globalWidth / 1500);
      cat_btn.setInteractive();
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

    if (categoryKeys.length > 0)
      this.createCategory(this.inventory[categoryKeys[0]], categoryKeys[0], null);
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
      subcat_btn.setInteractive();
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
        this.createSubcategory(subcategory, ++page);
      });
    }

    this.currentSubcategory.push(up, down);

    let position = 0;
    subcategory.items
      .forEach((item) => {
        this.createItem(item, position, categoryKey, subcategoryKey);
        position += 0.85;
      });
  }

  createItem(item, position, categoryKey, subcategoryKey) {
    if(item.equiped) {
      let item_bar = this.add
      .image(
        this.globalWidth / 3.2,
        (this.globalHeight / 7) * (position + 1.2),
        "item_equiped"
      )
      .setOrigin(0, 0)
      .setDepth(1)
      .setScale(this.globalWidth / 160);

      this.currentSubcategory.push(item_bar);
    } else {
      let item_bar = this.add
      .image(
        this.globalWidth / 3.2,
        (this.globalHeight / 7) * (position + 1.2),
        "item"
      )
      .setOrigin(0, 0)
      .setDepth(1)
      .setScale(this.globalWidth / 160);
      
      let select_btn = this.add
      .image(
        (this.globalWidth / 8) * 5.8,
        (this.globalHeight / 7) * (position + 1.45),
        "buy"
      )
      .setOrigin(0, 0)
      .setDepth(2)
      .setScale(this.globalWidth / 300);
      select_btn.setInteractive();
      select_btn.on("pointerover", () => {
        select_btn.setTexture("select_btn_hover");
        this.buttonSound.play();
      });
      select_btn.on("pointerout", () => {
        select_btn.setTexture("buy");
      });
      select_btn.on("pointerup", () => {
        this.equipItem(item, categoryKey, subcategoryKey);
      });

      let item_selection = this.add
      .text(
        (this.globalWidth / 8) * 5.95,
        (this.globalHeight / 7) * (position + 1.485),
        "Equipar",
        this.fontStyle
      )
      .setDepth(3)
      .setScale(this.globalWidth / 750);

      this.currentSubcategory.push( 
        item_bar,
        select_btn,
        item_selection
      );

    }
    let item_img = this.add
      .image(
        (this.globalWidth / 3.2) * 1.075,
        (this.globalHeight / 7) * (position + 1.275),
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
        (this.globalWidth / 3.2) * 1.55,
        (this.globalHeight / 7) * (position + 1.35),
        item.name + quantity,
        this.fontStyle
      )
      .setDepth(2)
      .setScale(this.globalWidth / 650);
    let item_desc = this.add
      .text(
        (this.globalWidth / 3.2) * 1.55,
        (this.globalHeight / 7) * (position + 1.675),
        item.desc,
        this.fontStyle
      )
      .setDepth(2)
      .setScale(this.globalWidth / 800);

    this.currentSubcategory.push(
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

  equipItem(item, categoryKey, subcategoryKey) {
    for (let subcategory_items of this.inventory[categoryKey].subcategories[subcategoryKey].items) {
      subcategory_items.equiped = false;
    }
    let inventory_item = this.inventory[categoryKey].subcategories[subcategoryKey].items.find((i) => i.name === item.name);
    inventory_item.equiped = true;
    this.createCategory(this.inventory[categoryKey], categoryKey, subcategoryKey);
  }
}

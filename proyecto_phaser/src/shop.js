export default class Shop extends Phaser.Scene {
  constructor() {
    super({ key: "shop" });

    this.categories = {
      medicines: {
        items: [
          {
            info: { name: "Basic Medicine",
                    quantity: 0,
                    health: 1 },
            desc: "Recovers 1 point of health",
            price: 10,
            page: 1,
            img: "item1",
            maxQuantity: 3
          },
          {
            info: { name: "Advanced Medicine",
                    quantity: 0,
                    health: 5 },
            desc: "Recovers 5 point of health",
            price: 100,
            page: 1,
            img: "item1",
            maxQuantity: 3
          },
          {
            info: { name: "Holy Medicine",
                    quantity: 0,
                    health: 10 },
            desc: "Recovers 10 point of health",
            price: 1000,
            page: 1,
            img: "item1",
            maxQuantity: 3
          },
          {
            info: { name: "Immunity Medicine",
                    quantity: 0,
                    health: 10 },
            desc: "Gives 5 seconds of immunity",
            price: 1000,
            page: 2,
            img: "item1",
            maxQuantity: 3
          },
        ],
        num_pages: 2
      },
      weapons: {
        items: [
          {
            info: { name: "Arma 1",
                    quantity: 0,
                    health: 1 },
            desc: "Recovers 1 point of health",
            price: 10,
            page: 1,
            img: "item1",
            maxQuantity: 3
          },
          {
            info: { name: "Arma 2",
                    quantity: 0,
                    health: 5 },
            desc: "Recovers 5 point of health",
            price: 100,
            page: 1,
            img: "item1",
            maxQuantity: 3
          },
          {
            info: { name: "Holy Medicine",
                    quantity: 0,
                    health: 10 },
            desc: "Recovers 10 point of health",
            price: 100,
            page: 1,
            img: "item1",
            maxQuantity: 3
          },
        ],
        num_pages: 1
      }
    };

    this.currentInterface = [];

  }

  init(data) {

  }

  preload() {
    this.load.setPath("assets/");
    this.load_images();
    this.load_audio();
  }

  create() {
    let background = this.add.image(0,0, "background_shop").setOrigin(0,0).setDepth(0).setScale(this.cameras.main.width/44);
    
    this.createUI();
    this.createTopBar();
    
    this.buttonSound = this.sound.add("button");
    this.playSound = this.sound.add("playSound", {
      mute: false,
      volume: 1,
      rate: 3,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    });
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
    this.load.image("cash", "/sprites/cash.png");
    this.load.image("item", "/sprites/shop_item.png");
    this.load.image("item1", "/sprites/mascarilla.png");
    this.load.image("buy", "/sprites/shop_buy.png");
    this.load.image("coin", "/sprites/coin.png");
  }

  load_audio() {
    this.load.audio("button", "../../sounds/button.ogg");
    this.load.audio("playSound", "../../sounds/play.wav");
  }

  createTopBar() {
    let category1 = this.add.image(this.cameras.main.width/9.35, this.cameras.main.height/7, "category").setOrigin(0,0).setDepth(1).setScale(this.cameras.main.width/1200);
    category1.setInteractive();
    category1.on("pointerover", () => {
      category1.setTexture("category_selected").setScale(this.cameras.main.width/1200);
      this.buttonSound.play();
    });
    category1.on("pointerout", () => {
      category1.setTexture("category").setScale(this.cameras.main.width/1200);
    });
    category1.on("pointerup", () => {
      this.playSound.play();
      category1.setTexture("category_selected").setScale(this.cameras.main.width/1200);
      this.createCategory("medicines", 1);
    });

    let category2 = this.add.image(this.cameras.main.width/9.35 * 3.5, this.cameras.main.height/7, "category").setOrigin(0,0).setDepth(1).setScale(this.cameras.main.width/1200);
    category2.setInteractive();
    category2.on("pointerover", () => {
      category2.setTexture("category_selected").setScale(this.cameras.main.width/1200);
      this.buttonSound.play();
    });
    category2.on("pointerout", () => {
      category2.setTexture("category").setScale(this.cameras.main.width/1200);
    });
    category2.on("pointerup", () => {
      this.playSound.play();
      category2.setTexture("category_selected").setScale(this.cameras.main.width/1200);
      this.createCategory("weapons", 1);
    });

    let category3 = this.add.image(this.cameras.main.width/9.35 * 6, this.cameras.main.height/7, "category").setOrigin(0,0).setDepth(1).setScale(this.cameras.main.width/1200);
    category3.setInteractive();
    category3.on("pointerover", () => {
      category3.setTexture("category_selected").setScale(this.cameras.main.width/1200);
      this.buttonSound.play();
    });
    category3.on("pointerout", () => {
      category3.setTexture("category").setScale(this.cameras.main.width/1200);
    });
    category3.on("pointerup", () => {
      this.playSound.play();
      category3.setTexture("category_selected").setScale(this.cameras.main.width/1200);
      this.createCategory("shields", 1);
    });

    this.add.text(this.cameras.main.width/9.35 * 1.5, this.cameras.main.height/7  * 1.15, "Medicines", { fontFamily: 'MinimalPixel'}).setDepth(2).setScale(this.cameras.main.width/600);
    this.add.text(this.cameras.main.width/9.35 * 4, this.cameras.main.height/7  * 1.15, "Weapons", { fontFamily: 'MinimalPixel'}).setDepth(2).setScale(this.cameras.main.width/600);
    this.add.text(this.cameras.main.width/9.35 * 6.5, this.cameras.main.height/7  * 1.15, "Shields", { fontFamily: 'MinimalPixel'}).setDepth(2).setScale(this.cameras.main.width/600);
   
    this.createCategory("medicines", 1);
  }

  createUI() {
    let close = this.add.image(this.cameras.main.width * 0.95, this.cameras.main.height * 0.06, "close").setDepth(1).setScale(this.cameras.main.width/400);
    close.setInteractive();
    close.on("pointerover", () => {
      close.setScale(this.cameras.main.width/300);
      this.buttonSound.play();
    });
    close.on("pointerout", () => {
      close.setScale(this.cameras.main.width/400);
    });
    close.on("pointerup", () => {
      this.playSound.play();
      this.time.delayedCall(1000, () => {
        this.scene.start("map", [null, null, null]);
      });
    });
    let cash = this.add.image(5,10, "cash").setOrigin(0,0).setDepth(1).setScale(this.cameras.main.width/125);
  }

  createItem(item, position) {
    let item_bar = this.add.image(this.cameras.main.width/8, this.cameras.main.height/4 * (1 + position), "item").setOrigin(0,0).setDepth(1).setScale(this.cameras.main.width/130);
    let item_img = this.add.image(this.cameras.main.width/8 * 1.3, this.cameras.main.height/4 * (1.15 + position), item.img).setOrigin(0,0).setDepth(2).setScale(this.cameras.main.width/200);
    let item_name = this.add.text(this.cameras.main.width/8 * 2.7, this.cameras.main.height/4 * (1.2 + position), item.info.name+" ("+item.info.quantity+"/"+item.maxQuantity+")", { fontFamily: 'MinimalPixel'}).setDepth(2).setScale(this.cameras.main.width/600);
    let item_desc = this.add.text(this.cameras.main.width/8 * 2.7, this.cameras.main.height/4 * (1.5 + position), item.desc, { fontFamily: 'MinimalPixel'}).setDepth(2).setScale(this.cameras.main.width/750);
    let item_buyImg = this.add.image(this.cameras.main.width/8 * 5.5, this.cameras.main.height/4 * (1.3 + position), "buy").setOrigin(0,0).setDepth(2).setScale(this.cameras.main.width/300);
    let item_buyText = this.add.text(this.cameras.main.width/8 * 5.75, this.cameras.main.height/4 * (1.345 + position), "Buy", { fontFamily: 'MinimalPixel'}).setDepth(3).setScale(this.cameras.main.width/750);
    let item_coin = this.add.image(this.cameras.main.width/8 * 5.5, this.cameras.main.height/4 * (1.15 + position), "coin").setOrigin(0,0).setDepth(2).setScale(this.cameras.main.width/200);
    let item_price = this.add.text(this.cameras.main.width/8 * 5.75, this.cameras.main.height/4 * (1.17 + position), item.price, { fontFamily: 'MinimalPixel'}).setDepth(2).setScale(this.cameras.main.width/750);
    this.currentInterface.push(item_bar, item_img, item_name, item_desc, item_buyImg, item_buyText, item_coin, item_price);
  }

  createCategory(category, page) {
    this.destroyCurrentInterface();

    let up = this.add.image(this.cameras.main.width * 0.945, this.cameras.main.height * 0.4, "up").setDepth(1).setScale(this.cameras.main.width/400);
    if (page === 1)
      up.setTexture("up_disabled");
    else {
      up.setInteractive();
      up.on("pointerover", () => {
        up.setScale(this.cameras.main.width/300);
        this.buttonSound.play();
      });
      up.on("pointerout", () => {
        up.setScale(this.cameras.main.width/400);
      });
      up.on("pointerup", () => {
        this.playSound.play();
        this.createCategory(category, --page);
      });
    }
    
    let down = this.add.image(this.cameras.main.width * 0.945, this.cameras.main.height * 0.6, "down").setDepth(1).setScale(this.cameras.main.width/400);
    if (page === this.categories[category].num_pages)
      down.setTexture("down_disabled");
    else {
      down.setInteractive();
      down.on("pointerover", () => {
        down.setScale(this.cameras.main.width/300);
        this.buttonSound.play();
      });
      down.on("pointerout", () => {
        down.setScale(this.cameras.main.width/400);
      });
      down.on("pointerup", () => {
        this.playSound.play();
        this.createCategory(category, ++page);
      });
    }

    this.currentInterface.push(up,down);

    let position = 0;
    this.categories[category].items.filter(item => item.page === page).forEach(item => {
      this.createItem(item, position);
      position += 0.85;
    });
  }

  destroyCurrentInterface() {
    this.currentInterface.forEach(item => item.destroy());
    this.currentInterface = [];
  }

}
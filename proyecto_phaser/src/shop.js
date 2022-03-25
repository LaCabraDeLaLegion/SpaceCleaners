export default class Shop extends Phaser.Scene {
  constructor() {
    super({ key: "shop" });

    this.medicineList = [
      {
        desc: "Basic Medicine",
        health: 1,
      },
      {
        desc: "Advanced Medicine",
        health: 3,
      },
      {
        desc: "Holy Medicine",
        health: 10,
      },
    ];

    this.weapons = [];
  }

  init(data) {

  }

  preload() {
    this.load.setPath("assets/");
    this.load_images();
    this.load_audio();
  }

  create() {
    this.createTopBar();
    
    this.buttonSound = this.sound.add("button");
  }

  load_images() {
    this.load.image("background_shop", "/sprites/background_shop.png");
    this.load.image("close", "/sprites/close.png");
    this.load.image("category", "/sprites/category.png");
    this.load.image("cash", "/sprites/cash.png");
  }

  load_audio() {
    this.load.audio("button", "../../sounds/button.ogg");
  }

  createTopBar() {
    let background = this.add.image(0,0, "background_shop").setOrigin(0,0).setDepth(0).setScale(17.5);
    let close = this.add.image(740, 25, "close").setDepth(1);
    close.setInteractive();
    close.on("pointerover", () => {
      close.setScale(1.2);
      this.buttonSound.play();
    });
    close.on("pointerout", () => {
      close.setScale(1);
    });
    close.on("pointerup", () => {
      this.playSound.play();
      this.time.delayedCall(1000, () => {
       
      });
    });
    let cash = this.add.image(5,0, "cash").setOrigin(0,0).setDepth(1).setScale(5);
    let category1 = this.add.image(5,70, "category").setOrigin(0,0).setDepth(1);
    let category2 = this.add.image(this.cameras.main.width/3  + 5,70, "category").setOrigin(0,0).setDepth(1);
    let category3 = this.add.image(this.cameras.main.width/3 * 2 + 5,70, "category").setOrigin(0,0).setDepth(1);
  }

}
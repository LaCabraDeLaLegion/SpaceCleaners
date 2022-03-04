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

  init(data) {}
}

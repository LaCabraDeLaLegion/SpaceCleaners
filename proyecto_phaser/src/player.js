import Laser from "./laser.js";
export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "player");
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.scene.add.existing(this);
  }

  preUpdate(t, dt) {
    super.preUpdate(t, dt);

    if (this.cursors.left.isDown) {
      this.x -= 5;
    }

    if (this.cursors.right.isDown) {
      this.x += 5;
    }

    if (this.cursors.up.isDown) {
      this.y -= 5;
    }

    if(this.cursors.down.isDown) {
        this.y += 5;
    }
    // console.log(Phaser.Input.Keyboard.KeyCodes.SPACE);
    // if(this.cursors.isDown(Phaser.Input.Keyboard.KeyCodes.SPACE)){
    //   this.laser = new Laser(this,this.x, this.y + 1);
    // }
  }
}

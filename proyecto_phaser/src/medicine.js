export default class Medicine extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, medicineGroup) {
      super(scene, x, y, "mask");
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
      medicineGroup.add(this);
    }
  
    preUpdate(t, dt) {
      super.preUpdate(t, dt);
      
      this.y -= 8;
  
      if (this.y < 0) this.destroy();
  
    }
  }
  
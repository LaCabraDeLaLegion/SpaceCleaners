export default class Weapon extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, name) {
        super(scene, x, y, name);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }

    addGroup(laserGroup) {
        laserGroup.add(this);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }
}
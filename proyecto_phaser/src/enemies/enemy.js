
export default class Enemy extends Phaser.GameObjects.Sprite {
  
    constructor(scene, x, y, name) {
        
        super(scene, x, y, name);
        
        this.scene.add.existing(this);
        
        this.scene.physics.add.existing(this);

        this.dead = false;

    }

    addToGroup(group){
        group.add(this);
    }

    preUpdate(t, dt) {

        super.preUpdate(t, dt);

        if (this.lives <= 0){
            this.scene.time.delayedCall(200, () => {
                this.dead = true;
                this.destroy();
                console.log("destroy");
            });
        }

    }
}

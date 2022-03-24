
export default class Enemy extends Phaser.GameObjects.Sprite {
  
    constructor(scene, x, y, name) {
        
        super(scene, x, y, name);
        
        this.scene.add.existing(this);
        
        this.scene.physics.add.existing(this);

        this.dead = false;

        this.x_right = true;
        this.counter = 0;
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

        this.y += 1;
        if (this.x_right){
            this.x += 1;
            this.counter++;
        }
        else {
            this.x -= 1;
            this.counter++;
        }

        if (this.counter == 50){
            this.counter = 0;
            this.x_right = !this.x_right;
        }


    }
}

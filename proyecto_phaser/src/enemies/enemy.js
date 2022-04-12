
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

        if (this.vertical == true) {
            //if (!(this.dying && this.y > (this.scene.cameras.main.height - 5)))
                this.y += 2;
        }
        else {
            
            this.y += 0.25;

            if (this.x_right){
                this.x += 0.5;
                this.counter++;
            }
            else {
                this.x -= 0.5;
                this.counter++;
            }

            if (this.counter == 50){
                this.counter = 0;
                this.x_right = !this.x_right;
            }

        }

    }
}

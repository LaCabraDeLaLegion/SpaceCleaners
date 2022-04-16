
export default class Enemy extends Phaser.GameObjects.Sprite {
  
    constructor(scene, x, y, level, group, max_level, apparition_group, data) {

        super(scene, x, y, data.key);
        
        this.scene.add.existing(this);
        
        this.scene.physics.add.existing(this);

        this.level = level;
        this.lives = data.lives; 

        this.dead = false;

        this.x_right = true;
        this.counter = 0;

        this.attackTime = 20;

        this.addToGroup(group);
        this.group = group;
        this.apparition_group = apparition_group;
        this.max_level = max_level;

        this.walk_anim = data.name + "_walk";
       
        this.play(this.walk_anim);
    }

    addToGroup(group){
        group.add(this);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
            
        //movement
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

        //attack
        // this.attackTime--;

        // if (this.attackTime <= 0) {
        //     this.scene.virusAttack();
        //     this.attackTime = 20;
        // }

    }

    syncMovement(counter, x_rigth) {
        this.counter = counter;
        this.x_right = x_rigth;
    }

}

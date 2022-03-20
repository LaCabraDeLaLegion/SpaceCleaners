export default class Portal extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, player) {
    super(scene, x, y, "portal");
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.player = player;
  }

  calculatePlayerPosition() {
    if (this.player.x > this.x && this.player.y > this.y) {
      //abajo a la derecha
      return { x: -1, y: -1 };
    } else if (this.player.x > this.x && this.player.y < this.y) {
      //arriba a la derecha
      return { x: -1, y: 1 };
    } else if (this.player.x < this.x && this.player.y < this.y) {
      //arriba a la izquierda
      return { x: 1, y: 1 };
    } else if (this.player.x < this.x && this.player.y > this.y) {
      //abajo a la izq
      return { x: 1, y: -1 };
    } else if (this.player.x === this.x) {
      //en funcion de y
      return this.player.y > this.y ? { x: 0, y: -1 } : { x: 0, y: 1 };
    } else {
      //en funcion de x
      return this.player.x > this.x ? { x: -1, y: 0 } : { x: 1, y: 0 };
    }
  }

  preUpdate(t, dt) {
    if (Math.round(t) % 2 === 0) {
      const coords = this.calculatePlayerPosition();
      this.player.body.setVelocityX(60 * coords.x);
      this.player.body.setVelocityY(60 * coords.y);
    }
  }
}

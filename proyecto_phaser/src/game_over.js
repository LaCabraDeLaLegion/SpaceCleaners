

export default class GameOver extends Phaser.Scene {
    constructor() {
      super({ key: "gameover" });
    }
  
    init(data) {
    }
  
    preload() {
      this.load.setPath("assets/");
      this.load.image("game_over_final", "game_over_final.png");
    }
  
    create() {  
      this.add.image(450, 250, "game_over_final");
    }
  }
  
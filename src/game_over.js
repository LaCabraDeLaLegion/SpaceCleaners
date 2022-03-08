

export default class GameOver extends Phaser.Scene {
    constructor() {
      super({ key: "gameover" });
    }
  
    init(data) {
    }
  
    preload() {
    }
  
    create() {
        console.log("GAME OVER");
    }
  }
  
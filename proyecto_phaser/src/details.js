export default class Details extends Phaser.Scene {
    constructor() {
        super({ key: "details" });
    }
    
    init(data) {
        this.globalWidth = this.cameras.main.width;
        this.globalHeight = this.cameras.main.height;
        this.fontStyle = {
            fontFamily: 'GameFont',
            fontSize: '30px',
        }
        this.result = data[0];
        this.level = data[1];
        this.inventory = data[2];
        this.virus_killed = data[3];
        this.humans_healed = data[4];
        this.reward = data[5];
    }

    create() {
        this.createDetails();
    }

    createDetails(){
        this.add
        .text(
          (this.globalWidth / 10) * 1.5,
          (this.globalHeight / 10.5) * 3.125,
          "Virus eliminados: " + this.virus_killed,
          this.fontStyle
        )
        .setDepth(2)
        .setScale(this.globalWidth / 600);
        this.add
        .text(
            (this.globalWidth / 10) * 1.5,
            (this.globalHeight / 10.5) * 3.725,
            "Humanos desinfectados: " + this.humans_healed,
            this.fontStyle
        )
        .setDepth(2)
        .setScale(this.globalWidth / 600);
        this.add
        .text(
            (this.globalWidth / 10) * 1.5,
            (this.globalHeight / 10.5) * 4.925,
            "Total dinero recolectado: " + this.reward,
            this.fontStyle
        )
        .setDepth(2)
        .setScale(this.globalWidth / 600);

        let item_coin = this.add
        .image(
          (this.globalWidth / 10) * 7.5,
          (this.globalHeight / 10.5) * 4.925,
          "coin"
        )
        .setOrigin(0, 0)
        .setDepth(2)
        .setScale(this.globalWidth / 125);

        let victory = this.add
        .image(
            this.globalWidth / 2,
            (this.globalHeight / 10.5) * 6.225,
            "continue"
        )
        .setDepth(1);
        victory.setInteractive({ cursor: "url(assets/cursors/selector.cur), pointer" });
        victory.on("pointerup", () => {
            this.scene.start("map", [this.result, this.level, this.inventory]);
        });
    }
    
}
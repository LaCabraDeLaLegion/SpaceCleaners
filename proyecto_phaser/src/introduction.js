let texto = [
    [
    "La raza humana ha establecido colonias a lo largo",
    "y ancho de la galaxia.",
    "",
    "Una catástrofe natural ha hecho que se libere ",
    "un virus mutado con el que estaban trabajando",
    "unos científicos en el planeta más lejano.",
    "",
    "Este virus se expande con mucha rapidez",
    "y ha mutado a pasos agigantados.",
    "",
    "Ahora todas las colonias han sido infectadas,",
    "los humanos que allí vivían son prácticamente zombies",
    "presas de la enfermedad y especímenes monstruosos",
    "fruto de las mutaciones del virus",
    "asolan las calles.",
    "",
    "",
    "Sólo queda la Tierra"
    ],
    [
    "El gobierno mundial ha creado un ejército de emergencia",
    "y ha utilizado todos los recursos disponibles",
    "para aprovisionar a sus soldados de armas y medicinas",
    "diseñadas por sus científicos para eliminar la infección.",
    "",
    "",
    "Su misión como comandante de nuestro ejército",
    "será liderar a nuestros soldados hasta la victoria",
    "",
    "Destruya el virus antes de que alcance la Tierra",
    "o todos moriremos."
    ],
    ["Buena suerte."]
];

export default class Introduction extends Phaser.Scene {
    constructor() {
      super({ key: "introduction" });
    }
  
    preload() {
      this.load.setPath("assets/sprites/Introduction/");
      //this.load.image("background", "background.png");
      this.load.image("skip", "skip.png");
      this.load.image("continue", "continue.png");
  
      this.load.audio("playSound", "../../sounds/play.wav");
      this.load.audio("intro", "../../sounds/intro_song.wav");
      this.load.audio("button", "../../sounds/button.ogg");
    }

    create() {
  
      this.playSound = this.sound.add("playSound", {
        mute: false,
        volume: 1,
        rate: 3,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0,
      });
  
      this.introSong = this.sound.add("intro", {
        mute: false,
        volume: 1.5,
        rate: 0.65,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0,
      });
  
      this.buttonSound = this.sound.add("button");
  
      this.text_counter = 0;
      this.text = this.add.text(this.cameras.main.width/8, this.cameras.main.height/5, texto[0], {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '25px'
      });

      let skip = this.add.image(this.cameras.main.width - 120, 50, "skip").setDepth(1);
      skip.setInteractive();
      skip.on("pointerover", () => {
        skip.setScale(1.1);
        this.buttonSound.play();
      });
      skip.on("pointerout", () => {
        skip.setScale(1);
      });
      skip.on("pointerup", () => {
        this.playSound.play();
        this.time.delayedCall(1000, () => {
          this.introSong.pause();
          this.scene.start("map", [null, null, null]);
        });
      });

      let continue_button = this.add.image(this.cameras.main.width - 120, this.cameras.main.height - 50, "continue").setDepth(1);
      continue_button.setInteractive();
      continue_button.on("pointerover", () => {
        continue_button.setScale(1.1);
        this.buttonSound.play();
      });
      continue_button.on("pointerout", () => {
        continue_button.setScale(1);
      });
      continue_button.on("pointerup", () => {
        this.text_counter++;
        if (this.text_counter >= 3){
            this.playSound.play();
            this.time.delayedCall(1000, () => {
                this.introSong.pause();
                this.scene.start("menu", [null, null, null]);
            });
        }
        else {
            this.text.setText(texto[this.text_counter]);
        }
      });
  
      this.introSong.play();
    }
  
  }
  
let map_init_texts = [
  [
    ["Para ayudarle a dirigir las tropas, el gobierno le ha proporcionado este mapa de las colonias."],
    ["El origen de la infección se sitúa en el último planeta del mapa."]
  ],
  [
    ["Para ayudarle a dirigir las tropas, el gobierno le ha proporcionado este mapa de las colonias."],
    ["El origen de la infección se sitúa en el último planeta del mapa."]
  ],
  [
    ["Un equipo de expedición ha informado de que en los planetas cercanos al origen"],
    ["los humanos presentan mayores niveles de infección y los virus son más duros de pelar."]
  ],
  [
    ["Debido a la infección, los caminos entre los planetas también han sido infectados."],
    ["La primera vez que desinfecte un planeta, podremos desinfectar el camino al siguiente."],
    ["No podrá acceder a un planeta hasta haber desinfectado el camino."]
  ],
  [
    ["Para evitar confusiones, los planetas infectados aparecerán en colores rojos."],
    ["Cuando consiga desinfactarlos retornarán a su color original."]
  ],
  [
    ["Para intentar desinfectar un planeta basta con pulsar sobre él"],
    ["Hagamos una prueba, trate de desinfectar el primer planeta."]
  ]
];

let map_store_texts = [
  [
    ["Tras la batalla vovlerá a la base para planificar su próximo movimiento."],
    ["Como ve, al salir victorioso el planeta recobra su color original."]
  ],
  [
    ["Pero tenga cuidado, el virus nunca descansa."],
    ["En cada batalla que usted libra, el virus puede intentar recobrar el control de un planeta."],
    ["Si esto sucede, el planeta volverá a mostrarse en rojo."]
  ],
  [
    ["En cada planeta las batallas serán más duras y los enemigos más resistentes."],
    ["Para ayudarle en su misión nuestros científicos irán creando nuevas armas y medicinas."],
    ["Además, tendrá disponibles pociones, escudos y bombas para utilizarlas en batalla."]
  ],
  [
    ["Al ganar una batalla, los fondos de su ejército aumentarán."],
    ["Utilice el dinero con cautela para aprovisionarse de consumibles y mejor equipación."],
    ["En la tienda podrá comprar activos y en el inventario decidir qué llevará a la batalla."]
  ],
  [
    ["Dicho esto, larga y própsera vida. Ahora está preparado para enfrentarse al enemigo"],
    ["(porque 5 minutos te preparán para el apocalipsis, claro está)."]
  ]
];

let battle_texts = [
  [
    ["Bienvenido al campo de batalla."],
    ["Le presento a sus tropas."]
  ],
  [
    ["Para desplazarse, utilize las flechas o las teclas A, W, S, D."],
    ["Pruebe a desplazarse."]
  ],
  [
    ["Este es nuestro enemigo, el virus. Este concretamente es de nivel 1."],
    ["Los virus suben de nivel con cada planeta. Y con cada nivel su vida aumenta en 1."]
  ],
  [
    ["Para eliminar a un virus, deberá dispararle con su arma."],
    ["Cuidado, los virus pueden lanzarle plasma y hacer que pierda vida."]
    ["Para disparar utilice la barra espaciadora. Intente eliminar a este virus"]
  ],
  [
    ["Este es un pobre ciudadano que sufre los efectos del virus."],
    ["Para curarle dispare una medicina utilizando la tecla C."],
    ["Desinfecte a este pobre hombre."]
  ],
  [
    ["Mucho cuidado, si utiliza un arma sobre un humano o una medicina sobre un virus,"],
    ["mutará y aumentará su nivel (hasta el máximo del planeta) y su vida."]
  ],
  [
    ["Cuando acabe con todos los virus y desinfecte a todos los humanos"],
    ["deberá enfrentarse al boss del planeta, el virus monstruoso"],
    ["que dirige el cotarro."]
  ],
  [
    ["Mucho cuidado, el boss puede atacar a sus tropas."],
    ["Dispare al boss con su arma e intente ganar la batalla."],
    ["Para esta simulación su nivel de vida es infinito"]
  ],
  ["Enhorabuena, ha derrotado al boss."],
  ["Si pierde todas las vidas o los enemigos alcanzan la parte inferior"],
  ["de la pantalla usted habrá perdido la batalla."]
];

let dialogs_map_1 = 6;
let dialogs_map_2 = 5;
let dialogs_battle = 9;

export default class Tutorial extends Phaser.Scene {
    constructor() {
      super({ key: "tutorial" });
    }
  
    init(data) {
    }
  
    preload() {
      this.load.setPath("assets/");
      this.load.image("continue", "sprites/Introduction/continue.png");
      this.load.image("skip", "sprites/Introduction/skip.png");

      this.load.audio("button", "../../sounds/button.ogg");
    }
  
    create() {

      this.state = "map_intro";
      this.continue_counter = 0;

      let skip = this.add
      .image(this.cameras.main.width - 120, 50, "skip")
      .setDepth(1);
      skip.setInteractive();
      skip.on("pointerover", () => {
        skip.setScale(1.1);
      });
      skip.on("pointerout", () => {
        skip.setScale(1);
      });
      skip.on("pointerup", () => {
        this.time.delayedCall(1000, () => {
          this.scene.start("map", [null, null, null]);
        });
      });
        
    }

  }

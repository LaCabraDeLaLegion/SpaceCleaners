import Player from "./player.js";
import Boss from "./boss.js";
import Sound from "./data/sounds.js";
import Virus from "./enemies/virus.js";
import Human from "./enemies/human.js";
import InitialInventory from "./data/init_inventory.js";

let aux;

let map_init_texts = [
  [
    ["Para ayudarle a dirigir las tropas, el gobierno le ha proporcionado"],
    ["este mapa de las colonias. El origen de la infección se sitúa "],
    ["en el último planeta del mapa."]
  ],
  [
    ["Un equipo de expedición ha informado de que cuanto más te acercas"],
    [" al origen los humanos presentan mayores niveles de infección"],
    ["y los virus son más duros de pelar."]
  ],
  [
    ["Debido a la infección, los caminos entre los planetas también"],
    ["han sido infectados. La primera vez que desinfecte un planeta,"],
    ["podremos desinfectar el camino al siguiente. No podrá acceder"],
    ["a un planeta hasta haber desinfectado el anterior."]
  ],
  [
    ["Los planetas infectados aparecerán en rojo."],
    ["Los planetas que no sean accesibles tendrán un candado."],
    ["Recuerde que la Tierra es su base y no está infectada. Cuando"],
    ["consiga desinfactarlos retornarán a su color original. Para"],
    ["intentar desinfectar un planeta basta con pulsar sobre él."],
    ["Trate de desinfectar el primer planeta enemigo."]
  ]
];

let map_store_texts = [
  [
    ["Tras la batalla volverá a la base para planificar su próximo movimiento."],
    ["Como ve, al salir victorioso el planeta recobra su color original."]
  ],
  [
    ["Pero tenga cuidado, el virus nunca descansa."],
    ["En cada batalla que usted libra, el virus puede intentar recobrar"],
    ["el control de un planeta. Si esto sucede, el planeta volverá"],
    ["a mostrarse en rojo."]
  ],
  [
    ["En cada planeta las batallas serán más duras y los enemigos"],
    ["más resistentes. Para ayudarle en su misión nuestros científicos"],
    ["irán creando nuevas armas y medicinas. Además, tendrá pociones,"],
    ["escudos y bombas para utilizarlas en batalla."]
  ],
  [
    ["Al ganar una batalla, los fondos de su ejército aumentarán."],
    ["Utilice el dinero con cautela para aprovisionarse de consumibles"],
    ["y armas. En la tienda podrá comprar activos y en el inventario"],
    ["decidir qué llevará a su próxima batalla."]
  ],
  [
    ["Dicho esto, larga y própsera vida. Ahora está preparado para"],
    ["enfrentarse al enemigo (porque 5 minutos te preparán para el"],
    [" apocalipsis)."]
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
    ["Los virus suben de nivel con cada planeta. Y con cada nivel "],
    ["su vida aumenta en 1."]
  ],
  [
    ["Para eliminar a un virus, deberá dispararle con su arma."],
    ["Cuidado, los virus pueden lanzarle plasma y hacer que pierda vida."],
    ["Para disparar utilice la barra espaciadora. Intente eliminar a este virus"]
  ],
  [
    ["Este es un pobre ciudadano que sufre los efectos del virus."],
    ["Para curarle dispare una medicina utilizando la tecla C."],
    ["Desinfecte a este pobre hombre."]
  ],
  [
    ["Mucho cuidado, si utiliza un arma sobre un humano o una medicina"],
    ["sobre un virus, mutará y aumentará su nivel (hasta el máximo"],
    ["del planeta) y su vida."]
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
  [  
    ["Enhorabuena, ha derrotado al boss."],
    ["Si pierde todas las vidas o los enemigos alcanzan la parte inferior"],
    ["de la pantalla usted habrá perdido la batalla."]
  ]
];

let dialogs_map_1 = 6;
let dialogs_map_2 = 5;
let dialogs_battle = 9;

export default class Tutorial extends Phaser.Scene {
    constructor() {
      super({ key: "tutorial" });
    }
  
    init(data) {
      this.globalWidth = this.cameras.main.width;
      this.globalHeight = this.cameras.main.height;
    }
  
    preload() {

      this.impactSound = this.sound.add("explosion", Sound.explosion);
      this.damageSound = this.sound.add("damage", Sound.damage);

      this.load.setPath("assets/");
      this.load.image("continue", "sprites/Introduction/continue.png");
      this.load.image("skip", "sprites/Introduction/skip.png");

      this.load.image("container", "container_800x200.png");
      this.load.image("close", "container_close.png");
      this.load.image("ok", "container_ok.png");

      this.load.image("background_map", "sprites/Map/background_map.png");

      //Shop
      this.load.image("shop_btn", "sprites/Shop/logo_shop.png");

      //Inventory
      this.load.image("inventory_btn", "sprites/Shop/logo_inventory.png");

      //Lock
      this.load.image("lock", "sprites/Map/lock.png");

        //Virus
      this.load.spritesheet("planet_1_virus", "sprites/Map/planet_1_virus.png", {
        frameWidth: 50,
        frameHeight: 50,
      });
      this.load.spritesheet("planet_2_virus", "sprites/Map/planet_2_virus.png", {
        frameWidth: 50,
        frameHeight: 50,
      });
      this.load.spritesheet("planet_3_virus", "sprites/Map/planet_3_virus.png", {
        frameWidth: 75,
        frameHeight: 75,
      });
      this.load.spritesheet("planet_4_virus", "sprites/Map/planet_4_virus.png", {
        frameWidth: 50,
        frameHeight: 50,
      });
      this.load.spritesheet("planet_5_virus", "sprites/Map/planet_5_virus.png", {
        frameWidth: 50,
        frameHeight: 50,
      });
      this.load.spritesheet("earth", "sprites/Map/earth.png", {
        frameWidth: 50,
        frameHeight: 50,
      });
      this.load.spritesheet("planet_6_virus", "sprites/Map/planet_6_virus.png", {
        frameWidth: 50,
        frameHeight: 50,
      });
      this.load.spritesheet("planet_7_virus", "sprites/Map/planet_7_virus.png", {
        frameWidth: 100,
        frameHeight: 100,
      });

      //Player
      this.load.spritesheet("planet_1_player", "sprites/Map/planet_1_humans.png", {
        frameWidth: 50,
        frameHeight: 50,
      });
      this.load.spritesheet("planet_2_player", "sprites/Map/planet_2_humans.png", {
        frameWidth: 50,
        frameHeight: 50,
      });
      this.load.spritesheet("planet_3_player", "sprites/Map/planet_3_humans.png", {
        frameWidth: 75,
        frameHeight: 75,
      });
      this.load.spritesheet("planet_4_player", "sprites/Map/planet_4_humans.png", {
        frameWidth: 50,
        frameHeight: 50,
      });
      this.load.spritesheet("planet_5_player", "sprites/Map/planet_5_humans.png", {
        frameWidth: 50,
        frameHeight: 50,
      });
      this.load.spritesheet("earth", "sprites/Map/earth.png", {
        frameWidth: 50,
        frameHeight: 50,
      });
      this.load.spritesheet("planet_6_player", "sprites/Map/planet_6_humans.png", {
        frameWidth: 50,
        frameHeight: 50,
      });
      this.load.spritesheet("planet_7_player", "sprites/Map/planet_7_humans.png", {
        frameWidth: 100,
        frameHeight: 100,
      });

    }
  
    create() {

      this.state = "initial";
      this.mutations = 0;

      aux = this;
      
      this.events.once("player_moved", this.playerMoved);
      this.events.once("killed_virus", this.virus_died);
      this.events.once("cured_human", this.human_cured);
      this.events.once("mutation_virus", this.virus_mutated);
      this.events.once("mutation_human", this.human_mutated);
      this.events.once("boss_fight", this.startBossFight);
      this.cursors =  this.input.keyboard.createCursorKeys();

      this.counter = 0;
      this.texts = map_init_texts;

      this.text = this.add.text(
        30,
        this.cameras.main.height - 170,
        this.texts[this.counter],
        {
          fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
          fontSize: "24px",
        }
      ).setDepth(11);

      let skip = this.add
      .image(this.cameras.main.width - 120, 50, "skip")
      .setDepth(10);
      skip.setInteractive({ cursor: "url(assets/cursors/selector.cur), pointer" });
      skip.on("pointerover", () => {
        skip.setScale(1.1);
      });
      skip.on("pointerout", () => {
        skip.setScale(1);
      });
      skip.on("pointerup", () => {
        this.time.delayedCall(1000, () => {
          this.scene.start("menu");
        });
      });

      this.createBackgroundMap();

      //Create player
      this.inventory = InitialInventory;
      this.equipedInventory = {
        skin: this.inventory["others"].subcategories["skins"].items.find((i) => i.equiped === true),
        weapon: this.inventory["weapons"].subcategories["lasers"].items.find((i) => i.equiped === true),
        shield: this.inventory["consumibles"].subcategories["shields"].items.find((i) => i.equiped === true),
        potion: this.inventory["consumibles"].subcategories["potions"].items.find((i) => i.equiped === true),
        bomb: this.inventory["consumibles"].subcategories["bombs"].items.find((i) => i.equiped === true),
        medicine: this.inventory["weapons"].subcategories["medicines"].items.find((i) => i.equiped === true),
      };
      this.player = new Player(this, this.globalWidth/2, this.globalHeight/2, this.equipedInventory);
      
      //Armas y medicinas
      this.lasers = this.physics.add.group();
      this.medicines = this.physics.add.group();

      //Virus
      this.enemies = this.physics.add.group();
      this.monster = new Virus(this, this.globalWidth/2 - 50, this.globalHeight/3, 1, this.enemies, 2, 0);
      this.monster.setVisible(false);
      this.monster.can_move = false;
      this.monster.setDepth(4);

      //Human
      this.human = new Human(this, this.globalWidth/2 + 50, this.globalHeight/3, 1, this.enemies, 2, 0);
      this.human.setVisible(false);
      this.human.can_move = false;
      this.human.setDepth(4);

      this.physics.add.collider(
        this.enemies,
        this.lasers,
        this.onHit,
        null,
        this
      );
  
      this.physics.add.collider(
        this.enemies,
        this.medicines,
        this.onMedicineHit,
        null,
        this
      );

      this.player.setVisible(false);
      this.player.can_move = false;
      this.player.can_shoot = false;
      this.player.can_cure = false;

      this.container = this.add
      .image(0, this.cameras.main.height - 200, "container")
      .setDepth(10)
      .setOrigin(0, 0);

      this.ok = this.add.image(730, this.cameras.main.height - 70, "ok").setDepth(10).setOrigin(0, 0);
      this.ok.setInteractive({ cursor: "url(assets/cursors/selector.cur), pointer" });
      this.ok.on("pointerup", () => {
        this.counter++;
        console.log("counter = " + this.counter);
        console.log("ok enabled " + this.ok.enabled);
        if (this.counter >= this.texts.length){
          this.ok.input.enabled = false;
          this.setTutorialContainerVisibility(false);
          if (this.texts == map_init_texts){
            this.counter = 0;
            this.texts = battle_texts;
            this.text.setText(this.texts[this.counter]);
            this.planet_1.setInteractive({ cursor: "url(assets/cursors/selector.cur), pointer" });
          }
          else if (this.texts == battle_texts){
            this.counter = 0;
            this.texts = map_store_texts;
            this.text.setText(this.texts[this.counter]);
            this.setPlanetsVisibility(true);
            this.setLocksVisibility(true);
            this.setTutorialContainerVisibility(true);
            this.ok.enabled = true;
            this.lock2.setVisible(false);
            this.planet_1.setTexture("planet_1_player");
            this.ok.input.enabled = true;
          }
          else if (this.texts == map_store_texts){
            this.counter = 0;
            this.scene.start("menu");
          }
        }
        else {
          if (this.texts == battle_texts){
            if (this.counter == 2){
              this.player.can_move = true;
              this.setTutorialContainerVisibility(false);
              this.ok.enabled = false;
            }
            else if (this.counter == 4){
              this.player.can_shoot = true;
              this.setTutorialContainerVisibility(false);
              this.ok.enabled = false;
            }
            else if (this.counter == 5){
              this.player.can_cure = true;
              this.player.can_shoot = false;
              this.setTutorialContainerVisibility(false);
              this.ok.enabled = false;
            }
            else if (this.counter == 6){
              this.player.can_cure = true;
              this.player.can_shoot = true;
              this.setTutorialContainerVisibility(false);
              this.ok.enabled = false;
            }
            else if (this.counter == 8){
              this.setTutorialContainerVisibility(false);
              this.ok.enabled = false;
              this.events.emit("boss_fight");
            }
          }
          this.text.setText(this.texts[this.counter]);
        }
      });
        
    }

    update(){

      if (this.player.x != this.globalWidth/2 || this.player.y != this.globalHeight/2){
        this.events.emit("player_moved");
      }

      this.player.lives = 100;
      
    }

    updateUI() {
     
    }
  
    updateInventory() {
      if (this.equipedInventory.shield)
        this.inventory["consumibles"].subcategories["shields"].items.find(
          (i) => i.equiped === true
        ).quantity = this.equipedInventory.shield.quantity;
      if (this.equipedInventory.potion)
        this.inventory["consumibles"].subcategories["potions"].items.find(
          (i) => i.equiped === true
        ).quantity = this.equipedInventory.potion.quantity;
      if (this.equipedInventory.bomb)
        this.inventory["consumibles"].subcategories["bombs"].items.find(
          (i) => i.equiped === true
        ).quantity = this.equipedInventory.bomb.quantity;
    }

    startBossFight(){
      aux.enemies.getChildren().map(child => child.destroy());
      aux.enemies.getChildren().map(child => child.destroy());
      aux.boss = new Boss(aux, 420, -50, 1);
      aux.boss.setScale(0.25);
      aux.physics.add.collider(
        aux.boss,
        aux.lasers,
        aux.onHitBoss,
        null,
        aux
      );
      aux.boss.life = 10;
    }

    
    onHitBoss(boss, laser) {
      laser.destroy();
      this.impactSound.play();
      this.boss.recieveDamage(1);
      if (this.boss.life > 0) {
        this.boss.setTexture(this.boss.damage_image);
        this.time.delayedCall(100, () => {
          this.boss.setTexture(this.boss.image);
        });
      } else {
        this.boss.setTexture(this.boss.death_image);
        this.time.delayedCall(100, () => {
          this.boss.destroy();
          this.setTutorialContainerVisibility(true);
          this.ok.enabled = true;
        });
      }
    }

    playerMoved(){
      aux.setTutorialContainerVisibility(true);
      aux.ok.setInteractive({ cursor: "url(assets/cursors/selector.cur), pointer" });
      aux.monster.setVisible(true);
      aux.state = "kill_virus";
    }
    virus_died(){
      aux.state = "cure_human";
      aux.time.delayedCall(1000, () => {
        aux.human.setVisible(true);
      });
      aux.setTutorialContainerVisibility(true);
      aux.ok.enabled = true;
      aux.player.can_shoot = false;
    }
    human_cured(){
      aux.state = "mutations";

      aux.player.can_shoot = true;

      aux.monster = new Virus(aux, aux.globalWidth/2 - 50, aux.globalHeight/3, 1, aux.enemies, 2, 0);
      aux.monster.can_move = false;
      aux.monster.setDepth(4);
      aux.human = new Human(aux, aux.globalWidth/2 + 50, aux.globalHeight/3, 1, aux.enemies, 2, 0);
      aux.human.can_move = false;
      aux.human.setDepth(4);
    }
    virus_mutated(){
      aux.mutations++;
      if(aux.mutations == 2){
        aux.setTutorialContainerVisibility(true);
        aux.ok.enabled = true;
      }
    }
    human_mutated(){
      aux.mutations++;
      if(aux.mutations == 2){
        aux.setTutorialContainerVisibility(true);
        aux.ok.enabled = true;
      }
    }
  
    startBattleTutorial(){

      this.state = "init_battle";

      let map_visibility = false;

      this.background.setVisible(map_visibility);
    
      this.setLocksVisibility(map_visibility);
      this.setPlanetsVisibility(map_visibility);

      this.shopButton.setVisible(map_visibility);
      this.inventoryButton.setVisible(map_visibility);

      
      this.setTutorialContainerVisibility(true);
      this.ok.setInteractive({ cursor: "url(assets/cursors/selector.cur), pointer" });
    
      this.player.setVisible(true);

    }  

    setLocksVisibility(visibility){
      this.lock2.setVisible(visibility);
      this.lock3.setVisible(visibility);
      this.lock4.setVisible(visibility);
      this.lock5.setVisible(visibility);
      this.lock6.setVisible(visibility);
      this.lock7.setVisible(visibility);
    }

    setPlanetsVisibility(visibility){
      this.planet_1.setVisible(visibility);
      this.planet_2.setVisible(visibility);
      this.planet_3.setVisible(visibility);
      this.planet_4.setVisible(visibility);
      this.planet_5.setVisible(visibility);
      this.planet_6.setVisible(visibility);
      this.planet_7.setVisible(visibility);
      this.earth.setVisible(visibility);
    }

    setTutorialContainerVisibility(visibility){
      this.container.setVisible(visibility);
      this.ok.setVisible(visibility);
      this.text.setVisible(visibility);
    }

    
    createBackgroundMap(){

      //Shop

      this.shopButton = this.add
        .image((this.globalWidth / 10) * 8, this.globalHeight / 9, "shop_btn")
        .setDepth(3)
        .setScale(0.3);


      //Inventory
      this.inventoryButton = this.add
        .image(
          (this.globalWidth / 10) * 8,
          this.globalHeight / 5,
          "inventory_btn"
        )
        .setDepth(3)
        .setScale(0.3);
        

        this.background = this.add
        .image(this.globalWidth / 2, this.globalHeight / 2, "background_map")
        .setDepth(1)
        .setScale(2.5);

      this.planet_1 = this.physics.add.sprite(
        this.globalWidth / 3,
        (this.globalHeight / 9) * 2,
        "planet_1_virus"
      );
      this.planet_1.setDepth(2);
      this.planet_1.setVisible(true);

      this.planet_2 = this.physics.add.sprite(
        this.globalWidth / 2,
        (this.globalHeight / 9) * 3,
        "planet_2_virus"
      );
      this.planet_2.setDepth(2);

      this.planet_3 = this.physics.add.sprite(
        this.globalWidth / 5,
        (this.globalHeight / 9) * 4,
        "planet_3_virus"
      );
      this.planet_3.setDepth(2);

      this.planet_4 = this.physics.add.sprite(
        this.globalWidth / 2,
        (this.globalHeight / 9) * 5,
        "planet_4_virus"
      );
      this.planet_4.setDepth(2);

      this.planet_5 = this.physics.add.sprite(
        (this.globalWidth / 5) * 4,
        (this.globalHeight / 9) * 6,
        "planet_5_virus"
      );
      this.planet_5.setDepth(2);

      this.planet_6 = this.physics.add.sprite(
        (this.globalWidth / 5) * 3,
        (this.globalHeight / 9) * 7,
        "planet_6_virus"
      );
      this.planet_6.setDepth(2);

      this.planet_7 = this.physics.add.sprite(
        this.globalWidth / 3,
        (this.globalHeight / 9) * 8,
        "planet_7_virus"
      );
      this.planet_7.setDepth(2).setScale(2);

      this.earth = this.physics.add.sprite(
        this.globalWidth / 2,
        this.globalHeight / 9,
        "earth"
      );
      this.earth.setDepth(2);

      this.planet_1.on("pointerover", () => {
        this.planet_1.setScale(1.25);
      });
      this.planet_1.on("pointerout", () => {
        this.planet_1.setScale(1);
      });
      this.planet_1.on("pointerup", () => {
        this.startBattleTutorial();
      });

      this.lock2 = this.physics.add
        .sprite(this.planet_2.x, this.planet_2.y, "lock")
        .setDepth(5)
        .setScale(1.5);

      this.lock3 = this.physics.add
      .sprite(this.planet_3.x, this.planet_3.y, "lock")
      .setDepth(5)
      .setScale(2);

      this.lock4 = this.physics.add
        .sprite(this.planet_4.x, this.planet_4.y, "lock")
        .setDepth(5)
        .setScale(1.5);

      this.lock5 = this.physics.add
        .sprite(this.planet_5.x, this.planet_5.y, "lock")
        .setDepth(5)
        .setScale(1.5);

      this.lock6 = this.physics.add
        .sprite(this.planet_6.x, this.planet_6.y, "lock")
        .setDepth(5)
        .setScale(1.5);

      this.lock7 = this.physics.add
        .sprite(this.planet_7.x, this.planet_7.y, "lock")
        .setDepth(5)
        .setScale(4);
    
    }

    onMedicineHit(enemy, medicine) {
      medicine.destroy();
      if (this.state == "kill_virus"){
        medicine.destroy();
      }
      else if (this.state == "cure_human"){
        if (enemy.type == "virus"){
          medicine.destroy();
        }
        else {
          this.impactSound.play();
          medicine.destroy();
          enemy.medicine_hit(medicine);
          this.setTutorialContainerVisibility(true);
          this.ok.enabled = true;
          this.events.emit("cured_human");
        }
      }
      else if (this.state == "mutations"){
        if (enemy.type == "virus"){
          this.impactSound.play();
          medicine.destroy();
          enemy.medicine_hit(medicine);
          this.events.emit("mutation_virus");
        }
        else {
          medicine.destroy();
        }
      }
    }
  
    onHit(enemy, laser) {
      laser.destroy();
      if (this.state == "kill_virus"){
        if (enemy.type == "virus"){
          this.impactSound.play();
          laser.destroy();
          enemy.weapon_hit(laser);
          this.events.emit("killed_virus");
        }
        else {
          laser.destroy();
        }
      }
      else if (this.state == "cure_human"){
        laser.destroy();
      }
      else if (this.state == "mutations"){
        if (enemy.type == "virus"){
          laser.destroy();
        }
        else {
          this.impactSound.play();
          laser.destroy();
          enemy.weapon_hit(laser);
          this.events.emit("mutation_human");
        }
      }
    }

    addMedicine(medicine) {
      this.medicine = medicine;
      this.medicine.addGroup(this.medicines);
    }
  }
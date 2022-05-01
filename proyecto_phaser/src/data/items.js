import Attack from "../attacks/factory/attacks_enum.js";

const items = {
    lasers: {
        basic_laser: {
            name: "Laser",
            attack: Attack.Weapon1,
            desc: "Dispara 1 laser ( 1 de daño )",
            img: "basic_laser",
            scale: 500,
        },
        double_laser: {
            name: "Laser doble",
            attack: Attack.Weapon2,
            desc: "Dispara dos lasers ( 1 daño cada uno )",
            img: "double_laser",
            scale: 500,
        }
    },
    medicines: {
        
    }, 
    potions: {
        basic_potion: {
            name: "Pocion basica",
            quantity: 0,
            health: 1,
            desc: "Cura 1 punto de vida",
            img: "basic_potion",
            scale: 225,
        },
        advanced_potion: {
            name: "Pocion avanzada",
            quantity: 0,
            health: 3,
            desc: "Cura 5 puntos de vida",
            img: "advanced_potion",
            scale: 225,
        },
        holy_potion: {
            name: "Pocion superior",
            quantity: 0,
            health: 10,
            desc: "Cura 10 puntos de vida",
            img: "holy_potion",
            scale: 225,    
        }
    },
    bombs: {

    }, 
    shields: {

    },
    skins: {
        player_1: {
            name: "Soldado",
            sprite: "player_1",
        },
        player_2: {
            name: "Cientifico",
            sprite: "player_2",
        },
        player_3: {
            name: "No se",
            sprite: "player_3",
        }
    }
}

export default items;
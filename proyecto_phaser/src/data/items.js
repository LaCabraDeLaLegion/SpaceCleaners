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
        mask: {
            name: "Mascarilla",
            desc: "Cura 1 punto de vida a humanos",
            img: "mask",
            damage: 1,
            scale: 225,
        },
        pill: {
            name: "Pastilla",
            desc: "Cura 3 puntos de vida a humanos",
            img: "tablet",
            damage: 3,
            scale: 225,
        },
        gel: {
            name: "Gel desinfectante",
            desc: "Cura 5 puntos de vida a humanos",
            img: "gel",
            damage: 5,
            scale: 225,
        },
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
        basic_bomb: {
            name: "Bomba basica",
            quantity: 0,
            damage: 5,
            speed: 1,
            range: 100,
            desc: "1 punto de daño de area",
            img: "basic_bomb",
            scale: 225,
        },
    }, 
    shields: {
        basic_shield: {
            name: "Escudo basico",
            quantity: 0,
            time: 200,
            desc: "Inmunidad al daño durante 4 segundos",
            img: "basic_shield",
            scale: 225,
        },
    },
    skins: {
        player_1: {
            name: "Soldado",
            desc: "Velocidad +0",
            img: "skin1",
            scale: 425,
            sprite: "player_1",
        },
        player_2: {
            name: "Cientifico",
            desc: "Velocidad +1",
            img: "skin2",
            scale: 425,
            sprite: "player_2",
        },
        player_3: {
            name: "Equipo de cuarentena",
            desc: "Velocidad +2",
            img: "skin3",
            scale: 425,
            sprite: "player_3",
        }
    }
}

export default items;
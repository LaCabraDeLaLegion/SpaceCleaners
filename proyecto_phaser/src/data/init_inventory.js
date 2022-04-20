import Attack from "../attacks/factory/attacks_enum.js";

const inventory = {
    consumibles: {
      name: "Consumibles",
      subcategories: {
        potions: {
            name: "Pociones",
            items: []
        },
        bombs: {
            name: "Bombas",
            items: []
        },
        shields: {
            name: "Escudos",
            items: []
        },
      },
    },
    weapons: {
      name: "Armas",
      subcategories: {
        lasers: {
            name: "Lasers",
            items: [
                {
                    name: "Laser",
                    attack: Attack.Weapon1,
                    desc: "Dispara 1 laser ( 1 de daño )",
                    img: "basic_laser",
                    scale: 500,
                    equiped: true
                }
            ]
        },
        medicines: {
            name: "Medicinas",
            items: []
        }
      },
    },
    others: {
      name: "Otros",
      subcategories: {
        skins: {
            name: "Skins",
            items: [
                {
                    name: "Soldado",
                    sprite: "player_1",
                    equiped: true 
                }
            ]
        },   
      }
    },
    money: 9999
  };

  export default inventory;
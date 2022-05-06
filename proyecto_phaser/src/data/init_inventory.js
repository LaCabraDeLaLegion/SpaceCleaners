import Attack from "../attacks/factory/attacks_enum.js";
import Items from "./items.js";

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
              {...Items.lasers["basic_laser"], equiped: true }
            ]
        },
        medicines: {
            name: "Medicinas",
            items: [
              {...Items.medicines["mask"], equiped: true }
            ]
        }
      },
    },
    others: {
      name: "Otros",
      subcategories: {
        skins: {
            name: "Skins",
            items: [
              {...Items.skins["skin1"], equiped: true }
            ]
        },   
      }
    },
    money: 9999
  };

  export default inventory;
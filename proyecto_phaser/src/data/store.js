import Attack from "../attacks/factory/attacks_enum.js";
import Items from "./items.js";

const store = {
  consumibles: {
    name: "Consumibles",
    subcategories: {
     potions: {
        name: "Pociones",
        items: [
          {
            info: Items.potions["basic_potion"],
            rebuy: true,
            price: 10,
            page: 1,
          },
          {
            info: Items.potions["advanced_potion"],
            rebuy: true,
            price: 40,
            page: 1,
          },
          {
            info: Items.potions["holy_potion"],
            rebuy: true,
            price: 150,
            page: 1,
          },
        ],
        num_pages: 1,
      },
      bombs: {
        name: "Bombas",
        items: [
          {
            info: Items.bombs["basic_bomb"],
            rebuy: true,
            price: 150,
            page: 1,
          }
        ],
        num_pages: 1,
      },
      shields: {
        name: "Escudos",
        items: [
          {
            info: Items.shields["basic_shield"],
            rebuy: true,
            price: 150,
            page: 1,
          }
        ],
        num_pages: 1,
      }
    }
  },
  weapons: {
    name: "Armas",
    subcategories: {
      lasers: {
        name: "Lasers",
        items: [
          {
            info: Items.lasers["double_laser"],
            rebuy: false,
            price: 10,
            page: 1,
          }
        ],
        num_pages: 1,
      },
      medicines: {
        name: "Medicinas",
        items: [
          {
            info: Items.medicines["pill"],
            rebuy: false,
            price: 500,
            page: 1,
          },
          {
            info: Items.medicines["gel"],
            rebuy: false,
            price: 1000,
            page: 1,
          }
        ],
        num_pages: 1,
      },
    }
  },
  others: {
    name: "Otros",
    subcategories: {}
  }
};

export default store;

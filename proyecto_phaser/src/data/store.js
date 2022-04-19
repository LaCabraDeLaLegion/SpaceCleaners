import Attack from "../attacks/factory/attacks_enum.js";

const store = {
  potions: {
    items: [
      {
        info: {
          name: "Pocion basica",
          quantity: 0,
          health: 1,
          desc: "Cura 1 punto de vida",
          img: "basic_potion",
          scale: 200,
        },
        rebuy: true,
        price: 10,
        page: 1,
      },
      {
        info: {
          name: "Pocion avanzada",
          quantity: 0,
          health: 3,
          desc: "Cura 5 puntos de vida",
          img: "advanced_potion",
          scale: 200,
        },
        rebuy: true,
        price: 40,
        page: 1,
      },
      {
        info: {
          name: "Pocion superior",
          quantity: 0,
          health: 10,
          desc: "Cura 10 puntos de vida",
          img: "holy_potion",
          scale: 200,
        },
        rebuy: true,
        price: 150,
        page: 1,
      },
    ],
    num_pages: 1,
  },
  weapons: {
    items: [
      {
        info: {
          name: "Laser doble",
          attack: Attack.Weapon2,
          desc: "Dispara dos lasers ( 1 daño cada uno )",
          img: "double_laser",
          scale: 500,
        },
        rebuy: false,
        price: 10,
        page: 1,
      }
    ],
    num_pages: 1,
  },
};

export default store;

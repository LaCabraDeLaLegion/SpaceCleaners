const store = {
  potions: {
    items: [
      {
        info: {
          name: "Basic Potion",
          quantity: 0,
          health: 1,
          desc: "Recovers 1 point of health",
          img: "basic_potion",
        },
        price: 10,
        page: 1,
        maxQuantity: 3,
      },
      {
        info: {
          name: "Advanced Potion",
          quantity: 0,
          health: 3,
          desc: "Recovers 5 point of health",
          img: "advanced_potion",
        },
        price: 40,
        page: 1,
        maxQuantity: 3,
      },
      {
        info: {
          name: "Holy Potion",
          quantity: 0,
          health: 10,
          desc: "Recovers 10 point of health",
          img: "holy_potion",
        },
        price: 150,
        page: 1,
        maxQuantity: 3,
      },
    ],
    num_pages: 1,
  },
  weapons: {
    items: [
      {
        info: {
          name: "Double Laser",
          quantity: 0,
          health: 1,
          desc: "Throw two lasers (Write the damage...)",
          img: "double_laser",
        },
        price: 10,
        page: 1,
        maxQuantity: 3,
      }
    ],
    num_pages: 1,
  },
};

export default store;

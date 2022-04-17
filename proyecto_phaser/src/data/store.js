const store = {
  potions: {
    items: [
      {
        info: { name: "Basic Potion", quantity: 0, health: 1 },
        desc: "Recovers 1 point of health",
        price: 10,
        page: 1,
        img: "basic_potion",
        maxQuantity: 3,
      },
      {
        info: { name: "Advanced Potion", quantity: 0, health: 3 },
        desc: "Recovers 5 point of health",
        price: 40,
        page: 1,
        img: "advanced_potion",
        maxQuantity: 3,
      },
      {
        info: { name: "Holy Potion", quantity: 0, health: 10 },
        desc: "Recovers 10 point of health",
        price: 150,
        page: 1,
        img: "holy_potion",
        maxQuantity: 3,
      },
    ],
    num_pages: 1,
  },
  weapons: {
    items: [
      {
        info: { name: "Arma 1", quantity: 0, health: 1 },
        desc: "Coming soon",
        price: 10,
        page: 1,
        img: "item2",
        maxQuantity: 3,
      },
      {
        info: { name: "Arma 2", quantity: 0, health: 5 },
        desc: "Coming soon",
        price: 100,
        page: 1,
        img: "item2",
        maxQuantity: 3,
      },
    ],
    num_pages: 1,
  },
};

export default store;

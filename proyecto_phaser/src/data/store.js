const store = {
  medicines: {
    items: [
      {
        info: { name: "Basic Medicine", quantity: 0, health: 1 },
        desc: "Recovers 1 point of health",
        price: 10,
        page: 1,
        img: "item1",
        maxQuantity: 3,
      },
      {
        info: { name: "Advanced Medicine", quantity: 0, health: 5 },
        desc: "Recovers 5 point of health",
        price: 100,
        page: 1,
        img: "item1",
        maxQuantity: 3,
      },
      {
        info: { name: "Holy Medicine", quantity: 0, health: 10 },
        desc: "Recovers 10 point of health",
        price: 1000,
        page: 1,
        img: "item1",
        maxQuantity: 3,
      },
      {
        info: { name: "Immunity Medicine", quantity: 0, health: 10 },
        desc: "Gives 5 seconds of immunity",
        price: 1000,
        page: 2,
        img: "item1",
        maxQuantity: 3,
      },
    ],
    num_pages: 2,
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

import Attack from "../attacks/factory/attacks_enum.js";

const virus_data = {
  data: [
    {},
    {
      key: "V1",
      name: "virus_1",
      lives: 1,
      attackTime: 20,
      attack: Attack.BasicAttack,
    },
    {
      key: "V2",
      name: "virus_2",
      lives: 2,
      attackTime: 20,
      attack: Attack.BasicAttack2,
    },
    {
      key: "V3",
      name: "virus_3",
      lives: 3,
      attackTime: 20,
      attack: Attack.BasicAttack3,
    },
    {
      key: "V4",
      name: "virus_4",
      lives: 4,
      attackTime: 20,
      attack: Attack.BasicAttack4,
    },
    {
      key: "V5",
      name: "virus_5",
      lives: 5,
      attackTime: 20,
      attack: Attack.BasicAttack5,
    },
    {
      key: "V6",
      name: "virus_6",
      lives: 6,
      attackTime: 20,
      attack: Attack.BasicAttack6,
    },
  ],
};

export default virus_data;

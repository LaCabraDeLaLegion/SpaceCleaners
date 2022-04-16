const projectiles = {
  slash: {
    name: "slash",
    damage: 3,
    sprite: "",
    sound: {
      mute: false,
      volume: 0.2,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    },
    velocityX: 2,
    velocityY: 6,
    angle: 10
  },
  super_slash: {
    name: "super_slash",
    damage: 4,
    sprite: "",
    sound: {
      mute: false,
      volume: 0.2,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    },
    velocityX: 2,
    velocityY: 6,
    angle: 12
  },
  plasma: {
    name: "plasma",
    damage: 1,
    sprite: "",
    sound: "",
    velocityX: 1,
    velocityY: 1,
    angle:0
  },
  super_plasma: {
    name: "super_plasma",
    damage: 2,
    sprite: "",
    sound: "",
    velocityX: 1,
    velocityY: 1,
    angle:0
  },
};

export default projectiles;


const player_skins = ["player_1", "player_2", "player_3"];
const enemy_virus = ["virus_1", "virus_2", "virus_3", "virus_4", "virus_5", "virus_6"];
const enemy_humans = ["human_1", "human_2", "human_3", "human_4", "human_5", "human_6",]

export default class Anim_Factory {
  
  static player_spritesheets(scene, skin) {

    for (let i = 1; i <= player_skins.length; i++) {
      if (skin === player_skins[i-1]) {
        scene.load.spritesheet(`player_${i}`, `sprites/Players/player_${i}.png`, {
          frameWidth: 50,
          frameHeight: 50,
        });
        scene.load.spritesheet(`player_${i}_damage`, `sprites/Players/player_${i}_damage.png`, {
          frameWidth: 50,
          frameHeight: 50,
        });
        scene.load.spritesheet(`player_${i}_heal`, `sprites/Players/player_${i}_heal.png`, {
          frameWidth: 50,
          frameHeight: 50,
        });
        scene.load.spritesheet(`player_${i}_shield`, `sprites/Players/player_${i}_shield.png`, {
          frameWidth: 50,
          frameHeight: 50,
        });
      }
    }

  }
  
  static player_anims(scene, skin) {

    for (let i = 1; i <= player_skins.length; i++) {
      if (skin === player_skins[i-1]) {
        scene.anims.create({
          key: `player_walk_${i}`,
          frames: scene.anims.generateFrameNumbers(`player_${i}`),
          frameRate: 5,
          repeat: -1,
        });
        scene.anims.create({
          key: `player_walk_${i}_damage`,
          frames: scene.anims.generateFrameNumbers(`player_${i}_damage`),
          frameRate: 5,
          repeat: 20,
        });
        scene.anims.create({
          key: `player_walk_${i}_heal`,
          frames: scene.anims.generateFrameNumbers(`player_${i}_heal`),
          frameRate: 5,
          repeat: 200,
        });
        scene.anims.create({
          key: `player_walk_${i}_shield`,
          frames: scene.anims.generateFrameNumbers(`player_${i}_shield`),
          frameRate: 5,
          repeat: -1,
        });
      }
    }
  }

  static virus_spritesheets(scene, virus) {

    for (let i = 1; i <= enemy_virus.length; i++) {
      if (virus === enemy_virus[i-1]) {
        scene.load.spritesheet(`V${i}`, `sprites/Virus/V${i}.png`, {
          frameWidth: 50,
          frameHeight: 50,
        });
        scene.load.spritesheet(`V${i}_damage`, `sprites/Virus/V${i}_damage.png`, {
          frameWidth: 50,
          frameHeight: 50,
        });
        scene.load.spritesheet(`V${i}_death`, `sprites/Virus/V${i}_death.png`, {
          frameWidth: 70,
          frameHeight: 70,
        });
      }
    }
  }

  static virus_anims(scene, virus) {

    for (let i = 1; i <= enemy_virus.length; i++) {
      if (virus === enemy_virus[i-1]) {
        scene.anims.create({
          key: `virus_${i}`,
          frames: scene.anims.generateFrameNumbers(`V${i}`),
          frameRate: 5,
          repeat: -1,
        });
        scene.anims.create({
          key: `virus_${i}_damage`,
          frames: scene.anims.generateFrameNumbers(`V${i}_damage`),
          frameRate: 15,
          repeat: 0,
        });
        scene.anims.create({
          key: `virus_${i}_death`,
          frames: scene.anims.generateFrameNumbers(`V${i}_death`),
          frameRate: 20,
          repeat: 0,
        });
      }
    }
  }
  

  static humans_spritesheets(scene, human) {

    for (let i = 1; i <= enemy_humans.length; i++) {
      if (human === enemy_humans[i-1]) {
        scene.load.spritesheet(`H${i}`, `sprites/Humans/H${i}.png`, {
          frameWidth: 50,
          frameHeight: 50,
        });
      }
    }

  }

  static humans_anims(scene, human) {

    for (let i = 1; i <= enemy_humans.length; i++) {
      if (human === enemy_humans[i-1]) {
        scene.anims.create({
          key: `human_walk_${i}`,
          frames: scene.anims.generateFrameNumbers(`H${i}`),
          frameRate: 5,
          repeat: -1,
        });
      }
    }
  }

}
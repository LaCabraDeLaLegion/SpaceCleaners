import virus_data from "../data/virus_data.js";
import humans_data from "../data/humans_data.js";

const player_skins = ["player_1", "player_2", "player_3"];
const enemy_virus = virus_data.data;
const enemy_humans = humans_data.data;

export default class Anim_Factory {
  
  static player_spritesheets(scene, skin) {

    let find = false;
    for (let i = 0; i < player_skins.length && !find; i++) {
      if (skin === player_skins[i]) {
        find = true;
        scene.load.spritesheet(player_skins[i], `sprites/Players/${player_skins[i]}.png`, {
          frameWidth: 50,
          frameHeight: 50,
        });
        scene.load.spritesheet(`${player_skins[i]}_damage`, `sprites/Players/${player_skins[i]}_damage.png`, {
          frameWidth: 50,
          frameHeight: 50,
        });
        scene.load.spritesheet(`${player_skins[i]}_heal`, `sprites/Players/${player_skins[i]}_heal.png`, {
          frameWidth: 50,
          frameHeight: 50,
        });
        scene.load.spritesheet(`${player_skins[i]}_shield`, `sprites/Players/${player_skins[i]}_shield.png`, {
          frameWidth: 50,
          frameHeight: 50,
        });
      }
    }

    if (!find)
      throw new Error("No se ha encontrado la skin: " + skin);

  }
  
  static player_anims(scene, skin) {

    for (let i = 0; i < player_skins.length; i++) {
      if (skin === player_skins[i]) {
        scene.anims.create({
          key: `${player_skins[i]}_walk`,
          frames: scene.anims.generateFrameNumbers(player_skins[i]),
          frameRate: 5,
          repeat: -1,
        });
        scene.anims.create({
          key: `${player_skins[i]}_walk_damage`,
          frames: scene.anims.generateFrameNumbers(`${player_skins[i]}_damage`),
          frameRate: 5,
          repeat: 20,
        });
        scene.anims.create({
          key: `${player_skins[i]}_walk_heal`,
          frames: scene.anims.generateFrameNumbers(`${player_skins[i]}_heal`),
          frameRate: 5,
          repeat: 200,
        });
        scene.anims.create({
          key: `${player_skins[i]}_walk_shield`,
          frames: scene.anims.generateFrameNumbers(`${player_skins[i]}_shield`),
          frameRate: 5,
          repeat: -1,
        });
      }
    }
  }

  static virus_spritesheets(scene, virus) {

    let find = false;
    for (let level = 1; level < enemy_virus.length && !find; level++) {
      if (virus === enemy_virus[level].name) {
        find = true;
        scene.load.spritesheet(`${enemy_virus[level].key}`, `sprites/Virus/${enemy_virus[level].key}/${enemy_virus[level].key}.png`, {
          frameWidth: 50,
          frameHeight: 50,
        });
        scene.load.spritesheet(`${enemy_virus[level].key}_damage`, `sprites/Virus/${enemy_virus[level].key}/${enemy_virus[level].key}_damage.png`, {
          frameWidth: 50,
          frameHeight: 50,
        });
        scene.load.spritesheet(`${enemy_virus[level].key}_death`, `sprites/Virus/${enemy_virus[level].key}/${enemy_virus[level].key}_death.png`, {
          frameWidth: 70,
          frameHeight: 70,
        });
      }
    }

    if (!find) 
      throw new Error("No se ha podido crear el virus: " + virus)
  }

  static virus_anims(scene, virus) {

    for (let level = 1; level < enemy_virus.length; level++) {
      if (virus === enemy_virus[level].name) {
        scene.anims.create({
          key: `${enemy_virus[level].name}_walk`,
          frames: scene.anims.generateFrameNumbers(`${enemy_virus[level].key}`),
          frameRate: 5,
          repeat: -1,
        });
        scene.anims.create({
          key: `${enemy_virus[level].name}_damage`,
          frames: scene.anims.generateFrameNumbers(`${enemy_virus[level].key}_damage`),
          frameRate: 15,
          repeat: 0,
        });
        scene.anims.create({
          key: `${enemy_virus[level].name}_death`,
          frames: scene.anims.generateFrameNumbers(`${enemy_virus[level].key}_death`),
          frameRate: 20,
          repeat: 0,
        });
      }
    }

  }
  

  static humans_spritesheets(scene, human) {

    let find = false;
    for (let level = 1; level < enemy_humans.length && !find; level++) {
      if (human === enemy_humans[level].name) {
        find = true;
        scene.load.spritesheet(`${enemy_humans[level].key}`, `sprites/Humans/${enemy_humans[level].key}/${enemy_humans[level].key}.png`, {
          frameWidth: 50,
          frameHeight: 50,
        });
        scene.load.spritesheet(`${enemy_humans[level].key}_heal`, `sprites/Humans/${enemy_humans[level].key}/${enemy_humans[level].key}_heal.png`, {
          frameWidth: 50,
          frameHeight: 50,
        });
        scene.load.spritesheet(`${enemy_humans[level].key}_healed`, `sprites/Humans/${enemy_humans[level].key}/${enemy_humans[level].key}_healed.png`, {
          frameWidth: 50,
          frameHeight: 50,
        });
      }
    }

    if (!find)
      throw new Error("No se ha podido crear el humano: " + human)

  }

  static humans_anims(scene, human) {

    for (let level = 1; level < enemy_humans.length; level++) {
      if (human === enemy_humans[level].name) {
        scene.anims.create({
          key: `${enemy_humans[level].name}_walk`,
          frames: scene.anims.generateFrameNumbers(`${enemy_humans[level].key}`),
          frameRate: 5,
          repeat: -1,
        });
        scene.anims.create({
          key: `${enemy_humans[level].name}_heal`,
          frames: scene.anims.generateFrameNumbers(`${enemy_humans[level].key}_heal`),
          frameRate: 15,
          repeat: 0,
        });
        scene.anims.create({
          key: `${enemy_humans[level].name}_healed`,
          frames: scene.anims.generateFrameNumbers(`${enemy_humans[level].key}_healed`),
          frameRate: 15,
          repeat: 0,
        });
      }
    }
  }

}
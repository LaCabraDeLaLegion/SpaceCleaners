
const player_skins = ["player_1", "player_2", "player_3"];

export default class Anim_Factory {
  
  static player_spritesheets(scene, skin) {

    let find = false;
    for (let i = 0; i < player_skins.length && !find; i++) {
      if (skin === player_skins[i]) {
        find = true;
        scene.load.spritesheet(skin, `sprites/Players/${skin}.png`, {
          frameWidth: 50,
          frameHeight: 50,
        });
        scene.load.spritesheet(`${skin}_damage`, `sprites/Players/${skin}_damage.png`, {
          frameWidth: 50,
          frameHeight: 50,
        });
        scene.load.spritesheet(`${skin}_heal`, `sprites/Players/${skin}_heal.png`, {
          frameWidth: 50,
          frameHeight: 50,
        });
        scene.load.spritesheet(`${skin}_shield`, `sprites/Players/${skin}_shield.png`, {
          frameWidth: 50,
          frameHeight: 50,
        });
      }
    }

    if (!find)
      throw new Error("No se ha encontrado la skin: " + skin);

  }
  
  static player_anims(scene, skin) {

      scene.anims.create({
        key: `${skin}_walk`,
        frames: scene.anims.generateFrameNumbers(skin),
        frameRate: 5,
        repeat: -1,
      });
      scene.anims.create({
        key: `${skin}_walk_damage`,
        frames: scene.anims.generateFrameNumbers(`${skin}_damage`),
        frameRate: 5,
        repeat: 20,
      });
      scene.anims.create({
        key: `${skin}_walk_heal`,
        frames: scene.anims.generateFrameNumbers(`${skin}_heal`),
        frameRate: 5,
        repeat: 200,
      });
      scene.anims.create({
        key: `${skin}_walk_shield`,
        frames: scene.anims.generateFrameNumbers(`${skin}_shield`),
        frameRate: 5,
        repeat: -1,
      });

  }

  static virus_spritesheets(scene, virus) {

    scene.load.spritesheet(`${virus.key}`, `sprites/Virus/${virus.key}/${virus.key}.png`, {
      frameWidth: 50,
      frameHeight: 50,
    });
    scene.load.spritesheet(`${virus.key}_damage`, `sprites/Virus/${virus.key}/${virus.key}_damage.png`, {
      frameWidth: 50,
      frameHeight: 50,
    });
    scene.load.spritesheet(`${virus.key}_death`, `sprites/Virus/${virus.key}/${virus.key}_death.png`, {
      frameWidth: 70,
      frameHeight: 70,
    });
      
  }


  static virus_anims(scene, virus) {

    scene.anims.create({
      key: `${virus.name}_walk`,
      frames: scene.anims.generateFrameNumbers(`${virus.key}`),
      frameRate: 5,
      repeat: -1,
    });
    scene.anims.create({
      key: `${virus.name}_damage`,
      frames: scene.anims.generateFrameNumbers(`${virus.key}_damage`),
      frameRate: 15,
      repeat: 0,
    });
    scene.anims.create({
      key: `${virus.name}_death`,
      frames: scene.anims.generateFrameNumbers(`${virus.key}_death`),
      frameRate: 20,
      repeat: 0,
    });

  }
  

  static humans_spritesheets(scene, human) {

    scene.load.spritesheet(`${human.key}`, `sprites/Humans/${human.key}/${human.key}.png`, {
      frameWidth: 50,
      frameHeight: 50,
    });
    scene.load.spritesheet(`${human.key}_heal`, `sprites/Humans/${human.key}/${human.key}_heal.png`, {
      frameWidth: 50,
      frameHeight: 50,
    });
    scene.load.spritesheet(`${human.key}_healed`, `sprites/Humans/${human.key}/${human.key}_healed.png`, {
      frameWidth: 50,
      frameHeight: 50,
    });
    
  }

  static humans_anims(scene, human) {

    scene.anims.create({
      key: `${human.name}_walk`,
      frames: scene.anims.generateFrameNumbers(`${human.key}`),
      frameRate: 5,
      repeat: -1,
    });
    scene.anims.create({
      key: `${human.name}_heal`,
      frames: scene.anims.generateFrameNumbers(`${human.key}_heal`),
      frameRate: 15,
      repeat: 0,
    });
    scene.anims.create({
      key: `${human.name}_healed`,
      frames: scene.anims.generateFrameNumbers(`${human.key}_healed`),
      frameRate: 15,
      repeat: 0,
    });
      
  }

}
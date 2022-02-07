var config = {
    type: Phaser.CANVAS,
    width: 320,
    height: 200,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    console.log("Hola wenas, preload");
}

function create ()
{
}

function update ()
{
}
let config = {
    type: Phaser.CANVAS,
    render: {
        pixelArt: true
    },
    width: 320,
    height: 240,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    zoom: 2,
    scene: [ Menu, ApeBattle, UIScene1, StationBattle, UIScene2, ObeliskBattle, UIScene3, Intermission1, Intermission2, EndScene ]
}

const game = new Phaser.Game(config);
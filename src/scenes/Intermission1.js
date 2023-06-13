class Menu extends Phaser.Scene {
    constructor() {
        super("Intermission");
    }

    preload() {

    }

    create() {
        this.scene.start('stationBattleScene');
    }

    update() {

    }
}
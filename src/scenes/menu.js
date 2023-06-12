class Menu extends Phaser.Scene {
    constructor() {
        super("Menu");
    }

    preload() {

    }

    create() {
        this.scene.start('stationBattleScene');
    }

    update() {

    }
}
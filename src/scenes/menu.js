class Menu extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }

    preload() {

    }

    create() {
        this.scene.start('stationBattleScene');
    }

    update() {

    }
}
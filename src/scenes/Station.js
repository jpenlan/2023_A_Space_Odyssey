class StationBattle extends Phaser.Scene{
    constructor() {
        super('stationBattleScene');
    }

    preload() {
        
    }

    create() {
        this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
        this.scene.launch('UIScene');
    }

    update() {
        
    }
}

class UIScene extends Phaser.Scene{
    constructor() {
        super('UIScene');
    }

    preload() {

    }

    create() {
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(1, 0xffffff);
        this.graphics.fillStyle(0x031f4c, 1);        
        this.graphics.strokeRect(2, 150, 90, 100);
        this.graphics.fillRect(2, 150, 90, 100);
        this.graphics.strokeRect(95, 150, 90, 100);
        this.graphics.fillRect(95, 150, 90, 100);
        this.graphics.strokeRect(188, 150, 130, 100);
        this.graphics.fillRect(188, 150, 130, 100);
    }

    update() {

    }
}
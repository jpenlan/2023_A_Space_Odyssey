class Intermission1 extends Phaser.Scene {
    constructor() {
        super("Intermission1Scene");
    }

    preload() {
        this.load.image('intermission', './assets/intermission.png');
    }

    create() {
        this.cameras.main.fadeIn(1000,10,20,30);
        this.bg1 = this.add.tileSprite(0, 0, 320, 240, 'intermission').setOrigin(0, 0);
        this.time.delayedCall(5000, () =>{
            this.cameras.main.fadeOut(1000,10,20,30);
            this.scene.start('stationBattleScene');
        });
        
    }

    update() {

    }
}
class EndScene extends Phaser.Scene {
    constructor() {
        super("EndScene");
    }

    preload() {
        this.load.image('starEnd', './assets/starEnd.png');
        this.load.audio('intro', './assets/main_music.mp3');
    }

    create() {
        this.sound.play('intro', { volume: 0.3, repeat: -1});
        this.cameras.main.fadeIn(1000,10,20,30);
        this.bg1 = this.add.tileSprite(0, 0, 320, 240, 'starEnd').setOrigin(0, 0);
        this.time.delayedCall(5000, () =>{
            this.sound.stop('intro');
            this.scene.start('MenuScene');
        });
        
    }

    update() {

    }
}
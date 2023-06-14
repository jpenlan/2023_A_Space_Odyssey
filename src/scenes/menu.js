class Menu extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }

    preload() {
        this.load.image('Menu', './assets/Menu.png');
        this.load.audio('intro', './assets/main_music.mp3');
        this.load.audio('select', './assets/select.mp3');
    }

    create() {
        this.cameras.main.fadeIn(1000,10,20,30);
        this.sound.play('intro', { volume: 0.7, repeat: -1});
        this.bg1 = this.add.tileSprite(0, 0, 320, 240, 'Menu').setOrigin(0, 0);

         this.input.keyboard.on('keydown-SPACE', () => {
            // Stop menu music when SPACE is pressed
            this.sound.play('select', { volume: 0.5 });
            this.cameras.main.fadeOut(1000,10,20,30,);
                this.time.delayedCall(1000, () =>{
                    this.sound.pauseAll('intro');
                    this.scene.start('apeScene');
                });
        }); 
    }

    update() {

    }
}
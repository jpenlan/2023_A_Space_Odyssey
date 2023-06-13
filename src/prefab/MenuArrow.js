// Code format derived from gamedevacademy.org
class MenuArrow extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.setScale(0.5);
    }

    
}
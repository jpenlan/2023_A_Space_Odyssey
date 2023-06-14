// Code format derived from gamedevacademy.org
class MenuItem extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text) {
        super(scene, x, y, text, { color: '#ffffff', align: 'left', fontSize: 11});
    }

    select() {
        this.setColor('#f8ff38');
    }

    deselect() {
        this.setColor('#ffffff');
    }
}
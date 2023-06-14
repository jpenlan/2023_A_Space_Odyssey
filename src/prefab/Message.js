class Message extends Phaser.GameObjects.Container {
    constructor(scene, events) {
        super(scene, 160, 30);
        this.graphics = this.scene.add.graphics();
        this.add(this.graphics);
        this.graphics.lineStyle(1, 0xffffff, 0.8);
        this.graphics.fillStyle(0x031f4c, 0.3);
        this.graphics.strokeRect(-90, -15, 180, 30);
        this.graphics.fillRect(-90, -15, 180, 30);
        this.text = new Phaser.GameObjects.Text(scene, 0, 0, "", { color: '#ffffff', align: 'center', fontSize: 12, wordWrap: { width: 160, useAdvancedWrap: true }});
        this.add(this.text);
        this.text.setOrigin(0.5);      

        // Scene 1 Messages
        events.on("Attack_Message", this.showMessage, this);
        events.on("Attack2_Message", this.showMessage, this);
        events.on("Intimidate_Message", this.showMessage, this);
        events.on("Rally_Message", this.showMessage, this);
        
        // Scene 2 Messages
        events.on("Combat_Message", this.showMessage, this);
        events.on("Combat2_Message", this.showMessage, this);
        events.on("Exterminate_Message", this.showMessage, this);
        events.on("Think_Message", this.showMessage, this);
        events.on("Death_Message", this.showMessage, this);

        // Scene 3 Messages
        events.on("Resist_Message", this.showMessage, this);
        events.on("Obelisk1_Message", this.showMessage, this);
        events.on("Obelisk2_Message", this.showMessage, this);
        events.on("Gaze_Message", this.showMessage, this);
        events.on("Blink_Message", this.showMessage, this);
        events.on("Transcend_Message", this.showMessage, this);
        events.on("Death2_Message", this.showMessage, this);
        this.visible = false;
    }

    create() {
        
    }

    showMessage(text) {
        this.text.setText(text);
        this.visible = true;
        if(this.hideEvent) {
            this.hideEvent.remove(false);
        }
        this.hideEvent = this.scene.time.addEvent({ delay: 2000, callback: this.hideMessage, callbackScope: this });
    }

    hideMessage() {
        this.hideEvent = null;
        this.visible = false;
    }
}
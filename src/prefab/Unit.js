// Code format derived from gamedevacademy.org
class Unit extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, type, hp, damage) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.type = type;
        this.maxHP = this.hp = hp;
        this.damage = damage;
        this.alive = true;
    }

    create() {

    }

    attack(target) {
        target.takeDamage(this.damage);
        if(target.hp > 0 && target.type == 'HAL') {
            this.scene.events.emit("Combat_Message", this.type + " interrogates " + target.type + " for " + this.damage + " damage");
        } else if (target.hp > 0 && (target.type == 'David' || target.type == 'Frank')) {
            this.scene.events.emit("Combat2_Message", this.type + " degrades " + target.type + " for " + this.damage + " damage");
        } else if (target.hp <= 0) {
            this.scene.events.emit("Death_Message", target.type + " has died!")
        }
    }

    ELIMINATE(target) {
        target.hp = 0;
        target.alive = false;
        this.scene.events.emit("Exterminate_Message", this.type + " ELIMINATES " + target.type)
    }

    think() {
        this.damage *= 1.5;
        this.damage = Math.floor(this.damage);
        this.scene.events.emit("Think_Message", this.type + " recollects their thoughts.");
    }
    
    takeDamage(damage) {
        this.hp -= damage;
        if(this.hp <= 0) {
            this.hp = 0;
            this.alive = false;
        }
        if (!this.alive) {
            this.scene.events.emit("Death_Message", this.type + " has died!")
            this.destroy();
        }
    }

}

class Enemy extends Unit {
    constructor(scene, x, y, texture, frame, type, hp, damage) {
        super(scene, x, y, texture, frame, type, hp, damage)
    }
}

class PlayerCharacter extends Unit {
    constructor(scene, x, y, texture, frame, type, hp, damage) {
        super(scene, x, y, texture, frame, type, hp, damage)
    }
}



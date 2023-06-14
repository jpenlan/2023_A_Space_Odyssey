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

    // Scene 1 Actions
    attack(target) {
        target.takeDamage(this.damage);
        if(target.hp > 0 && target instanceof PlayerCharacter) {
            console.log('test');
            this.scene.events.emit("Attack_Message", this.type + " claws " + target.type + " for " + this.damage + " damage");
        } else if (target.hp > 0 && target instanceof Enemy) {
            this.scene.events.emit("Attack2_Message", this.type + " clubs " + target.type + " for " + this.damage + " damage");
        } else if (target.hp <= 0) {
            this.scene.events.emit("Death_Message", target.type + " has died!")
        }
    }

    intimidate(target1, target2, target3) {
        if (target1 != null && target2 != null && target3 != null) {
            target1.damage /= 1.2;
            target2.damage /= 1.2;
            target3.damage /= 1.2;
            target1.damage = Math.floor(target1.damage);
            target2.damage = Math.floor(target2.damage);
            target3.damage = Math.floor(target3.damage);
        }
        else if (target1 != null && target2 != null) {
            target1.damage /= 1.2;
            target2.damage /= 1.2;
            target1.damage = Math.floor(target1.damage);
            target2.damage = Math.floor(target2.damage);
        }
        else if (target1 != null) {
            target1.damage /= 1.2;
            target1.damage = Math.floor(target1.damage);
        }
        this.scene.events.emit("Intimidate_Message", this.type + " screeches at the enemy apes.");
    }

    rally(target1, target2, target3) {
        target1.hp += 2;
        target2.hp += 2;
        target3.hp += 2;
        target1.damage += 2;
        target2.damage += 2;
        target3.damage += 2;
        this.scene.events.emit("Rally_Message", this.type + " rallies their group.");
    }

    // Scene 2 Actions
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

    question(target) {
        target.takeDamage(this.damage);
        if(target.hp > 0 && target.type == 'HAL') {
            this.scene.events.emit("Combat_Message", this.type + " interrogates " + target.type + " for " + this.damage + " damage");
        } else if (target.hp > 0 && (target.type == 'David' || target.type == 'Frank')) {
            this.scene.events.emit("Combat2_Message", this.type + " degrades " + target.type + " for " + this.damage + " damage");
        } else if (target.hp <= 0) {
            this.scene.events.emit("Death_Message", target.type + " has died!")
        }
    }

    // Scene 3 Actions
    resist(target) {
        if(target.hp > 0 && target.type == 'Obelisk') {
            target.takeDamage(this.damage);
            this.scene.events.emit("Resist_Message", this.type + " resists. \n The Obelisk takes " + this.damage + " damage.");
        } else if (target.hp < 50 && target.type == 'David' ) {
            target.Age(this.damage);
            this.scene.events.emit("Obelisk1_Message", "The " + this.type + " ages " + target.type + " by " + this.damage + " years.");
        } else if (target.hp < 150 && target.type == 'David' ) {
            target.Age(this.damage);
            this.scene.events.emit("Obelisk2_Message", "The " + this.type + " evolves " + target.type + " by " + this.damage + " years.");
        } else if (target.hp >= 150) {
            target.Age(this.damage);
            this.scene.events.emit("Transcend_Message", target.type + " has accepted their fate.")
        }
    }


    gaze(target) {
        target.damage *= 1.5;
        target.damage = Math.floor(target.damage);
        this.scene.events.emit("Gaze_Message", this.type + " is in awe of the Obelisk.");
    }

    blink(target) {
        this.Age(target.damage)
        this.scene.events.emit("Blink_Message", "Time passes. David ages by " + target.damage + " years.");
    }
    
    takeDamage(damage) {
        this.hp -= damage;
        if(this.hp <= 0) {
            this.hp = 0;
            this.alive = false;
        }
        if (!this.alive) {
            this.scene.events.emit("Death_Message", this.type + " has died!")
            this.setVisible(false);
        }
    }

    Age(damage) {
        this.hp += damage;
        if(this.hp >= 150) {
            this.hp = 150;
            this.alive = false;
        }
        if (!this.alive) {
            this.scene.events.emit("Death2_Message", this.type + " has transcended!")
            this.setVisible(false);
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



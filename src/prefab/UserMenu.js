// Code structure derived from gamedevacademy.org
class UserMenu extends Phaser.GameObjects.Container {
    constructor(scene, x, y, characters) {
     // Initializes the menu variables
        super(scene, x, y);
        this.menuItems = [];
        this.menuItemIndex = 0;
        this.characters = characters;
        this.x = x;
        this.y = y;
        this.confirmItem = 0;
    }
    
    // Pushes a menu item onto the stack (items)
    addMenuItem(unit) {
        this.menuItem = new MenuItem(this.scene, 0, this.menuItems.length * 20, unit);
        this.menuItems.push(this.menuItem);
        this.add(this.menuItem);
    }

    // Moves item index backward, moving it up the list
    moveSelectorUp() {
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex--; 
        if (this.menuItemIndex < 0) {
            this.menuItemIndex = this.menuItems.length - 1;
        }
        this.menuItems[this.menuItemIndex].select();
    }

    // Moves item index foward, moving it down the list
    moveSelectorDown() {
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex++;
        if(this.menuItemIndex >= this.menuItems.length) {
            this.menuItemIndex = 0;
        }
        this.menuItems[this.menuItemIndex].select();
    }

    // Governs what item is currently selected, almost like a state machine
    select(index) {
        if(!index) {
            index = 0;
        }
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex = index;
        this.menuItems[this.menuItemIndex].select();
    }

    // Ran in select. Deselects the current item index.
    deselect() {
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex = 0;
    }

    confirm() {
        // Placeholder (meant to be replaced later)
    }

    clear() {
        for(var i = 0; i < this.menuItems.length; i++) {
            this.menuItems[i].destroy();
        }
        this.menuItems.length = 0;
        this.menuItemIndex = 0;
    }

    remap(units) {
        this.clear();
        for(var i = 0; i < units.length; i++) {
            this.unit = units[i];
            this.addMenuItem(this.unit.type + " | HP: " + this.unit.hp);
        }
    }

}

// Menu class for the player characters
class PlayerMenu extends UserMenu {
    constructor(scene, x, y) {
        super(scene, x, y);
    }

    remapCharScene3(units) {
        this.clear();
        for(var i = 0; i < units.length; i++) {
            this.unit = units[i];
            this.addMenuItem(this.unit.type + " | Age: " + this.unit.hp);
        }
    }
}

// Menu class for the player actions
class ActionMenu extends UserMenu {
    constructor(scene, x, y) {
        super(scene, x, y);

    }

    remapAction(actions) {
        this.clear();
        for(var i = 0; i < actions.length; i++) {
            this.action = actions[i];
            this.addMenuItem(this.action);
        }
    }

    confirm() {
        console.log(this.menuItemIndex);
        console.log(this.menuItems[1].text);

        if (this.menuItems[this.menuItemIndex].text == 'Attack') { // Scene 1
            console.log('1');
            this.scene.events.emit("SelectEnemies", this.menuItemIndex);
        }
        else if (this.menuItems[this.menuItemIndex].text == 'Intimidate') { // Scene 1
            console.log('4');
            this.scene.events.emit("commitIntimidate", this.menuItemIndex);
        }
        else if (this.menuItems[this.menuItemIndex].text == 'Rally') { // Scene 1
            console.log('4');
            this.scene.events.emit("commitRally", this.menuItemIndex);
        }

        if (this.menuItems[this.menuItemIndex].text == 'Question') { // Scene 2
            console.log('1');
            this.scene.events.emit("SelectEnemies", this.menuItemIndex);
        }
        else if (this.menuItems[this.menuItemIndex].text == 'Think') { // Scene 2
            console.log('4');
            this.scene.events.emit("commitThink", this.menuItemIndex);
        }

        else if (this.menuItems[this.menuItemIndex].text == 'Resist') { // Scene 3
            this.scene.events.emit("SelectEnemies", this.menuItemIndex);
        }
        else if (this.menuItems[this.menuItemIndex].text == 'Gaze') { // Scene 3
            console.log('2');
            this.scene.events.emit("commitGaze", this.menuItemIndex);
        }
        else if (this.menuItems[this.menuItemIndex].text == 'Blink') { // Scene 3
            this.scene.events.emit("commitBlink", this.menuItemIndex);
        }
    }
}


// Menu class for the enemy selection
class EnemyMenu extends UserMenu {
    constructor(scene, x, y) {
        super(scene, x, y);
    }

    remapEnemScene3(units) {
        this.clear();
        for(var i = 0; i < units.length; i++) {
            this.unit = units[i];
            this.addMenuItem(this.unit.type + "\nHP: " + this.unit.hp);
        }
    }

    confirm() {
        this.scene.events.emit("Enemy", this.menuItemIndex);
    }
}
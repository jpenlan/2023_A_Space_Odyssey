class StationBattle extends Phaser.Scene{
    constructor() {
        super('stationBattleScene');
    }

    preload() {
        this.load.audio('music', './assets/ominous.mp3');
        this.load.image('HAL', 'assets/HAL-9000.png');
        this.load.image('HAL_background1', './assets/HAL_background.png');
        this.load.image('HAL_background2', './assets/HAL_background2.png');
    }

    create() {
        this.sound.play('music', { volume: 0.3, repeat: -1});
        this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.5)');
        // Add background
        this.bg1 = this.add.tileSprite(0, 0, 320, 240, 'HAL_background2').setOrigin(0, 0);
        this.bg2 = this.add.tileSprite(0, 0, 320, 240, 'HAL_background1').setOrigin(0, 0);
        this.bg3 = this.add.tileSprite(0, 30, 320, 240, 'HAL_background1').setOrigin(0, 0);

        // Instantiate characters in scene 2
        this.hal9000 = new Enemy(this, game.config.width / 2, 75, 'HAL', 0, 'HAL', 60, 5);
        this.david = new PlayerCharacter(this, -100, -100, null, 0, 'David', 25, 5);
        this.frank = new PlayerCharacter(this, -100, -100, null, 0, 'Frank', 25, 5);

        this.characters = [ this.david, this.frank ];
        this.enemies = [ this.hal9000 ];

        this.units = this.characters.concat(this.enemies);

        this.scene.launch('UIScene');

        this.action = 0;

        this.index = -1;

        this.uiScene = this.scene.get('UIScene');

    }

    update() {
        this.bg1.tilePositionX -= 2;
        this.bg2.tilePositionX -= 3;
        this.bg3.tilePositionX -= 4;
    }

    nextTurn() {
        console.log(this.units);
        this.index++;
        if(this.index >= this.units.length){
            this.index = 0;
        }
        if(this.units[this.index]) {
            if(this.units[this.index] instanceof PlayerCharacter) { 
                this.events.emit('PlayerSelect', this.index);
            } else {
                if (this.units[this.index].type == 'HAL' && this.units[this.index].hp <= 30 && this.units.length == 3) {
                    this.units[this.index].ELIMINATE(this.characters[1]);
                    this.characters.splice(1, 1);
                    this.units.splice(1, 1);
                    this.uiScene.remapCharacters();
                    this.uiScene.remapEnemies();
                    this.time.addEvent({ delay: 2000, callback: this.nextTurn, callbackScope: this});
                } else {
                    this.r = Math.floor(Math.random() * this.characters.length);
                    this.units[this.index].attack(this.characters[this.r]);
                    this.time.addEvent({ delay: 2000, callback: this.nextTurn, callbackScope: this});
                }
            }
        }

        // console.log(this.david.hp);
        // console.log(this.hal9000.hp);
    }

    receivePlayerSelection(action, target) {
        if(action == 'question') {
            this.units[this.index].attack(this.enemies[target]);
        }
        if(action == 'think') {
            this.units[this.index].think();
        }
        this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this});
    }
}

class UIScene extends Phaser.Scene {
    constructor() {
        super('UIScene');
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

        this.menus = this.add.container();

        this.charactersMenu = new PlayerMenu(this, 195, 153);
        this.actionsMenu = new ActionMenu(this, 100, 153);
        this.enemiesMenu = new EnemyMenu(this, 8, 153);

        this.currentMenu = this.actionsMenu;

        this.menus.add(this.charactersMenu);
        this.menus.add(this.actionsMenu);
        this.menus.add(this.enemiesMenu);

        this.battleScene = this.scene.get('stationBattleScene');

        this.remapCharacters();
        this.remapEnemies();

        this.input.keyboard.on('keydown', this.onKeyInput, this);

        this.battleScene.events.on("PlayerSelect", this.onPlayerSelect, this);

        this.events.on("SelectEnemies", this.onSelectEnemies, this);

        this.events.on("Enemy", this.onEnemy, this);

        this.events.on("commitThink", this.commitThink, this);

        this.message = new Message(this, this.battleScene.events);
        this.add.existing(this.message);

        this.battleScene.nextTurn();
    }

    onEnemy(index) {
        
        this.battleScene.receivePlayerSelection('question', index);
        this.charactersMenu.deselect();
        this.actionsMenu.deselect();
        this.enemiesMenu.deselect();
        this.currentMenu = null;
    }

    commitThink() {
        this.battleScene.receivePlayerSelection('think', null);
        this.charactersMenu.deselect();
        this.actionsMenu.deselect();
        this.enemiesMenu.deselect();
        this.currentMenu = null;
    }

    onSelectEnemies() {
        this.currentMenu = this.enemiesMenu;
        this.enemiesMenu.select(0);
    }

    onPlayerSelect(id) {
        this.charactersMenu.select(id);
        this.actionsMenu.select(0);
        this.currentMenu = this.actionsMenu;
    }

    onKeyInput(event) {
        if(this.currentMenu) {
            if(event.code === 'ArrowUp') {
                this.currentMenu.moveSelectorUp();
            } 
            else if(event.code === 'ArrowDown') {
                this.currentMenu.moveSelectorDown();
            }
            else if(event.code === 'ArrowRight' || event.code === 'Shift') {
                 
            }
            else if(event.code === 'Space') {
                this.currentMenu.confirm();
            }
        }
    }

    remapCharacters() {
        this.characters = this.battleScene.characters;
        this.charactersMenu.remap(this.characters);
    }

    remapEnemies() {
        this.enemies = this.battleScene.enemies;
        this.enemiesMenu.remap(this.enemies);
    }
}
class ApeBattle extends Phaser.Scene{
    constructor() {
        super('apeScene');
    }

    preload() {
        this.load.audio('music', './assets/ominous.mp3');
        this.load.image('ape', 'assets/ape.png');
        this.load.image('desert', './assets/desertBG.png');
        this.load.image('desert2', './assets/desertBG2.png');
        this.load.audio('select', './assets/select.mp3');
        this.load.audio('hit', './assets/hit.mp3');
    }

    create() {
        this.sound.play('music', { volume: 0.3, repeat: -1});
        this.cameras.main.setBackgroundColor('#a95e2c');
        this.cameras.main.fadeIn(1000,10,20,30);
        // Add background
        this.bg1 = this.add.tileSprite(0, 0, 320, 240, 'desert').setOrigin(0, 0);
        this.bg2 = this.add.tileSprite(0, 15, 320, 240, 'desert2').setOrigin(0, 0).setAlpha(0.7);
        this.bg3 = this.add.tileSprite(0, -10, 320, 240, 'desert').setOrigin(0, 0).setAlpha(0.5);


        // Instantiate characters in scene 2
        this.ApeE1 = new Enemy(this, 60, 75, 'ape', 0, 'Ape', 20, 10).setScale(0.5);
        this.ApeE2 = new Enemy(this, game.config.width / 2, 75, 'ape', 0, 'Ape', 20, 10).setScale(0.7);
        this.ApeE3 = new Enemy(this, game.config.width - 60, 75, 'ape', 0, 'Ape', 20, 10).setScale(0.5);
        this.ApeP1 = new PlayerCharacter(this, -100, -100, null, 0, 'Ape', 25, 5);
        this.ApeP2 = new PlayerCharacter(this, -100, -100, null, 0, 'Ape', 25, 5);
        this.ApeP3 = new PlayerCharacter(this, -100, -100, null, 0, 'Ape', 25, 5);

        this.actions = [ 'Attack', 'Intimidate', 'Rally' ];
        this.characters = [ this.ApeP1, this.ApeP2, this.ApeP3 ];
        this.enemies = [ this.ApeE1, this.ApeE2, this.ApeE3 ];

        this.units = this.characters.concat(this.enemies);

        this.scene.launch('UIScene1');

        this.action = 0;

        this.index = -1;

        this.uiScene = this.scene.get('UIScene1');

    }

    update() {
        this.bg1.tilePositionX -= 2;
        this.bg2.tilePositionX -= 4;
        this.bg3.tilePositionX -= 6;


        if (this.ApeE3.hp <= 0 && this.ApeE2.hp <= 0 && this.ApeE1.hp <= 0) {
            this.time.delayedCall(1200, () =>{
                this.cameras.main.fadeOut(1000,10,20,30);
            });
            this.time.delayedCall(2400, () =>{
                this.sound.pauseAll();
                this.scene.start('Intermission1Scene');
                this.uiScene.scene.setVisible(false);
                this.scene.destroy('UIScene1');
            });
        }
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
                    this.r = Math.floor(Math.random() * this.characters.length);
                    this.units[this.index].attack(this.characters[this.r]);
                    this.cameras.main.shake(500)
                    this.sound.play('hit', { volume: 0.9 });
                    this.uiScene.remapCharacters();
                    this.uiScene.remapEnemies();
                    this.time.addEvent({ delay: 2000, callback: this.nextTurn, callbackScope: this});
            }
        }

        // console.log(this.david.hp);
        // console.log(this.hal9000.hp);
    }

    receivePlayerSelection(action, target) {
        if(action == 'attack') {
            this.units[this.index].attack(this.enemies[target]);
            this.sound.play('hit', { volume: 0.9 });
            if (this.enemies[target].hp <= 0) {
                this.cameras.main.flash();
                console.log(target);
                this.enemies.splice(target, 1);
                this.units = this.characters.concat(this.enemies);
            }
            this.uiScene.remapCharacters();
            this.uiScene.remapEnemies();
        }
        if(action == 'intimidate') {
            if (this.enemies.length == 3) {
                this.units[this.index].intimidate(this.enemies[0], this.enemies[1], this.enemies[2]);
            }
            else if (this.enemies.length == 2) {
                this.units[this.index].intimidate(this.enemies[0], this.enemies[1], null);
            }
            else if (this.enemies.length == 1) {
                this.units[this.index].intimidate(this.enemies[0], null, null);
            }
            this.uiScene.remapCharacters();
            this.uiScene.remapEnemies();
        }
        if(action == 'rally') {
            this.units[this.index].rally(this.characters[0], this.characters[1], this.characters[2]);
            this.uiScene.remapCharacters();
            this.uiScene.remapEnemies();
        }
        this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this});
    }
}

class UIScene1 extends Phaser.Scene {
    constructor() {
        super('UIScene1');
    }

    preload() {
        this.load.spritesheet('selectArrow', './assets/selectArrow.png', {frameWidth: 24, frameHeight: 20, startFrame: 0, endFrame: 1});
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

        // Animation config
        this.anims.create({
            key: 'select',
            frames: this.anims.generateFrameNumbers('selectArrow', { start: 0, end: 1, first: 0}),
            frameRate: 2.5,
            repeat: -1
        })

        this.menus.add(this.charactersMenu);
        this.menus.add(this.actionsMenu);
        this.menus.add(this.enemiesMenu);

        this.battleScene = this.scene.get('apeScene');

        this.remapCharacters();
        this.remapEnemies();
        this.remapActions();

        this.selector = new MenuArrow(this, 86, 160, 'selectArrow', 0).setScale(0.35);
        this.selector.anims.play('select');
        this.selector.setVisible(false);


        this.input.keyboard.on('keydown', this.onKeyInput, this);

        this.battleScene.events.on("PlayerSelect", this.onPlayerSelect, this);

        this.events.on("SelectEnemies", this.onSelectEnemies, this);

        this.events.on("Enemy", this.onEnemy, this);

        this.events.on("commitIntimidate", this.commitIntimidate, this);

        this.events.on("commitRally", this.commitRally, this);

        this.message = new Message(this, this.battleScene.events);
        this.add.existing(this.message);

        this.battleScene.nextTurn();
    }

    onEnemy(index) {
        this.charactersMenu.deselect();
        this.actionsMenu.deselect();
        this.enemiesMenu.deselect();
        this.battleScene.receivePlayerSelection('attack', index);
        this.currentMenu = null;
        this.selector.setVisible(false);
    }

    commitIntimidate() {
        this.battleScene.receivePlayerSelection('intimidate');
        this.charactersMenu.deselect();
        this.actionsMenu.deselect();
        this.enemiesMenu.deselect();
        this.currentMenu = null;
    }

    commitRally() {
        this.battleScene.receivePlayerSelection('rally', null);
        this.charactersMenu.deselect();
        this.actionsMenu.deselect();
        this.enemiesMenu.deselect();
        this.currentMenu = null;
    }

    onSelectEnemies() {
        this.currentMenu = this.enemiesMenu;
        this.enemiesMenu.select(0);
        this.selector.y = 160;
        this.selector.setVisible(true);
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
                if (this.selector.y == 160 && this.enemies.length == 3) {
                    this.selector.y = 200;
                }
                else if (this.selector.y == 160 && this.enemies.length == 2) {
                    this.selector.y = 180;
                }
                else if (this.selector.y == 160 && this.enemies.length == 1) {
                    this.selector.y = 160;
                }
                else {
                    this.selector.y -= 20;
                }
            } 
            else if(event.code === 'ArrowDown') {
                this.currentMenu.moveSelectorDown();
                if (this.selector.y == 200 && this.enemies.length == 3) {
                    this.selector.y = 160;
                }
                else if (this.selector.y == 180 && this.enemies.length == 2) {
                    this.selector.y = 160;
                }
                else if (this.selector.y == 160 && this.enemies.length == 1) {
                    this.selector.y = 160;
                }
                else {
                    this.selector.y += 20;
                }
            }
            else if(event.code === 'ArrowRight' || event.code === 'Shift') {
                 
            }
            else if(event.code === 'Space') {
                this.currentMenu.confirm();
                this.sound.play('select', { volume: 0.5 });
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

    remapActions() {
        this.actions = this.battleScene.actions;
        this.actionsMenu.remapAction(this.actions);
    }
}
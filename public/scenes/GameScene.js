import Player from '../entities/Player.js';
import Enemy from '../entities/Enemy.js';
import HUD from '../ui/HUD.js';
import config from '../config.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    init(data) {
        this.playerClass = data.class || 'Commando';
        this.difficulty = data.difficulty || 'Normal';
    }

    create() {
        this.timeLeft = 120;
        this.gameOver = false;

        this.createPlatforms();
        this.player = new Player(this, 100, 450, this.playerClass);

        // Pass difficulty to Enemy
        this.enemy = new Enemy(this, 600, 300, this.platforms, this.difficulty);

        this.bullets = this.physics.add.group();
        this.setupBulletCollisions();

        this.hud = new HUD(this);

        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: this.updateTimer,
            callbackScope: this
        });

        // Input for shooting now uses player's weapon
        this.input.on('pointerdown', (pointer) => {
            if (this.player.isAlive && this.player.weapon) {
                this.player.weapon.shoot(pointer);
            }
        });
    }

    createPlatforms() {
        this.platforms = this.physics.add.staticGroup();

        const ground = this.add.rectangle(500, 580, 1000, 20, config.platformColor);
        this.physics.add.existing(ground, true);
        this.platforms.add(ground);

        const platformPositions = [
            { x: 200, y: 450 },
            { x: 600, y: 350 },
            { x: 400, y: 200 }
        ];
        platformPositions.forEach(pos => {
            const p = this.add.rectangle(pos.x, pos.y, 100, 20, config.platformColor);
            this.physics.add.existing(p, true);
            this.platforms.add(p);
        });
    }

    setupBulletCollisions() {
        this.physics.add.collider(this.bullets, this.platforms, (bullet) => bullet.destroy());
    }

    update() {
        if (!this.gameOver) {
            this.player.update();
            this.enemy.update();
            this.hud.update(this.player.kills, this.player.deaths, this.timeLeft);

            this.bullets.children.each((bullet) => {
                if (bullet.active && (bullet.x < 0 || bullet.x > config.gameWidth || bullet.y < 0 || bullet.y > config.gameHeight)) {
                    bullet.destroy();
                }
            });
        }
    }

    updateTimer() {
        if (this.gameOver) return;
        this.timeLeft--;
        if (this.timeLeft <= 0) {
            this.endGame();
        }
    }

    endGame() {
        this.gameOver = true;
        this.physics.pause();
        this.input.off('pointerdown');
        this.scene.start('GameOverScene', { player: this.player, enemy: this.enemy, settings: { class: this.playerClass, difficulty: this.difficulty } });
    }
}

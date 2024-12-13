import Player from '../entities/Player.js';
import Enemy from '../entities/Enemy.js';
import HUD from '../ui/HUD.js';
import config from '../config.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        this.timeLeft = 120;
        this.gameOver = false;

        this.createPlatforms();
        this.player = new Player(this, 100, 450);
        this.enemy = new Enemy(this, 600, 300, this.platforms);

        this.bullets = this.physics.add.group();
        this.setupBulletCollisions();

        this.hud = new HUD(this);

        // Timer event
        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: this.updateTimer,
            callbackScope: this
        });

        // Shooting input
        this.input.on('pointerdown', this.handleShoot, this);
    }

    createPlatforms() {
        this.platforms = this.physics.add.staticGroup();

        const ground = this.add.rectangle(500, 580, 1000, 20, config.platformColor);
        this.physics.add.existing(ground, true);
        this.platforms.add(ground);

        const platformPositions = [
            {x: 200, y: 450}, 
            {x: 600, y: 350},
            {x: 400, y: 200}
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

    handleShoot(pointer) {
        if (!this.player.isAlive) return;

        // Consider moving bullet creation into Player.shoot method later
        const bullet = this.add.circle(this.player.sprite.x, this.player.sprite.y, 5, config.bulletColor);
        this.physics.add.existing(bullet);
        this.bullets.add(bullet);

        const direction = new Phaser.Math.Vector2(
            pointer.x - this.player.sprite.x,
            pointer.y - this.player.sprite.y
        ).normalize();

        bullet.body.setVelocity(direction.x * 1000, direction.y * 1000).setAllowGravity(false);

        this.physics.add.overlap(bullet, this.enemy.sprite, () => {
            bullet.destroy();
            this.enemy.updateHealth(this.enemy.currentHealth - 10);
            if (this.enemy.currentHealth <= 0) {
                this.player.incrementKills();
            }
        });
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
        // Move the end screen logic to a separate GameOverScene or just show overlay and transition:
        this.scene.start('GameOverScene', { player: this.player, enemy: this.enemy });
    }
}

import BaseCharacter from './BaseCharacter.js';
import config from '../config.js';

export default class Enemy extends BaseCharacter {
    constructor(scene, x, y, platforms) {
        super(scene, x, y, 40, 40, config.enemyColor);

        this.platforms = platforms;
        this.scene.physics.add.collider(this.sprite, this.platforms);

        this.leftBound = x - 200;
        this.rightBound = x + 200;
        this.movingRight = true;
        this.speed = 125;

        this.jumpInterval = 2500;
        this.scene.time.addEvent({
            delay: this.jumpInterval,
            loop: true,
            callback: this.jump,
            callbackScope: this
        });

        this.shootInterval = 200;
        this.scene.time.addEvent({
            delay: this.shootInterval,
            loop: true,
            callback: this.shoot,
            callbackScope: this
        });
    }

    shoot() {
        if (!this.isAlive || this.currentHealth <= 0 || !this.scene.player.isAlive || this.scene.gameOver) return;

        const bullet = this.scene.add.circle(this.sprite.x, this.sprite.y, 5, config.bulletColor);
        this.scene.physics.add.existing(bullet);

        const direction = new Phaser.Math.Vector2(
            this.scene.player.sprite.x - this.sprite.x,
            this.scene.player.sprite.y - this.sprite.y
        ).normalize();

        bullet.body.setVelocity(direction.x * 700, direction.y * 700).setAllowGravity(false);

        this.scene.physics.add.overlap(bullet, this.platforms, () => bullet.destroy());
        this.scene.physics.add.overlap(bullet, this.scene.player.sprite, () => {
            bullet.destroy();
            this.scene.player.updateHealth(this.scene.player.currentHealth - 10);
            if (this.scene.player.currentHealth <= 0) {
                this.incrementKills();
            }
        });
    }

    jump() {
        if (this.isAlive && this.sprite.body.blocked.down) {
            this.sprite.body.setVelocityY(-600);
        }
    }

    update() {
        super.update();
        if (this.isAlive) {
            if (this.movingRight) {
                this.sprite.body.setVelocityX(this.speed);
                if (this.sprite.x >= this.rightBound) this.movingRight = false;
            } else {
                this.sprite.body.setVelocityX(-this.speed);
                if (this.sprite.x <= this.leftBound) this.movingRight = true;
            }
        } else {
            this.sprite.body.setVelocityX(0);
        }
    }
}

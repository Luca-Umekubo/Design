import BaseCharacter from './BaseCharacter.js';
import config from '../config.js';

export default class Player extends BaseCharacter {
    constructor(scene, x, y) {
        super(scene, x, y, 40, 40, config.playerColor);

        this.scene.physics.add.collider(this.sprite, this.scene.platforms);

        this.cursors = scene.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            jump: Phaser.Input.Keyboard.KeyCodes.W
        });

        this.regenAmount = 10;
        this.regenInterval = 1500;
        this.damageCooldown = 3000;
        this.lastDamageTime = 0;

        this.regenTimer = scene.time.addEvent({
            delay: this.regenInterval,
            loop: true,
            callback: this.regenerateHealth,
            callbackScope: this
        });
    }

    regenerateHealth() {
        const timeSinceDamage = this.scene.time.now - this.lastDamageTime;
        if (this.isAlive && this.currentHealth < this.maxHealth && timeSinceDamage >= this.damageCooldown) {
            this.updateHealth(Math.min(this.currentHealth + this.regenAmount, this.maxHealth));
        }
    }

    updateHealth(newHealth) {
        const oldHealth = this.currentHealth;
        super.updateHealth(newHealth);
        if (this.currentHealth < oldHealth) {
            this.lastDamageTime = this.scene.time.now;
        }
    }

    update() {
        super.update(); // positions health bar

        if (!this.isAlive) {
            this.sprite.body.setVelocityX(0);
            return;
        }

        if (this.cursors.left.isDown) {
            this.sprite.body.setVelocityX(-320);
        } else if (this.cursors.right.isDown) {
            this.sprite.body.setVelocityX(320);
        } else {
            this.sprite.body.setVelocityX(0);
        }

        if (this.cursors.jump.isDown && this.sprite.body.blocked.down) {
            this.sprite.body.setVelocityY(-800);
        }
    }
}

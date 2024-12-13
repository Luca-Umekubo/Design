import Weapon from './Weapon.js';
import config from '../config.js';

export default class SniperRifle extends Weapon {
    constructor(scene, owner) {
        super(scene, owner);

        // Adjust these values for balancing:
        this.damage = 50;         // Increase or decrease for more or less damage per bullet
        this.reloadTime = 2000;   // Time (ms) to wait before the next shot is available after firing
        this.bulletSpeed = 2000;  // Speed of the bullet. Increase for faster projectile, decrease for slower

        this.isReloading = false;
    }

    canShoot() {
        const now = this.scene.time.now;
        // Checks if not currently reloading and if sufficient time has passed since the last shot
        return !this.isReloading && (now - this.lastShotTime) >= this.reloadTime;
    }

    shoot(pointer) {
        // Prevent shooting if player is dead, can't shoot yet, or currently reloading
        if (!this.owner.isAlive || !this.canShoot()) return;

        this.lastShotTime = this.scene.time.now;
        this.isReloading = true;

        // Create bullet
        const bullet = this.scene.add.circle(this.owner.sprite.x, this.owner.sprite.y, 5, config.bulletColor);
        this.scene.physics.add.existing(bullet);

        // Calculate direction and set bullet velocity
        const direction = new Phaser.Math.Vector2(
            pointer.x - this.owner.sprite.x,
            pointer.y - this.owner.sprite.y
        ).normalize();

        bullet.body.setVelocity(direction.x * this.bulletSpeed, direction.y * this.bulletSpeed).setAllowGravity(false);

        // Bullet collision with enemy
        this.scene.physics.add.overlap(bullet, this.scene.enemy.sprite, () => {
            bullet.destroy();
            this.scene.enemy.updateHealth(this.scene.enemy.currentHealth - this.damage);
            if (this.scene.enemy.currentHealth <= 0) {
                this.owner.incrementKills();
            }
        });

        // Begin reload cycle after firing
        this.scene.time.delayedCall(this.reloadTime, () => {
            this.isReloading = false;
        });
    }
}

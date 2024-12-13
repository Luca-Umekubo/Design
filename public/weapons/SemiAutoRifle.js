import Weapon from './Weapon.js';
import config from '../config.js';

export default class SemiAutoRifle extends Weapon {
    constructor(scene, owner) {
        super(scene, owner);
        this.fireRate = 0;    // no delay needed, fires on every click
        this.reloadTime = 0;  // no reload for commando
        this.damage = 10;
    }

    shoot(pointer) {
        if (!this.owner.isAlive || !this.canShoot()) return;

        this.lastShotTime = this.scene.time.now;

        const bullet = this.scene.add.circle(this.owner.sprite.x, this.owner.sprite.y, 5, config.bulletColor);
        this.scene.physics.add.existing(bullet);
        const direction = new Phaser.Math.Vector2(pointer.x - this.owner.sprite.x, pointer.y - this.owner.sprite.y).normalize();
        bullet.body.setVelocity(direction.x * 1000, direction.y * 1000).setAllowGravity(false);

        // Overlap with enemy
        this.scene.physics.add.overlap(bullet, this.scene.enemy.sprite, () => {
            bullet.destroy();
            this.scene.enemy.updateHealth(this.scene.enemy.currentHealth - this.damage);
            if (this.scene.enemy.currentHealth <= 0) {
                this.owner.incrementKills();
            }
        });
    }
}

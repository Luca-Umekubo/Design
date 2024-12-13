import Weapon from './Weapon.js';
import config from '../config.js';

export default class Shotgun extends Weapon {
    constructor(scene, owner) {
        super(scene, owner);
        
        // You can tweak the damage per pellet and the angle spread here:
        this.damagePerPellet = 10;   // Increase or decrease this for balancing damage
        this.pelletCount = 4;       // Number of pellets per shot
        this.spreadAngle = 4;      // Degrees of spread. Increase for a wider spread, decrease for tighter grouping

        this.magazineSize = 2;      // Number of shots before needing to reload
        this.shotsFired = 0;        // Track how many times we've shot since last reload

        this.reloadTime = 1500;     // Time to reload after the magazine is empty
        this.isReloading = false;
    }

    canShoot() {
        const now = this.scene.time.now;
        
        // You can only shoot if not reloading and haven't emptied the magazine
        return !this.isReloading && this.shotsFired < this.magazineSize;
    }

    shoot(pointer) {
        if (!this.owner.isAlive || !this.canShoot()) return;

        this.lastShotTime = this.scene.time.now;
        this.shotsFired++;  // One shot used from the "magazine"

        const centerDir = new Phaser.Math.Vector2(
            pointer.x - this.owner.sprite.x,
            pointer.y - this.owner.sprite.y
        ).normalize();

        // Fire multiple pellets
        for (let i = 0; i < this.pelletCount; i++) {
            // Adjusting spread
            const angleOffset = (i - (this.pelletCount - 1) / 2) * this.spreadAngle; 
            const rad = Phaser.Math.DegToRad(angleOffset);

            const pelletDirection = new Phaser.Math.Vector2(
                centerDir.x * Math.cos(rad) - centerDir.y * Math.sin(rad),
                centerDir.x * Math.sin(rad) + centerDir.y * Math.cos(rad)
            );

            const pellet = this.scene.add.circle(this.owner.sprite.x, this.owner.sprite.y, 5, config.bulletColor);
            this.scene.physics.add.existing(pellet);
            pellet.body.setVelocity(pelletDirection.x * 900, pelletDirection.y * 900).setAllowGravity(false);

            this.scene.physics.add.overlap(pellet, this.scene.enemy.sprite, () => {
                pellet.destroy();
                this.scene.enemy.updateHealth(this.scene.enemy.currentHealth - this.damagePerPellet);
                if (this.scene.enemy.currentHealth <= 0) {
                    this.owner.incrementKills();
                }
            });
        }

        // If we've reached the magazine limit, trigger reload
        if (this.shotsFired >= this.magazineSize) {
            this.isReloading = true;
            this.scene.time.delayedCall(this.reloadTime, () => {
                this.isReloading = false;
                this.shotsFired = 0; // Reset magazine
            });
        } 
        // If we have not reached the magazine limit, no reload needed,
        // so the player can shoot again immediately.
    }
}

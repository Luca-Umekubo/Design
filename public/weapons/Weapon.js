export default class Weapon {
    constructor(scene, owner) {
        this.scene = scene;
        this.owner = owner; // The player who owns the weapon
        this.lastShotTime = 0;
        this.reloadTime = 0; // Default no reload
        this.fireRate = 0;   // Delay between shots in ms if needed
    }

    canShoot() {
        // Check if enough time passed since last shot and if not reloading
        const now = this.scene.time.now;
        return (now - this.lastShotTime) >= this.fireRate && !this.isReloading;
    }

    shoot(pointer) {
        // Base shoot method - override in subclasses
        console.warn("Base Weapon: shoot() not implemented");
    }

    reload() {
        // Override in subclasses if needed
    }
}

export default class BaseCharacter {
    constructor(scene, x, y, width=40, height=40, color=0xffffff) {
        this.scene = scene;
        this.startX = x;
        this.startY = y;

        this.sprite = scene.add.rectangle(x, y, width, height, color);
        scene.physics.add.existing(this.sprite);
        this.sprite.body.setCollideWorldBounds(true);

        this.maxHealth = 100;
        this.currentHealth = this.maxHealth;
        this.isAlive = true;

        this.kills = 0;
        this.deaths = 0;

        this.healthBarBackground = scene.add.rectangle(x, y - 50, 60, 10, 0x000000);
        this.healthBar = scene.add.rectangle(x, y - 50, 60, 10, color === 0xff0000 ? 0x00ff00 : 0xff0000);
    }

    updateHealth(newHealth) {
        this.currentHealth = Phaser.Math.Clamp(newHealth, 0, this.maxHealth);
        this.healthBar.width = 60 * (this.currentHealth / this.maxHealth);

        if (this.currentHealth <= 0) {
            this.die();
        }
    }

    die() {
        if (!this.isAlive) return;
        this.isAlive = false;
        this.deaths++;
        this.sprite.setVisible(false);
        this.sprite.body.enable = false;
        this.healthBar.setVisible(false);
        this.healthBarBackground.setVisible(false);

        if (!this.scene.gameOver) {
            setTimeout(() => this.respawn(), 5000);
        }
    }

    respawn() {
        if (this.scene.gameOver) return;
        this.sprite.setPosition(this.startX, this.startY);
        this.sprite.setVisible(true);
        this.sprite.body.enable = true;

        this.currentHealth = this.maxHealth;
        this.healthBar.width = 60;
        this.healthBar.setVisible(true);
        this.healthBarBackground.setVisible(true);
        this.isAlive = true;
    }

    incrementKills() {
        this.kills++;
    }

    update() {
        // Common update logic like positioning health bars
        this.healthBar.x = this.sprite.x;
        this.healthBar.y = this.sprite.y - 50;
        this.healthBarBackground.x = this.sprite.x;
        this.healthBarBackground.y = this.sprite.y - 50;
    }
}

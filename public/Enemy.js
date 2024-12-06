class Enemy {
    constructor(scene, x, y, platforms) {
      this.scene = scene;
      this.startX = x;
      this.startY = y;
      this.platforms = platforms;
      
      this.sprite = scene.add.rectangle(x, y, 40, 40, 0x0000ff);
      scene.physics.add.existing(this.sprite);
      this.sprite.body.setCollideWorldBounds(true);
      this.sprite.body.setImmovable(false);
  
      scene.physics.add.collider(this.sprite, platforms);
  
      this.maxHealth = 100;
      this.currentHealth = this.maxHealth;
  
      // Score and death tracking
      this.kills = 0;
      this.deaths = 0;
  
      this.healthBarBackground = scene.add.rectangle(x, y - 50, 60, 10, 0x000000);
      this.healthBar = scene.add.rectangle(x, y - 50, 60, 10, 0xff0000);
  
      this.shootInterval = 2000;
      this.shootTimer = setInterval(() => this.shoot(), this.shootInterval);

      this.isAlive = true;
    }
  
    updateHealth(newHealth) {
      this.currentHealth = Phaser.Math.Clamp(newHealth, 0, this.maxHealth);
      const healthPercentage = this.currentHealth / this.maxHealth;
      this.healthBar.width = 60 * healthPercentage;
  
      if (this.currentHealth <= 0) {
        this.die();
      }
    }
  
    shoot() {
      if (this.currentHealth <= 0 || !this.isAlive) return;
      
      const bullet = this.scene.add.circle(this.sprite.x, this.sprite.y, 5, 0xffff00);
      this.scene.physics.add.existing(bullet);
      
      const direction = new Phaser.Math.Vector2(
        player.sprite.x - this.sprite.x,
        player.sprite.y - this.sprite.y
      ).normalize();
      
      const speed = 600;
      bullet.body.setVelocity(direction.x * speed, direction.y * speed);
      bullet.body.allowGravity = false;
      
      this.scene.physics.add.overlap(bullet, this.platforms, () => {
        bullet.destroy();
      });

      this.scene.physics.add.overlap(bullet, player.sprite, () => {
        bullet.destroy();
        player.updateHealth(player.currentHealth - 10);
    
        // Increment kills only if the player dies
        if (player.currentHealth <= 0) {
            this.incrementKills();
        }
      });    
    }
      
    destroy() {
      clearInterval(this.shootTimer);
      this.sprite.destroy();
      this.healthBar.destroy();
      this.healthBarBackground.destroy();
    }
  
    die() {
      if (!this.isAlive) return;
      
      this.isAlive = false;
      this.deaths++;
      clearInterval(this.shootTimer);
      
      this.sprite.setVisible(false);
      this.healthBar.setVisible(false);
      this.healthBarBackground.setVisible(false);
  
      setTimeout(() => this.respawn(), 5000);
    }
  
    update() {
      this.healthBar.x = this.sprite.x;
      this.healthBar.y = this.sprite.y - 50;
  
      this.healthBarBackground.x = this.sprite.x;
      this.healthBarBackground.y = this.sprite.y - 50;
    }

    respawn() {
      if (this.sprite) this.sprite.destroy();
      this.sprite = this.scene.add.rectangle(this.startX, this.startY, 40, 40, 0x0000ff);
      this.scene.physics.add.existing(this.sprite);
      this.sprite.body.setCollideWorldBounds(true);
      this.sprite.body.setImmovable(false);
      
      this.scene.physics.add.collider(this.sprite, this.platforms);
      
      if (this.healthBarBackground) this.healthBarBackground.destroy();
      if (this.healthBar) this.healthBar.destroy();
      
      this.healthBarBackground = this.scene.add.rectangle(this.startX, this.startY - 50, 60, 10, 0x000000);
      this.healthBar = this.scene.add.rectangle(this.startX, this.startY - 50, 60, 10, 0xff0000);
      
      this.currentHealth = this.maxHealth;
      
      this.sprite.setVisible(true);
      this.healthBar.setVisible(true);
      this.healthBarBackground.setVisible(true);
  
      this.isAlive = true;
      this.shootTimer = setInterval(() => this.shoot(), this.shootInterval);
    }

    incrementKills() {
        this.kills++;
    }
}
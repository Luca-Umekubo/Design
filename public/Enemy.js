class Enemy {
    constructor(scene, x, y, platforms) {
      this.scene = scene;
      this.sprite = scene.add.rectangle(x, y, 40, 40, 0x0000ff); // Blue rectangle
      scene.physics.add.existing(this.sprite);
      this.sprite.body.setCollideWorldBounds(true);
      this.sprite.body.setImmovable(false); // Make the enemy movable but affected by collisions
  
      // Add collision between enemy and platforms
      scene.physics.add.collider(this.sprite, platforms);
  
      // Health properties
      this.maxHealth = 100;
      this.currentHealth = this.maxHealth;
  
      // Health bar setup
      this.healthBarBackground = scene.add.rectangle(x, y - 50, 60, 10, 0x000000); // Black background
      this.healthBar = scene.add.rectangle(x, y - 50, 60, 10, 0xff0000); // Red health bar
  
      // Shooting interval
      this.shootInterval = 2000; // 2 seconds
      this.shootTimer = setInterval(() => this.shoot(), this.shootInterval);
    }
  
    updateHealth(newHealth) {
      // Update health value
      this.currentHealth = Phaser.Math.Clamp(newHealth, 0, this.maxHealth);
  
      // Scale the health bar based on the percentage of health remaining
      const healthPercentage = this.currentHealth / this.maxHealth;
      this.healthBar.width = 60 * healthPercentage; // Adjust width based on percentage
    }
  
    shoot() {
        if (this.currentHealth <= 0) return; // Don't shoot if dead
      
        // Create a bullet aimed at the player
        const bullet = this.scene.add.circle(this.sprite.x, this.sprite.y, 5, 0xffff00); // Yellow bullet
        this.scene.physics.add.existing(bullet);
      
        const direction = new Phaser.Math.Vector2(
          player.sprite.x - this.sprite.x,
          player.sprite.y - this.sprite.y
        ).normalize();
      
        const speed = 600; // Bullet speed
        bullet.body.setVelocity(direction.x * speed, direction.y * speed);
        bullet.body.allowGravity = false; // No bullet drop
      
        // Add collision detection for the bullet hitting platforms
        this.scene.physics.add.collider(bullet, this.scene.platforms, () => {
          bullet.destroy(); // Destroy bullet when it hits a platform
        });
      
        // Add collision detection for the bullet hitting the player
        this.scene.physics.add.collider(bullet, player.sprite, () => {
          bullet.destroy();
          player.updateHealth(player.currentHealth - 10); // Example damage
        });
      }
  
    destroy() {
      clearInterval(this.shootTimer); // Stop shooting
      this.sprite.destroy();
      this.healthBar.destroy();
      this.healthBarBackground.destroy();
    }
  
    update() {
      // Update health bar position to follow the enemy
      this.healthBar.x = this.sprite.x;
      this.healthBar.y = this.sprite.y - 50;
  
      this.healthBarBackground.x = this.sprite.x;
      this.healthBarBackground.y = this.sprite.y - 50;
    }
  }
  
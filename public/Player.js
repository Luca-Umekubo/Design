class Player {
    constructor(scene, x, y) {
      this.scene = scene;
      this.sprite = scene.add.rectangle(x, y, 40, 40, 0xff0000);
      scene.physics.add.existing(this.sprite);
      this.sprite.body.setCollideWorldBounds(true);
      this.sprite.body.setBounce(0); // No bounce on landing
  
      // Health properties
      this.maxHealth = 100;
      this.currentHealth = this.maxHealth;
  
      // Health bar setup
      this.healthBarBackground = scene.add.rectangle(x, y - 50, 60, 10, 0x000000); // Black background
      this.healthBar = scene.add.rectangle(x, y - 50, 60, 10, 0x00ff00); // Green health bar
  
      // Do NOT add physics to health bar elements
      // They should only visually follow the player
  
      this.cursors = scene.input.keyboard.addKeys({
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
        jump: Phaser.Input.Keyboard.KeyCodes.W
      });
  
      // Add player-platform collision
      scene.physics.add.collider(this.sprite, scene.platforms);
    }
  
    updateHealth(newHealth) {
      // Update health value
      this.currentHealth = Phaser.Math.Clamp(newHealth, 0, this.maxHealth);
  
      // Scale the health bar based on the percentage of health remaining
      const healthPercentage = this.currentHealth / this.maxHealth;
      this.healthBar.width = 60 * healthPercentage; // Adjust width based on percentage
    }
  
    update() {
      // Movement logic
      if (this.cursors.left.isDown) {
        this.sprite.body.setVelocityX(-320); // Increased speed
      } else if (this.cursors.right.isDown) {
        this.sprite.body.setVelocityX(320); // Increased speed
      } else {
        this.sprite.body.setVelocityX(0);
      }
  
      // Jump logic
      if (this.cursors.jump.isDown && this.sprite.body.blocked.down) {
        this.sprite.body.setVelocityY(-600); // Increased jump velocity
      }
  
      // Update health bar position to follow the player
      this.healthBar.x = this.sprite.x;
      this.healthBar.y = this.sprite.y - 50;
  
      this.healthBarBackground.x = this.sprite.x;
      this.healthBarBackground.y = this.sprite.y - 50;
    }
  }
  
class Player {
  constructor(scene, x, y) {
    this.scene = scene;
    this.startX = x;
    this.startY = y;
    this.sprite = scene.add.rectangle(x, y, 40, 40, 0xff0000);
    scene.physics.add.existing(this.sprite);
    this.sprite.body.setCollideWorldBounds(true);
    this.sprite.body.setBounce(0);

    // Health properties
    this.maxHealth = 100;
    this.currentHealth = this.maxHealth;

    // Track when the player last took damage
    this.lastDamageTime = 0; // 0 means no damage taken yet

    // Score and death tracking
    this.kills = 0;
    this.deaths = 0;

    // Health bar setup
    this.healthBarBackground = scene.add.rectangle(x, y - 50, 60, 10, 0x000000);
    this.healthBar = scene.add.rectangle(x, y - 50, 60, 10, 0x00ff00);

    this.isAlive = true;

    this.cursors = scene.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      jump: Phaser.Input.Keyboard.KeyCodes.W
    });

    scene.physics.add.collider(this.sprite, scene.platforms);

    // Health regeneration setup
    this.regenAmount = 10;         // Heal 1 HP per interval
    this.regenInterval = 1500;    // Every 2 seconds
    this.damageCooldown = 3000;   // Must wait 4 seconds after last damage before regenerating

    this.regenTimer = scene.time.addEvent({
      delay: this.regenInterval,
      loop: true,
      callback: () => {
        this.regenerateHealth(this.regenAmount);
      }
    });
  }

  updateHealth(newHealth) {
      const oldHealth = this.currentHealth;
      this.currentHealth = Phaser.Math.Clamp(newHealth, 0, this.maxHealth);

      const healthPercentage = this.currentHealth / this.maxHealth;
      this.healthBar.width = 60 * healthPercentage;

      // If the player took damage (newHealth < oldHealth), update lastDamageTime
      if (this.currentHealth < oldHealth) {
          this.lastDamageTime = this.scene.time.now; 
      }

      if (this.currentHealth <= 0) {
        this.die();
      }
  }

  regenerateHealth(amount) {
    // Only regenerate if alive, not at max health, and no damage in the last 4 seconds
    const timeSinceDamage = this.scene.time.now - this.lastDamageTime;
    if (this.isAlive && this.currentHealth < this.maxHealth && timeSinceDamage >= this.damageCooldown) {
      const newHealth = Math.min(this.currentHealth + amount, this.maxHealth);
      this.updateHealth(newHealth);
    }
  }

  update() {
    if (this.isAlive) {
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
    } else {
      this.sprite.body.setVelocityX(0);
    }
  
    // Update health bar positions
    this.healthBar.x = this.sprite.x;
    this.healthBar.y = this.sprite.y - 50;
    this.healthBarBackground.x = this.sprite.x;
    this.healthBarBackground.y = this.sprite.y - 50;
  }

  die() {
      if (!this.isAlive) return;
      
      this.isAlive = false;
      this.deaths++;
      this.sprite.setVisible(false);
      this.healthBar.setVisible(false);
      this.healthBarBackground.setVisible(false);
  
      setTimeout(() => this.respawn(), 5000);
  }

  respawn() {
      this.sprite.setPosition(this.startX, this.startY);
      this.sprite.setVisible(true);
      
      this.currentHealth = this.maxHealth;
      this.healthBar.width = 60;
      this.healthBar.setVisible(true);
      this.healthBarBackground.setVisible(true);
  
      this.isAlive = true;
  }

  incrementKills() {
      this.kills++;
  }
}

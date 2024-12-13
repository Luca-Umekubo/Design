class Enemy {
  constructor(scene, x, y, platforms) {
    this.scene = scene;
    this.startX = x;
    this.startY = y;
    this.platforms = platforms;

    this.sprite = scene.add.rectangle(x, y, 40, 40, 0x0000ff);
    scene.physics.add.existing(this.sprite);
    this.sprite.body.setCollideWorldBounds(true);

    // Instead of setInterval for jumping:
    this.jumpInterval = 2500; 
    this.scene.time.addEvent({
      delay: this.jumpInterval,
      loop: true,
      callback: this.jump,
      callbackScope: this
    });

    this.leftBound = x - 200;
    this.rightBound = x + 200;
    this.movingRight = true;
    this.speed = 125;

    scene.physics.add.collider(this.sprite, platforms);

    this.maxHealth = 100;
    this.currentHealth = this.maxHealth;
    this.kills = 0;
    this.deaths = 0;

    this.healthBarBackground = scene.add.rectangle(x, y - 50, 60, 10, 0x000000);
    this.healthBar = scene.add.rectangle(x, y - 50, 60, 10, 0xff0000);

    // Instead of setInterval for shooting:
    this.shootInterval = 200; // shoot every 2 seconds (adjust as needed)
    this.scene.time.addEvent({
      delay: this.shootInterval,
      loop: true,
      callback: this.shoot,
      callbackScope: this
    });

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
    // If dead, no player alive, or game over, do nothing
    if (!this.isAlive || this.currentHealth <= 0 || !this.scene.player.isAlive || this.scene.gameOver) return;

    const bullet = this.scene.add.circle(this.sprite.x, this.sprite.y, 5, 0xffff00);
    this.scene.physics.add.existing(bullet);

    const direction = new Phaser.Math.Vector2(
      this.scene.player.sprite.x - this.sprite.x,
      this.scene.player.sprite.y - this.sprite.y
    ).normalize();

    const speed = 700;
    bullet.body.setVelocity(direction.x * speed, direction.y * speed);
    bullet.body.allowGravity = false;

    this.scene.physics.add.overlap(bullet, this.platforms, () => {
      bullet.destroy();
    });

    this.scene.physics.add.overlap(bullet, this.scene.player.sprite, () => {
      bullet.destroy();
      this.scene.player.updateHealth(this.scene.player.currentHealth - 10);

      if (this.scene.player.currentHealth <= 0) {
        this.incrementKills();
      }
    });
  }

  jump() {
    if (this.isAlive && this.sprite.body.blocked.down) {
      this.sprite.body.setVelocityY(-600);
    }
  }

  destroy() {
    // No intervals to clear now since we're using Phaser timers.
    this.sprite.destroy();
    this.healthBar.destroy();
    this.healthBarBackground.destroy();
  }

  die() {
    if (!this.isAlive) return;

    this.isAlive = false;
    this.deaths++;

    this.sprite.setVisible(false);
    this.healthBar.setVisible(false);
    this.healthBarBackground.setVisible(false);
    this.sprite.body.enable = false;

    if (!this.scene.gameOver) {
      setTimeout(() => this.respawn(), 5000);
    }
  }

  update() {
    if (this.isAlive) {
      if (this.movingRight) {
        this.sprite.body.setVelocityX(this.speed);
        if (this.sprite.x >= this.rightBound) {
          this.movingRight = false;
        }
      } else {
        this.sprite.body.setVelocityX(-this.speed);
        if (this.sprite.x <= this.leftBound) {
          this.movingRight = true;
        }
      }
    } else {
      this.sprite.body.setVelocityX(0);
    }

    this.healthBar.x = this.sprite.x;
    this.healthBar.y = this.sprite.y - 50;
    this.healthBarBackground.x = this.sprite.x;
    this.healthBarBackground.y = this.sprite.y - 50;
  }

  respawn() {
    if (this.scene.gameOver) return;

    if (this.sprite) this.sprite.destroy();
    this.sprite = this.scene.add.rectangle(this.startX, this.startY, 40, 40, 0x0000ff);
    this.scene.physics.add.existing(this.sprite);
    this.sprite.body.setCollideWorldBounds(true);

    this.scene.physics.add.collider(this.sprite, this.platforms);

    if (this.healthBarBackground) this.healthBarBackground.destroy();
    if (this.healthBar) this.healthBar.destroy();

    this.healthBarBackground = this.scene.add.rectangle(this.startX, this.startY - 50, 60, 10, 0x000000);
    this.healthBar = this.scene.add.rectangle(this.startX, this.startY - 50, 60, 10, 0xff0000);

    this.currentHealth = this.maxHealth;

    this.sprite.setVisible(true);
    this.healthBar.setVisible(true);
    this.healthBarBackground.setVisible(true);

    this.sprite.body.enable = true;
    this.isAlive = true;

    // No need to recreate timers here. If you want them active again, re-add time events or handle differently.
  }

  incrementKills() {
    this.kills++;
  }
}

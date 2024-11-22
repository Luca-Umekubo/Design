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
    }
  
    updateHealth(newHealth) {
        this.currentHealth = Phaser.Math.Clamp(newHealth, 0, this.maxHealth);
    
        const healthPercentage = this.currentHealth / this.maxHealth;
        this.healthBar.width = 60 * healthPercentage;
    
        if (this.currentHealth <= 0) {
          this.die();
        }
    }
  
    update() {
      if (this.cursors.left.isDown) {
        this.sprite.body.setVelocityX(-320);
      } else if (this.cursors.right.isDown) {
        this.sprite.body.setVelocityX(320);
      } else {
        this.sprite.body.setVelocityX(0);
      }
  
      if (this.cursors.jump.isDown && this.sprite.body.blocked.down) {
        this.sprite.body.setVelocityY(-600);
      }
  
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
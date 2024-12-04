# Fast-Paced 2D Platformer Shooter

This project is a fast-paced 2D platformer shooter game built using the Phaser game engine. Players navigate platforms, battle an AI-controlled enemy, and shoot projectiles to gain the upper hand. Below is an overview of the codebase, its structure, and key functionalities.

## Table of Contents
- [Game Setup](#game-setup)
- [Core Classes](#core-classes)
  - [Player](#player)
  - [Enemy](#enemy)
- [Main Script](#main-script)
- [Gameplay Features](#gameplay-features)
- [How It Works](#how-it-works)
  - [Player-Enemy Interaction](#player-enemy-interaction)
  - [Physics and Platforms](#physics-and-platforms)
  - [Shooting Mechanics](#shooting-mechanics)
- [Future Enhancements](#future-enhancements)

---

## Game Setup

The game is set up in the `index.html` file using Phaser 3. The Phaser configuration defines the game dimensions, physics, and scenes for `preload`, `create`, and `update` functions.

Key files:
- `Player.js`: Handles the player character's logic.
- `Enemy.js`: Handles the enemy character's logic.
- `index.html`: The main entry point that sets up the game loop and integrates all elements.

---

## Core Classes

### Player

**File:** `Player.js`  
The `Player` class manages the player's character, including movement, health, and interactions. 

#### Properties:
- `sprite`: The player's rectangular sprite.
- `maxHealth` & `currentHealth`: Health tracking and updates.
- `healthBar` & `healthBarBackground`: Visual representation of health.
- `kills` & `deaths`: Tracks the player's performance.
- `cursors`: Keyboard inputs for movement and jumping.

#### Methods:
- `updateHealth(newHealth)`: Updates health and handles death when health reaches zero.
- `update()`: Updates movement and health bar positions.
- `die()`: Handles the death logic, including respawn timer.
- `respawn()`: Respawns the player at the starting position with full health.
- `incrementKills()`: Increments the kill count.

---

### Enemy

**File:** `Enemy.js`  
The `Enemy` class manages the AI-controlled opponent's behavior.

#### Properties:
- Similar to the Player class (sprite, health, kills, deaths, etc.).
- `shootInterval`: Interval for firing projectiles.
- `shootTimer`: Timer for managing shooting behavior.

#### Methods:
- `updateHealth(newHealth)`: Similar to the Player class.
- `shoot()`: Fires a bullet toward the player.
- `die()`: Handles the enemy's death and respawn logic.
- `respawn()`: Reinitializes the enemy sprite and properties after death.
- `incrementKills()`: Increments the kill count.

---

## Main Script

**File:** `index.html`  
The game logic and scene setup are defined in the `index.html` script.

#### Functions:
- `preload()`: Placeholder for loading assets.
- `create()`: Initializes the game scene, including:
  - Platforms.
  - Player and enemy instances.
  - Mouse input for shooting.
- `update()`: Updates the player, enemy, and bullet cleanup.

---

## Gameplay Features

1. **Player Movement**: The player moves left, right, and jumps using `A`, `D`, and `W` keys.
2. **Enemy AI**: The enemy periodically shoots bullets toward the player.
3. **Health System**: Both player and enemy have health bars that update dynamically.
4. **Shooting Mechanics**: 
   - Player shoots by clicking the mouse.
   - Bullets interact with platforms and characters.

---

## How It Works

### Player-Enemy Interaction
- Both characters have sprites that are physics-enabled for collision.
- The player's bullets damage the enemy and vice versa.
- Health decreases upon being hit, leading to a respawn after death.

### Physics and Platforms
- Static platforms are added to the scene for the player and enemy to navigate.
- The game uses Phaser's arcade physics for gravity and collision.

### Shooting Mechanics
- Bullets are created dynamically upon mouse input.
- They travel in the direction of the click and are destroyed upon collision or exiting the screen bounds.

---

## Future Enhancements
- Add additional player and enemy abilities.
- Implement multiplayer support.
- Introduce scoring, power-ups, and new levels.

---

Feel free to expand this README with additional details or features as you develop the game further!

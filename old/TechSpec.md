Technology Stack:

1) Game Engine

Phaser - Easy to understand, popular, lots of plugins

2) 2d Map Plugin

Tiled Map Editor + Phaser Plugin ( has a placeholder now using phaser generation, needs to be implemented)

3) Networking Library

PeerJS - Fast local connections, no need for external server, less confusing than alternatives

Here is the complete breakdown of each class, with all methods and variables listed as per the flowchart details.

---
# Main

## Variables

- **mapTileset (JSON)**: JSON file in the assets folder representing the map.
- **gameIndex (int)**: Unique identifier for each game.
- **modeMaps**: Array of tilesets.

## Methods

- **loadMap**: Loads the map, sets up collisions, and defines physics boundaries.

# Player

## Variables

- **name (String)**: Name of the player.
- **index (int)**: Unique identifier for the player.
- **weapon (Weapon)**: Weapon object for the player.
- **spriteArray (Array of images)**: Array containing player sprites.
- **respawnPoint (Array [x, y])**: Coordinates for the player's respawn point.
- **canJump (boolean)**: Indicates if the player can jump.
- **canCrouch (boolean)**: Indicates if the player can crouch.
- **healthPoints (HealthPoints)**: Reference to the player’s health points.
- **speed (Speed)**: Player’s speed.
- **walkAnimation (Animation)**: Walk animation created using Phaser's anims.
- **crouchAnimation (Animation)**: Crouch animation.

## Methods

- **move**: Moves the player left/right using 'A' and 'D', jumps with space, crouches with Ctrl. Checks if the action is allowed, updates speed in the x-direction, and triggers the appropriate animation.
- **shoot**: Triggered on left mouse button; executes the weapon’s shoot method.
- **die**: Changes the player to a dead sprite; after 5 seconds, respawns and removes the dead sprite.
- **respawn**: Moves the player to the designated respawn point.
- **flip**: Adjusts sprite orientation based on the cursor’s position relative to the player using Phaser's flipX.

# Class

## Variables

- **name (String)**: Name of the class.

# Weapon

## Variables

- **projectileVelocity (int)**: Velocity of the fired projectiles.
- **damage (int)**: Damage dealt per shot.
- **range (int)**: Maximum range of the weapon.
- **fireRate (int)**: Rate of fire, determining bullets per second.
- **inaccuracy (int)**: Inaccuracy range for shots.
- **ammoTotal (int)**: Total ammunition.
- **ammoCurrent (int)**: Current ammunition count.
- **hasAmmo (boolean)**: Indicates if ammunition is available.

## Methods

- **shoot** (left mouse): Fires bullets per second based on fireRate, with velocity defined by projectileVelocity and an angle within the inaccuracy range.
- **reload** (r): Reloads the weapon, resetting the ammo count.

# Bullet

## Variables

- **velocity (int)**: Speed of the bullet.
- **damage (int)**: Bullet’s damage.
- **originPoint (Array)**: Starting point coordinates.
- **angle (double)**: Firing angle of the bullet.
- **range (int)**: Maximum distance the bullet can travel.
- **currentPosition (Array)**: Bullet’s current coordinates.
- **sprite (img)**: Bullet image.

## Methods

- **collideWithPlayer (boolean)**: Determines if the bullet can collide with players.
- **inRange (boolean)**: Indicates if the bullet is within range.
- **damagePlayer (boolean)**: Determines if the bullet deals damage to players.

# Profile

## Variables

- **hasProfile (boolean)**: Indicates if a profile exists.
- **name (String)**: Name of the profile.
- **level (int)**: Level of the profile.
- **collectibles (Array of Strings)**: List of collectibles.
- **classes (Array of Strings)**: List of available classes.
- **peerId (String)**: PeerJS-generated ID.

## Methods

- **hasCollectable (boolean)**: Indicates if there are collectibles.
- **hasClass (boolean)**: Indicates if there are classes.
- **isHost (boolean)**: Determines if the profile is the game host.

# Sounds

## Variables

- **sounds (Array of Strings)**: List of available sounds.
- **currentSounds (Array of Strings)**: List of active sounds.

## Methods

- **clearSounds**: Clears all current sounds.
- **addSound (String)**: Adds a sound to currentSounds.
- **removeSound (String)**: Removes a sound from currentSounds.

# Lobby

## Variables

- **host (Player)**: The player hosting the game.
- **members (Array of Players)**: Array of players in the lobby.
- **gameModeIndex (int)**: Index representing the game mode.
- **winCondition (boolean)**: Indicates if the win condition has been met.

## Methods

- **startGame (boolean)**: Signals the start of the game.
- **spawnPlayers (boolean)**: Spawns players at the beginning.
- **endGame (boolean)**: Ends the game.
- **updateGameData (boolean)**: Updates game data.
- **gameIsRunning (boolean)**: Indicates if the game is ongoing.

# Game

## Methods

- **tick**: Calls methods like move, shoot, updateGameData, updatePoints, and manages sounds while the game is running.
- **tickPlaySounds**: Plays sounds when the game is not running.

# Points

## Variables

- **points (2D Array of Strings)**: The first row contains lobby members, and the second row stores each player’s points.

## Methods

- **updatePoints (gameModeIndex)**: Updates player points based on game mode rules.




































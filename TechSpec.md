Technology Stack:

1) Game Engine

Phaser - Easy to understand, popular, lots of plugins

2) 2d Map Plugin

Tiled Map Editor + Phaser Plugin

3) Networking Library

PeerJS - Fast local connections, no need for external server, less confusing than alternatives

Here is the complete breakdown of each class, with all methods and variables listed as per the flowchart details.

---
### (P0) # Main

## Variables

- ## (P0)**mapTileset (JSON)**: 
JSON file in the assets folder representing the map.
- ## (P2)**gameIndex (int)**: 
Unique identifier for each game.
- ## (P1)**modeMaps**:
 Array of tilesets.

## Methods

## (P0)- **loadMap**:
 Loads the map, sets up collisions, and defines physics boundaries.

### (P0) # Player

## Variables

## (P0) - **name (String)**: Name of the player.
## (P0) - **index (int)**: Unique identifier for the player.
## (P1) - **weapon (Weapon)**: Weapon object for the player.
## (P1) - **spriteArray (Array of images)**: Array containing player sprites.
## (P1) - **respawnPoint (Array [x, y])**: Coordinates for the player's respawn point.
## (P0)- **canJump (boolean)**: Indicates if the player can jump.
## (P0)- **canCrouch (boolean)**: Indicates if the player can crouch.
## (P1)- **healthPoints (HealthPoints)**: Reference to the player’s health points.
## (P1)- **speed (Speed)**: Player’s speed.
## (P2)- **walkAnimation (Animation)**: Walk animation created using Phaser's anims.
## (P2)- **crouchAnimation (Animation)**: Crouch animation.

## Methods

## (P0)- **move**: 
Moves the player left/right using 'A' and 'D', jumps with space, crouches with Ctrl. Checks if the action is allowed, updates speed in the x-direction, and triggers the appropriate animation.
## (P0)- **shoot**: 
Triggered on left mouse button; executes the weapon’s shoot method.
## (P2)- **die**: 
Changes the player to a dead sprite; after 5 seconds, respawns and removes the dead sprite.
## (P0)- **respawn**: 
Moves the player to the designated respawn point.
## (P2)- **flip**: 
Adjusts sprite orientation based on the cursor’s position relative to the player using Phaser's flipX.

#  Class

## Variables

- **name (String)**: Name of the class.

## (P0)# Weapon

## Variables

## (P0)- **projectileVelocity (int)**: 
Velocity of the fired projectiles.
## (P0)- **damage (int)**: 
Damage dealt per shot.
## (P1)- **range (int)**:
 Maximum range of the weapon.
## (P1)- **fireRate (int)**: 
Rate of fire, determining bullets per second.
## (P2)- **inaccuracy (int)**: 
Inaccuracy range for shots.
## (P0)- **ammoTotal (int)**:
 Total ammunition.
## (P1)- **ammoCurrent (int)**: 
Current ammunition count.
## (P0)- **hasAmmo (boolean)**: 
Indicates if ammunition is available.

## Methods

## (P0)- **shoot** (left mouse): 
Fires bullets per second based on fireRate, with velocity defined by projectileVelocity and an angle within the inaccuracy range.
## (P0)- **reload** (r): 
Reloads the weapon, resetting the ammo count.

## (P1) # Bullet

## Variables

## (P2)- **velocity (int)**: 
Speed of the bullet. (Can't you just get this from the weapon class)
## (P2)- **damage (int)**: 
Bullet’s damage. (Can't you just get this from the weapon class)
## (P1) - **originPoint (Array)**: 
Starting point coordinates.
## (P1) - **angle (double)**: 
Firing angle of the bullet.
## (P1) - **range (int)**: 
aximum distance the bullet can travel.
## (P0)- **currentPosition (Array)**: 
Bullet’s current coordinates.
## (P1)- **sprite (img)**: 
Bullet image.

## Methods

## (P0)- **collideWithPlayer (boolean)**: 
Determines if the bullet can collide with players.
## (P1) - **inRange (boolean)**:
 Indicates if the bullet is within range.
## (P0)- **damagePlayer (boolean)**: 
Determines if the bullet deals damage to players.

## (P0) # Profile 

## Variables

## (P0)- **hasProfile (boolean)**: 
Indicates if a profile exists.
## (P0)- **name (String)**: 
Name of the profile.
## (P2)- **level (int)**: 
Level of the profile.
## (P2)- **collectibles (Array of Strings)**:
 List of collectibles.
## (P1)- **classes (Array of Strings)**: 
List of available classes.
## (P0)- **peerId (String)**: 
PeerJS-generated ID.

## Methods

## (P2)- **hasCollectable (boolean)**: 
Indicates if there are collectibles.
## (P1)- **hasClass (boolean)**: 
Indicates if there are classes.
## (P1)- **isHost (boolean)**: 
Determines if the profile is the game host.

## (P2) # Sounds

## Variables

## (P2)- **sounds (Array of Strings)**: 
List of available sounds.
## (P2)- **currentSounds (Array of Strings)**: 
List of active sounds.

## Methods

## (P2)- **clearSounds**: 
Clears all current sounds.
## (P2)- **addSound (String)**: 
Adds a sound to currentSounds.
## (P2)- **removeSound (String)**:
 Removes a sound from currentSounds.

## (P1) # Lobby

## Variables

## (P0)- **host (Player)**: 
The player hosting the game.
## (P0)- **members (Array of Players)**: 
Array of players in the lobby.
## (P1)- **gameModeIndex (int)**: 
Index representing the game mode.
## (P2)- **winCondition (boolean)**: 
Indicates if the win condition has been met.

## Methods

## (P0)- **startGame (boolean)**: 
Signals the start of the game.
## (P0)- **spawnPlayers (boolean)**:
 Spawns players at the beginning.
## (P0)- **endGame (boolean)**: 
Ends the game.
## (P1)- **updateGameData (boolean)**: 
Updates game data.
## (P0)- **gameIsRunning (boolean)**: 
Indicates if the game is ongoing.

## (P0)# Game

## Methods

## (P0)- **tick**: 
Calls methods like move, shoot, updateGameData, updatePoints, and manages sounds while the game is running.
## (P2)- **tickPlaySounds**: 
Plays sounds when the game is not running.

## (P1)# Points

## Variables

## (P1)- **points (2D Array of Strings)**: 
The first row contains lobby members, and the second row stores each player’s points.

## Methods

## (P1)- **updatePoints (gameModeIndex)**: 
Updates player points based on game mode rules.




































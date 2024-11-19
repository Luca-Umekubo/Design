Main
Variables

(P2) gameIndex (int): Unique identifier for each game.

Player
Variables

(P2) walkAnimation (Animation): Walk animation created using Phaser's anims.
(P2) crouchAnimation (Animation): Crouch animation.

Methods

(P2) die: Changes the player to a dead sprite; after 5 seconds, respawns.
(P2) flip: Adjusts sprite orientation based on cursor position.

Weapon
Variables

(P2) inaccuracy (int): Inaccuracy range for shots.

Bullet
Variables

(P2) velocity (int): Speed of the bullet.
(P2) damage (int): Bullet's damage.

Profile
Variables

(P2) level (int): Level of the profile.
(P2) collectibles (Array of Strings): List of collectibles.

Methods

(P2) hasCollectable (boolean): Indicates if there are collectibles.

Sounds (P2)
Variables

(P2) sounds (Array of Strings): List of available sounds.
(P2) currentSounds (Array of Strings): List of active sounds.

Methods

(P2) clearSounds: Clears all current sounds.
(P2) addSound (String): Adds a sound to currentSounds.
(P2) removeSound (String): Removes a sound from currentSounds.

Lobby
Variables

(P2) winCondition (boolean): Indicates if the win condition has been met.

Game
Methods

(P2) tickPlaySounds: Plays sounds when the game is not running.
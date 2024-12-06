# Minimum Viable Product (MVP): 2D Platformer Shooter

## Objective

Create a timed deathmatch shooter game featuring:

- A player and an AI-controlled enemy.
- A simple platform-based map.
- Core mechanics: movement, shooting, health, score tracking, and a timer.

This MVP defines the core features and outlines the work completed, placeholders used, and the remaining steps to achieve the final product.

---

## Core Classes

### Player Class

**Priority:** [P0]  
**Implemented:**

- **Movement:** Player moves left (`A`), right (`D`), and jumps (`W`).
- **Health System:** Tracks player health, with dynamic health bar updates.
- **Shooting:** Player shoots bullets using mouse clicks, with basic collision and damage.
- **Respawn Logic:** Player respawns after death.

**Placeholders:**

- Rectangle sprite for the player (no animations or custom design).

**To Be Done:**

- Implement score tracking for player kills.
- Add integration with the game timer to reset player stats at the end of each match.

---

### Enemy Class

**Priority:** [P0]  
**Implemented:**

- **Shooting AI:** Enemy fires bullets at the player periodically.
- **Health System:** Tracks enemy health, with dynamic health bar updates.
- **Respawn Logic:** Enemy respawns after death.

**Placeholders:**

- Static AI behavior with no pathfinding or movement.
- Rectangle sprite for the enemy.

**To Be Done:**

- Improve AI shooting to account for player movement.
- Implement integration with scoring mechanics.

---

### Bullet Class

**Priority:** [P0]  
**Implemented:**

- **Collision Detection:** Bullets collide with platforms and characters, dealing damage.
- **Directional Movement:** Bullets move toward the target direction.

**Placeholders:**

- Basic circular sprite for bullets.

**To Be Done:**

- Add range limits for bullets (destroy bullets after exceeding a set distance).

---

### Timer and Scoring

**Priority:** [P0]  
**To Be Done:**

- **Timer:** Add a countdown timer to track match duration.
- **Score Tracking:** Display player and enemy scores based on kills during the match.

---

### Platforms and Map

**Priority:** [P0]  
**Implemented:**

- **Static Platforms:** Simple rectangular platforms for navigation.
- **Physics:** Platforms support collisions with players, enemies, and bullets.

**Placeholders:**

- Basic level layout using static shapes.

**To Be Done:**

- Create a single, well-designed level optimized for gameplay.

---

## Simplifications for MVP

- **Networking:** Multiplayer features are excluded.
- **Animations and Sprites:** All visuals are placeholders (e.g., rectangles for characters).
- **Weapons:** Default shooting mechanics without advanced features like reloading or alternate fire modes.

---

## Next Steps and Timeline

### Day 1-2 (need to make global leaderboard tab)

1. Finalize player and enemy respawn logic.
2. Implement scoring system to track kills.
   - Add a scoreboard at the top of the screen.
   - When click tab, global leaderboard appears

### Day 3(Fully done)

1. Add a game timer with match duration (e.g., 2 minutes).
   - DONE
2. Integrate timer with match reset logic (e.g., clear scores and respawn players/enemies).
   - DONE

### Day 4-5

1. Design a basic map layout optimized for gameplay.
2. Implement a post-match summary screen (e.g., winner display).

---

## Final MVP Definition

The MVP will be a simple, timed deathmatch shooter game where:

1. Players navigate a platform-based map.
2. A timer limits each match to a set duration.
3. Scores are tracked and displayed based on kills.
4. A single player competes against an AI enemy with basic mechanics.

This MVP focuses on essential gameplay elements, with placeholders allowing for future expansion.

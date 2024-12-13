import config from './config.js';
import BootScene from './scenes/BootScene.js';
import MenuScene from './scenes/MenuScene.js';
import GameScene from './scenes/GameScene.js';
import GameOverScene from './scenes/GameOverScene.js';

const gameConfig = {
    type: Phaser.AUTO,
    width: config.gameWidth,
    height: config.gameHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: config.gravity },
            debug: false
        }
    },
    scene: [BootScene, MenuScene, GameScene, GameOverScene]
};

new Phaser.Game(gameConfig);

import config from './config.js';
import BootScene from './scenes/BootScene.js';
import MenuScene from './scenes/MenuScene.js';
import ConfigScene from './scenes/ConfigScene.js';
import GameScene from './scenes/GameScene.js';
import GameOverScene from './scenes/GameOverScene.js';

const gameConfig = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1200 },
            debug: false
        }
    },
    scene: [BootScene, MenuScene, ConfigScene, GameScene, GameOverScene]
};

new Phaser.Game(gameConfig);

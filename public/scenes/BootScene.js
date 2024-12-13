export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Load images, spritesheets, audio here
        // this.load.image('player', 'assets/player.png');
    }

    create() {
        this.scene.start('MenuScene');
    }
}

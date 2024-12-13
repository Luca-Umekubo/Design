export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        const startText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Start Game', {
            fontSize: '32px',
            color: '#00ff00'
        }).setOrigin(0.5).setInteractive();

        startText.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }
}

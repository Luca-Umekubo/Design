export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.player = data.player;
        this.enemy = data.enemy;
    }

    create() {
        const background = this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2, 1000, 600, 0x000000).setOrigin(0.5);
        background.setAlpha(0.5);

        const title = this.add.text(this.cameras.main.width / 2, 100, 'GAME OVER', {
            fontSize: '40px', color: '#00ff00'
        }).setOrigin(0.5);

        const playerStats = `Player K: ${this.player.kills} D: ${this.player.deaths}`;
        const enemyStats = `Enemy K: ${this.enemy.kills} D: ${this.enemy.deaths}`;

        this.add.text(this.cameras.main.width / 2, 200, playerStats, { fontSize: '20px', color: '#00ff00' }).setOrigin(0.5);
        this.add.text(this.cameras.main.width / 2, 240, enemyStats, { fontSize: '20px', color: '#ffffff' }).setOrigin(0.5);

        const restartButton = this.add.text(this.cameras.main.width / 2, 400, 'Restart', {
            fontSize: '30px', color: '#00ff00', backgroundColor: '#000000', padding: { x: 10, y: 5 }
        }).setOrigin(0.5).setInteractive();

        restartButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }
}

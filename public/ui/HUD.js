export default class HUD {
    constructor(scene) {
        this.scene = scene;

        this.timerText = scene.add.text(scene.cameras.main.width / 2, 20, '2:00', {
            fontSize: '32px', fill: '#00ff00'
        }).setOrigin(0.5);

        this.killText = scene.add.text(scene.cameras.main.width / 2, 60, 'Kill Counter: 0', {
            fontSize: '24px', fill: '#00ff00'
        }).setOrigin(0.5);

        this.deathText = scene.add.text(scene.cameras.main.width / 2, 100, 'Death Counter: 0', {
            fontSize: '24px', fill: '#00ff00'
        }).setOrigin(0.5);
    }

    update(kills, deaths, timeLeft) {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        this.timerText.setText(`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`);
        this.killText.setText(`Kill Counter: ${kills}`);
        this.deathText.setText(`Death Counter: ${deaths}`);
    }
}

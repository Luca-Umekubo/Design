export default class ConfigScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ConfigScene' });
    }

    create() {
        this.chosenClass = 'Warrior';   // Default class
        this.difficulty = 'Normal';     // Default difficulty

        this.add.text(this.cameras.main.width / 2, 100, 'CONFIGURE GAME', {
            fontSize: '32px', color: '#00ff00'
        }).setOrigin(0.5);

        // Class selection
        const classOptions = ['Warrior', 'Mage', 'Rogue'];
        let classIndex = 0;
        const classText = this.add.text(this.cameras.main.width / 2, 200, `Class: ${this.chosenClass}`, {
            fontSize: '24px', color: '#ffffff'
        }).setOrigin(0.5).setInteractive();
        
        classText.on('pointerdown', () => {
            classIndex = (classIndex + 1) % classOptions.length;
            this.chosenClass = classOptions[classIndex];
            classText.setText(`Class: ${this.chosenClass}`);
        });

        // Difficulty selection
        const difficultyOptions = ['Easy', 'Normal', 'Hard'];
        let difficultyIndex = 1; // starting at 'Normal'
        const difficultyText = this.add.text(this.cameras.main.width / 2, 300, `Difficulty: ${this.difficulty}`, {
            fontSize: '24px', color: '#ffffff'
        }).setOrigin(0.5).setInteractive();
        
        difficultyText.on('pointerdown', () => {
            difficultyIndex = (difficultyIndex + 1) % difficultyOptions.length;
            this.difficulty = difficultyOptions[difficultyIndex];
            difficultyText.setText(`Difficulty: ${this.difficulty}`);
        });

        // Confirm and start game
        const startButton = this.add.text(this.cameras.main.width / 2, 400, 'Start Game', {
            fontSize: '30px', color: '#00ff00', backgroundColor: '#000000', padding: { x: 10, y: 5 }
        }).setOrigin(0.5).setInteractive();

        startButton.on('pointerdown', () => {
            // Pass chosen settings to GameScene
            this.scene.start('GameScene', { 
                class: this.chosenClass, 
                difficulty: this.difficulty 
            });
        });

        // Optionally, a button to return to main menu
        const backButton = this.add.text(this.cameras.main.width / 2, 500, 'Back to Menu', {
            fontSize: '20px', color: '#00ff00'
        }).setOrigin(0.5).setInteractive();

        backButton.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }
}

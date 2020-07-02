import Phaser from 'phaser';
import config from '../modules/config';
import Button from '../objects/button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    // this.add.image(0, 0, 'main_bckg').setOrigin(0).setScale(1);
    this.playButton = new Button(this, config.width / 2, config.height / 2 - 150, 'button1', 'button2', 'Play', 'InputScene');

    this.optionsButton = new Button(this, config.width / 2, config.height / 2 - 50, 'button1', 'button2', 'Options', 'Options');

    this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 50, 'button1', 'button2', 'Credits', 'Credits');
    this.creditsButton.on('pointerdown', () => {
      this.scene.start('Credits');
    });

    this.leaderboardBtn = new Button(this, config.width / 2, config.height / 2 + 150, 'button1', 'button2', 'Leaderboard', 'Leaderboard');

    this.soundStat = this.sys.game.globals.soundStat;
    if (this.soundStat.musicOn === true && this.soundStat.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.soundStat.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}
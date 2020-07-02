/* eslint-disable no-undef */
import 'phaser';
import Button from '../objects/button';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  create() {
    this.soundStat = this.sys.game.globals.soundStat;

    this.text = this.add.text(300, 100, 'Options', { fontSize: 40 });
    this.musicButton = this.add.image(200, 200, 'checkedBox');
    this.musicText = this.add.text(250, 190, 'Music Enabled', { fontSize: 24 });

    this.soundButton = this.add.image(200, 300, 'checkedBox');
    this.soundText = this.add.text(250, 290, 'Sound Enabled', { fontSize: 24 });

    this.musicButton.setInteractive();
    this.soundButton.setInteractive();

    this.musicButton.on('pointerdown', () => {
      this.soundStat.musicOn = !this.soundStat.musicOn;
      this.updateAudio();
    });

    this.soundButton.on('pointerdown', () => {
      this.soundStat.soundOn = !this.soundStat.soundOn;
      this.updateAudio();
    });

    this.menuButton = new Button(this, 400, 500, 'button1', 'button2', 'Menu', 'Title');
    this.updateAudio();
  }

  updateAudio() {
    if (this.soundStat.musicOn === false) {
      this.musicButton.setTexture('box');
      this.sys.game.globals.bgMusic.stop();
      this.soundStat.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('checkedBox');
      if (this.soundStat.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.soundStat.bgMusicPlaying = true;
      }
    }

    if (this.soundStat.soundOn === false) {
      this.soundButton.setTexture('box');
    } else {
      this.soundButton.setTexture('checkedBox');
    }
  }
}
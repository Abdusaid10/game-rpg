// eslint-disable-next-line import/no-extraneous-dependencies
import Phaser from 'phaser';
import Button from '../objects/button';

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super('Leaderboard');
  }

  create() {
    this.add.image(0, 0, 'battle_bckg').setOrigin(0).setScale(2);

    this.title = this.add.text(280, 100, 'Leaderboard', { fontSize: 40 });

    this.menuButton = new Button(this, 400, 500, 'button1', 'button2', 'Menu', 'Title');

  }
}
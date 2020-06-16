import Phaser from 'phaser';
import config from './config';
import GameScene from './scenes/game_scene';
import BootScene from './scenes/boot_scene';
import PreloaderScene from './scenes/preloader_scene';
import TitleScene from './scenes/title_scene';
import OptionsScene from './scenes/options_scene';
import LeaderboardScene from './scenes/leaderboard_scene';
import CreditsScene from './scenes/credits_scene';


class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('Boot', BootScene);
    this.scene.add('Preload', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Laderboard', LeaderboardScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();
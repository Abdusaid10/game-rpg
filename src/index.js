import Phaser from 'phaser';
import config from './modules/config';
import WorldScene from './scenes/world_scene';
import BootScene from './scenes/boot_scene';
import PreloaderScene from './scenes/preloader_scene';
import TitleScene from './scenes/title_scene';
import OptionsScene from './scenes/options_scene';
import LeaderboardScene from './scenes/leaderboard_scene';
import CreditsScene from './scenes/credits_scene';
import Sound from './modules/soundHandle';
import GameOverScene from './scenes/game_over_scene';
import InputScene from './scenes/input_scene';

class Game extends Phaser.Game {
  constructor() {
    super(config);

    const soundStat = new Sound();
    this.globals = { soundStat, bgMusic: null };

    this.scene.add('Boot', BootScene);
    this.scene.add('Preload', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Laderboard', LeaderboardScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('WorldScene', WorldScene);
    this.scene.add('GameOver', GameOverScene);
    this.scene.add('InputScene', InputScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();
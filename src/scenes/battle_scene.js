import Phaser from 'phaser';
import { PlayerCharacter, Enemy } from '../objects/game';
import { incScore } from '../models/score';

export default class BattleScene extends Phaser.Scene {
  constructor() {
    super('BattleScene');
  }

  create() {
    this.startBattle();

    this.sys.events.on('wake', this.startBattle, this);
  }

  nextTurn() {
    const checkStat = this.checkEndBattle();
    if (checkStat.stat === 'victory') {
      this.endBattle('victory');
      return;
    }
    if (checkStat.stat === 'gameOver') {
      this.endBattle('gameOver');
      return;
    }
    do {
      this.index += 1;
      if (this.index >= this.units.length) this.index = 0;
    } while (!this.units[this.index].living);

    if (this.units[this.index] instanceof PlayerCharacter) {
      this.events.emit('PlayerSelect', this.index);
    } else {
      let r;
      do {
        r = Math.floor(Math.random() * this.heroes.length);
      } while (!this.heroes[r].living);

      this.units[this.index].attack(this.heroes[r]);
      this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
    }
  }

  receivePlayerSelection(action, target) {
    if (action === 'attack') {
      this.units[this.index].attack(this.enemies[target]);
    }
    this.time.addEvent({ dalay: 3000, callback: this.nextTurn, callbackScope: this });
  }

  checkEndBattle() {
    let victory = true;

    for (let i = 0; i < this.enemies.length; i += 1) {
      if (this.enemies[i].living) victory = false;
    }

    let gameOver = true;

    for (let i = 0; i < this.heroes.length; i += 1) {
      if (this.heroes[i].living) gameOver = false;
    }

    if (victory) return { stat: 'victory' };
    if (gameOver) return { stat: 'gameOver' };
    return victory || gameOver;
  }

  endBattle(stat) {
    this.heroes.length = 0;
    this.enemies.length = 0;
    for (let i = 0; i < this.units.length; i += 1) {
      this.units[i].destroy();
    }
    this.units.length = 0;

    this.index = -1;

    this.scene.remove('UIScene');
    this.scene.remove('BattleScene');

    if (stat === 'gameOver') {
      this.scene.stop('WorldScene');
      this.scene.start('GameOver');
    } else if (stat === 'victory') {
      incScore(20);
      this.scene.wake('WorldScene');
    }

    // this.scene.sleep('UIScene');

    // this.scene.switch('WorldScene');
  }

  startBattle() {
    this.score = 0;
    const warrior = new PlayerCharacter(this, 600, 200, 'player', 'Warrior', 12, 10);
    // warrior.flipX = false;
    this.add.existing(warrior);

    const mage = new PlayerCharacter(this, 600, 300, 'mage', 'Mage', 12, 8);
    this.add.existing(mage);

    const dragonblue = new Enemy(this, 100, 200, 'dragonblue', 'Dragon 1', 50, 6);
    dragonblue.setScale(3);
    this.add.existing(dragonblue);

    const dragonOrrange = new Enemy(this, 100, 300, 'dragonOrrange', 'Dragon 2', 50, 6);
    dragonOrrange.setScale(3);
    this.add.existing(dragonOrrange);

    this.heroes = [warrior, mage];

    this.enemies = [dragonblue, dragonOrrange];

    this.units = this.heroes.concat(this.enemies);

    this.index = -1;
    this.scene.launch('UIScene');
  }
}
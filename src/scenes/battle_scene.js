import Phaser from 'phaser';
import { PlayerCharacter, Enemy } from '../objects/game';

export default class BattleScene extends Phaser.Scene {
  constructor() {
    super('BattleScene');
  }

  create() {
    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');

    this.startBattle();
    // const timeEvent = this.time.addEvent({
    //   dalay: 2000,
    //   callback: this.exitBattle,
    //   callbackScope: this,
    // });

    this.sys.events.on('wake', this.startBattle, this);
  }

  nextTurn() {
    if (this.checkEndBattle()) {
      this.endBattle();
      return;
    }
    do {
      this.index += 1;
      if (this.index >= this.units.length) this.index = 0;
    } while (!this.units[this.index].living);

    // if (this.units[this.index]) {
    if (this.units[this.index] instanceof PlayerCharacter) {
      this.events.emit('PlayerSelect', this.index);
    } else {
      let r = 0;
      do {
        r = Math.floor(Math.random() * this.heroes.length);
      } while (!this.heroes[r].living);

      this.units[this.index].attack(this.heroes[r]);
      this.time.addEvent({ delay: 2000, callback: this.nextTurn, callbackScope: this });
    }
    // }
  }

  receivePlayerSelection(action, target) {
    if (action === 'attack') {
      this.units[this.index].attack(this.enemies[target]);
    }
    this.time.addEvent({ dalay: 3000, callback: this.nextTurn, callbackScope: this });
  }

  exitBattle() {
    this.scene.sleep('UIScene');
    this.scene.switch('WorldScene');
  }

  wake() {
    this.scene.run('UIScene');
    this.time.addEvent({
      delay: 2000, callback: this.exitBattle, callbackScope: this,
    });
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
    return victory || gameOver;
  }

  endBattle() {
    this.heroes.length = 0;
    this.enemies.length = 0;
    for (let i = 0; i < this.units.length; i += 1) {
      this.units[i].destroy();
    }
    this.units.length = 0;

    this.scene.sleep('UIScene');

    this.scene.switch('WorldScene');
  }

  startBattle() {
    const warrior = new PlayerCharacter(this, 600, 200, 'player', 1, 'Warrior', 100, 20);
    this.add.existing(warrior);

    const mage = new PlayerCharacter(this, 600, 300, 'player', 4, 'Mage', 80, 8);
    this.add.existing(mage);

    const dragonblue = new Enemy(this, 100, 200, 'dragonblue', null, 'Dragon', 50, 3);
    this.add.existing(dragonblue);

    const dragonOrrange = new Enemy(this, 100, 300, 'dragonOrrange', null, 'Dragon2', 50, 3);
    this.add.existing(dragonOrrange);

    this.heroes = [warrior, mage];

    this.enemies = [dragonblue, dragonOrrange];

    this.units = this.heroes.concat(this.enemies);

    this.index = -1;
    // this.scene.launch('UIScene');
    this.scene.run('UIScene');
  }
}
import Phaser from 'phaser';
import { PlayerCharacter, Enemy } from '../objects/game';

export default class BattleScene extends Phaser.Scene {
  constructor() {
    super('BattleScene');
  }

  create() {
    this.startBattle();

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
    const warrior = new PlayerCharacter(this, 600, 200, 'player', 4, 'Warrior', 100, 20);
    warrior.flipX = false;
    this.add.existing(warrior);

    const mage = new PlayerCharacter(this, 600, 300, 'mage', 4, 'Mage', 80, 8);
    mage.setScale(2);
    this.add.existing(mage);

    const dragonblue = new Enemy(this, 100, 200, 'dragonblue', null, 'Dragon 1', 50, 3);
    dragonblue.setScale(3);
    this.add.existing(dragonblue);

    const dragonOrrange = new Enemy(this, 100, 300, 'dragonOrrange', null, 'Dragon 2', 50, 3);
    dragonOrrange.setScale(3);
    this.add.existing(dragonOrrange);

    this.heroes = [warrior, mage];

    this.enemies = [dragonblue, dragonOrrange];

    this.units = this.heroes.concat(this.enemies);

    this.index = -1;
    this.scene.launch('UIScene');
  }
}
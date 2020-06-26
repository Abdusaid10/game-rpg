import Phaser from 'phaser';
import { PlayerCharacter, Enemy } from '../objects/game';

export default class BattleScene extends Phaser.Scene {
  constructor() {
    super('BattleScene');
  }

  create() {
    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');

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

    this.scene.launch('UIScene');

    this.index = -1;
  }

  nextTurn() {
    this.index += 1;

    if (this.index >= this.units.length) this.index = 0;
    if (this.units[this.index]) {
      if (this.units[this.index] instanceof PlayerCharacter) {
        this.events.emit('PlayerSelect', this.index);
      } else {
        const r = Math.floor(Math.random() * this.heroes.length);
        this.units[this.index].attack(this.heroes[r]);
        this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
      }
    }
  }

  receivePlayerSelection(action, target) {
    if (action === 'attack') {
      this.units[this.index].attack(this.enemies[target]);
    }
    this.time.addEvent({ dalay: 3000, callback: this.nextTurn, callbackScope: this });
  }
}
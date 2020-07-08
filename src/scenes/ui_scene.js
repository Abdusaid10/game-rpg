/* eslint-disable no-undef */
import 'phaser';
import { HeroesMenu, ActionsMenu, EnemiesMenu } from './battle_scene_menu';

const Message = new Phaser.Class({
  Extends: Phaser.GameObjects.Container,

  initialize: function Message(scene, events) {
    Phaser.GameObjects.Container.call(this, scene, 160, 20);
    const graphics = this.scene.add.graphics();
    this.add(graphics);
    graphics.lineStyle(1, 0xffffff, 0.8);
    graphics.fillStyle(0x031f4c, 0.3);
    graphics.strokeRect(100, 115, 300, 150);
    graphics.fillRect(100, 115, 300, 150);
    this.text = new Phaser.GameObjects.Text(scene, 250, 190, '', {
      color: '#ffffff', align: 'center', fontSize: 23, wordWrap: { width: 260, useAdvancedWrap: true },
    });
    this.add(this.text);
    this.text.setOrigin(0.5);
    events.on('Message', this.showMessage, this);
    this.visible = false;
  },

  showMessage(text) {
    this.text.setText(text);
    this.visible = true;
    if (this.hideEvent) this.hideEvent.remove(false);
    this.hideEvent = this.scene.time.addEvent(
      {
        delay: 2000,
        callback: this.hideMessage,
        callbackScope: this,
      },
    );
  },

  hideMessage() {
    this.hideEvent = null;
    this.visible = false;
  },
});

export default class UIScene extends Phaser.Scene {
  constructor() {
    super('UIScene');
  }

  create() {
    this.graphics = this.add.graphics();
    this.graphics.lineStyle(1, 0xffffff);
    this.graphics.fillStyle(0x031f4c, 1);
    this.graphics.strokeRect(20, 430, 240, 170);
    this.graphics.fillRect(20, 430, 240, 170);
    this.graphics.strokeRect(280, 430, 240, 170);
    this.graphics.fillRect(280, 430, 240, 170);
    this.graphics.strokeRect(540, 430, 240, 170);
    this.graphics.fillRect(540, 430, 240, 170);

    this.menus = this.add.container();

    this.heroesMenu = new HeroesMenu(550, 435, this);
    this.actionsMenu = new ActionsMenu(290, 435, this);
    this.enemiesMenu = new EnemiesMenu(30, 435, this);

    this.currentMenu = this.actionsMenu;

    this.menus.add(this.heroesMenu);
    this.menus.add(this.actionsMenu);
    this.menus.add(this.enemiesMenu);

    this.battleScene = this.scene.get('BattleScene');

    this.input.keyboard.on('keydown', this.onKeyInput, this);

    this.battleScene.events.on('PlayerSelect', this.onPlayerSelect, this);

    this.events.on('SelectEnemies', this.onSelectEnemies, this);

    this.events.on('Enemy', this.onEnemy, this);

    this.sys.events.on('wake', this.createMenu, this);

    this.message = new Message(this, this.battleScene.events);
    this.add.existing(this.message);

    this.createMenu();
  }

  onEnemy(index) {
    this.heroesMenu.deselect();
    this.actionsMenu.deselect();
    this.enemiesMenu.deselect();
    this.currentMenu = null;
    this.battleScene.receivePlayerSelection('attack', index);
  }

  onPlayerSelect(id) {
    this.heroesMenu.select(id);
    this.actionsMenu.select(0);
    this.currentMenu = this.actionsMenu;
  }

  onSelectEnemies() {
    this.currentMenu = this.enemiesMenu;
    this.enemiesMenu.select(0);
  }

  remapHeroes() {
    const { heroes } = this.battleScene;
    this.heroesMenu.remap(heroes);
  }

  remapEnemies() {
    const { enemies } = this.battleScene;
    this.enemiesMenu.remap(enemies);
  }

  onKeyInput(event) {
    if (this.currentMenu && this.currentMenu.selected) {
      if (event.code === 'ArrowUp') {
        this.currentMenu.moveSelectionUp();
      } else if (event.code === 'ArrowDown') {
        this.currentMenu.moveSelectionDown();
      // eslint-disable-next-line no-empty
      } else if (event.code === 'ArrowRight' || event.code === 'Shift') {

      } else if (event.code === 'Space' || event.code === 'ArrowLeft') {
        this.currentMenu.confirm();
      }
    }
  }

  createMenu() {
    this.remapHeroes();
    this.remapEnemies();

    this.battleScene.nextTurn();
  }
}

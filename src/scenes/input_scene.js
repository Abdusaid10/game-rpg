import Phaser from 'phaser';
import { setName } from '../models/userName';

export default class InputScene extends Phaser.Scene {
  constructor() {
    super('InputScene');
  }

  create() {
    this.input.on('dragstart', (pointer, gameObject) => {
      this.children.bringToTop(gameObject);
    }, this);

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    const text = this.add.text(300, 10, 'Please enter your name', { color: 'white', fontSize: '20px' });

    const element = this.add.dom(400, 0).createFromCache('nameform');

    element.addListener('click');
    element.on('click', (e) => {
      if (e.target.name === 'playButton') {
        const inputName = element.getChildByName('nameField');

        if (inputName.value !== '') {
          element.removeListener('click');

          element.setVisible(false);
          setName(inputName.value);

          this.input.stopPropagation();

          this.scene.sleep('InputScene');
          this.scene.start('WorldScene');
          // text.setText(`Welcome ${inputName.value}`);
        } else {
          this.scene.tweens.add({
            targets: text,
            alpha: 0.2,
            duration: 250,
            ease: 'Power3',
            yoyo: true,
          });
        }
      }
    });
    this.tweens.add({
      targets: element,
      y: 300,
      duration: 3000,
      ease: 'Power3',
    });
  }
}
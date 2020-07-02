import Phaser from 'phaser';
import Unit from '../models/unit';

const Enemy = new Phaser.Class({
  Extends: Unit,

  initialize:
  function Enemy(scene, x, y, texture, type, hp, damage) {
    Unit.call(this, scene, x, y, texture, type, hp, damage);
  },
});

const PlayerCharacter = new Phaser.Class({
  Extends: Unit,

  initialize: function PlayerCharacter(scene, x, y, texture, frame, type, hp, damage) {
    Unit.call(this, scene, x, y, texture, frame, type, hp, damage);

    // flip image
    this.flipX = true;

    this.setScale(2);
  },
});
export { Enemy, PlayerCharacter };
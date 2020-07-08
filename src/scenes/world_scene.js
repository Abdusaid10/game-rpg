/* eslint-disable no-undef */
import Phaser from 'phaser';
import { getScore } from '../modules/score';
import BattleScene from './battle_scene';
import UIScene from './ui_scene';

export default class WorldScene extends Phaser.Scene {
  constructor() {
    super('WorldScene');
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    const tiles = map.addTilesetImage('spritesheet', 'tiles');
    // eslint-disable-next-line no-unused-vars
    const grass = map.createStaticLayer('Grass', tiles, 0, 0);

    const obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);
    // obstacles.setScale(2);
    obstacles.setCollisionByExclusion([-1]);

    this.graphics = this.add.graphics();
    this.graphics.lineStyle(1, 0xffffff, 0.8);
    this.graphics.fillStyle(0x031f4c, 0.3);
    this.graphics.strokeRect(5, 5, 100, 15);
    this.graphics.fillRect(5, 5, 100, 15);

    this.scoreText = this.add.text(6, 6, `Score: ${getScore()}`, { fontSize: '14px', fill: '#fff' });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { frames: [4, 3, 4, 5] }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { frames: [7, 6, 7, 8] }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { frames: [10, 9, 10, 11] }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { frames: [1, 0, 1, 2] }),
      frameRate: 10,
      repeat: -1,
    });

    // add player
    this.player = this.physics.add.sprite(50, 100, 'player', 6);
    this.player.setScale(0.5);

    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    // add collision for obstacles
    this.physics.add.collider(this.player, obstacles);

    // make the camera to follow player
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.zoom = 2;
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;


    this.cursors = this.input.keyboard.createCursorKeys();

    // zones for enemies
    this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Sprite });

    for (let i = 0; i < 10; i += 1) {
      const x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      const y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
      this.spawns.create(x, y, this.getEnemySprite());
    }
    this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);

    this.sys.events.on('wake', this.wake, this);
  }

  getEnemySprite() {
    this.enemy_sprites = ['dragonblue', 'dragonOrrange'];
    return this.enemy_sprites[Math.floor(Math.random() * this.enemy_sprites.length)];
  }

  update() {
    this.player.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-80);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(80);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-80);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(80);
    }

    if (this.cursors.left.isDown) {
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.anims.play('right', true);
    } else if (this.cursors.up.isDown) {
      this.player.anims.play('up', true);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play('down', true);
    } else {
      this.player.anims.stop();
    }
  }

  wake() {
    this.scoreText.setText(`Score: ${getScore()}`);

    this.cursors.left.reset();
    this.cursors.right.reset();
    this.cursors.up.reset();
    this.cursors.down.reset();
  }

  onMeetEnemy(player, zone) {
    // move zone
    zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

    // shake the world
    this.cameras.main.shake(300);

    this.input.stopPropagation();
    // start battle
    this.scene.add('BattleScene', BattleScene);
    this.scene.add('UIScene', UIScene);

    this.scene.sleep('WorldScene');
    this.scene.launch('BattleScene');
  }
}
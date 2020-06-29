import Phaser from 'phaser';

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

    // add player
    this.player = this.physics.add.sprite(50, 100, 'player', 6);
    this.player.setScale(0.5);
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

    // zones for enemies
    this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
    this.enemies = this.add.group({
      key: 'dragonblue',
      repeat: 20,
      setXY: {
        x: Phaser.Math.RND.between(0, this.physics.world.bounds.width),
        y: Phaser.Math.RND.between(0, this.physics.world.bounds.height),
        stepX: 80,
        stepY: 20,
      },
    });
    // for (let i = 0; i < 2; i += 1) {
    //   const x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    //   const y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
    //   this.spawns.create(x, y, 10, 20);
    // }
    this.physics.add.overlap(this.player, this.enemies, this.onMeetEnemy, false, this);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.sys.events.on('wake', this.wake, this);
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
      // this.player.flipX = true;
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      // this.player.flipX = false;
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
    this.cursors.left.reset();
    this.cursors.right.reset();
    this.cursors.up.reset();
    this.cursors.down.reset();
  }

  onMeetEnemy(player, zone) {
    // move zone
    // zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    // zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

    // shake the world
    this.cameras.main.shake(300);

    // start battle
    this.scene.switch('BattleScene');
  }
}
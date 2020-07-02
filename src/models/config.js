import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 800,
  height: 600,
  backgroundColor: '#222288',
  dom: {
    createContainer: true,
  },
  autoCenter: true,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
};

export { config as default };
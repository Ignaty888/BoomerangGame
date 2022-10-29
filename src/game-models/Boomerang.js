// Бумеранг является оружием.
// В дальнейшем можно добавить другое оружие.
// Тогда можно будет создать класс Weapon и воспользоваться наследованием!
const Game = require('../Game');
const Enemy = require('./Enemy');
const Hero = require('./Hero');

class Boomerang {
  constructor() {
    this.skin = '🌀';
    this.hero = new Hero();
    // this.track = new Game();
    this.enemy = new Enemy();
    this.position = this.hero.position + 1;
    this.back = false;
    this.start = false;
    this.stop = false;
  }

  fly() {
    if (this.position <= this.enemy.position && this.back === false && this.start === true) {
      this.moveRight();
    } else if (this.back === true) {
      this.moveLeft();
    }
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  moveRight() {
    // Идём вправо.
    this.position += 1;
  }
}

module.exports = Boomerang;

// Наш герой.

class Hero {
  constructor(position = 5) {
    this.skin = '🤠'; // можете использовать любые emoji '💃'
    this.position = position;
    this.points = 0;
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  moveRight() {
    // Идём вправо.
    this.position += 1;
  }

  attack() {
    // Атакуем.
    this.boomerang.fly();
  }

  boomLose() {
    this.skin = '💀';
    console.log('Вы потеряли оружие');
  }

  pointsCheck() {
    this.points += 1;
  }

  die() {
    this.skin = '💀';
    console.log('YOU ARE DEAD!💀');
    process.exit();
  }
}

module.exports = Hero;

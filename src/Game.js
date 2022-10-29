// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
// const Boomerang = require('./game-models/Boomerang');
const View = require('./View');
const Boomerang = require('./game-models/Boomerang');
const runInteractiveConsole = require('./keyboard');

// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

class Game {
  constructor({
    trackLength,
  }) {
    this.trackLength = trackLength;
    this.hero = new Hero(); // Герою можно аргументом передать бумеранг.
    this.enemy = new Enemy();
    this.view = new View();
    this.boom = new Boomerang();
    // this.key = new Key();
    this.track = [];
    this.regenerateTrack();
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = (new Array(this.trackLength)).fill(' ');
    this.track[this.hero.position] = this.hero.skin;
    this.track[this.enemy.position] = this.enemy.skin;
    this.track[this.boom.position] = this.boom.skin;
  }

  check() {
    if (this.hero.position >= this.enemy.position) {
      this.hero.die();
    }
    if (this.boom.position >= this.enemy.position) {
      this.boom.back = true;
      this.boom.start = false;
      this.enemy = new Enemy();
    } else if (this.boom.position === this.hero.position + 1) {
      this.boom.back = false;
    } else if (this.boom.position === this.hero.position - 1) {
      this.boom.back = false;
    }
  }

  play() {
    runInteractiveConsole(this.hero, this.boom);
    setInterval(() => {
      // Let's play!
      this.check();
      this.regenerateTrack();
      this.view.render(this.track);
      // runInteractiveConsole(this.boom);
      this.enemy.moveLeft();
      this.boom.fly();
      if (this.boom.position === this.hero.position - 1) {
        this.hero.boomLose();
      } else { this.hero.skin = '🤠'; }
      if (this.boom.position >= this.enemy.position) {
        this.hero.pointsCheck()
      }
      console.log(`Ваш счет ${this.hero.points}`);
    }, 200);
  }
}

module.exports = Game;

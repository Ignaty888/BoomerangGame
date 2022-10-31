// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
// const Boomerang = require('./game-models/Boomerang');
const View = require('./View');
const Boomerang = require('./game-models/Boomerang');
const runInteractiveConsole = require('./keyboard');
const { User } = require('../db/models');
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
    this.name = process.argv[2];
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = (new Array(this.trackLength)).fill(' ');
    this.track[this.hero.position] = this.hero.skin;
    this.track[this.enemy.position] = this.enemy.skin;
    this.track[this.boom.position] = this.boom.skin;
  }

  async base() {
    await User.create({
      username: this.name,
      count: this.hero.points,
    });
    const table = await User.findAll({
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      order: [
        ['count', 'DESC'],
      ],
      limit: 5,
    });
    console.log('Таблица лидеров:');
    table.forEach((el, i) => console.log(`позиция:${i + 1} имя: ${el.username} очки: ${el.count}`));

    this.hero.die();
  }

  async check() {
    if (this.hero.position >= this.enemy.position) {
      this.hero.die();
    }
    if (this.boom.position >= this.enemy.position) {
      this.boom.back = true;
      this.boom.start = false;
      this.enemy = new Enemy();
    } else if (this.boom.position === this.hero.position + 1) {
      this.boom.back = false;
    } else if (this.boom.position === this.hero.position - 2) {
      this.boom.back = false;
    }
  }

  async play() {
    runInteractiveConsole(this.hero, this.boom);

    const stop = setInterval(() => {
      // Let's play
      this.check();
      this.regenerateTrack();
      this.view.render(this.track);
      this.enemy.moveLeft();
      this.boom.fly();
      if (this.boom.position <= this.hero.position - 1) {
        this.hero.boomLose();
      } else { this.hero.skin = '🤠'; }
      if (this.boom.position >= this.enemy.position) {
        this.hero.pointsCheck();
      }
      if (this.hero.position >= this.enemy.position) {
        clearInterval(stop);
        this.base();
      }
      console.log(`${this.name}, ваш счет: ${this.hero.points}`);
    }, 40);
  }
}
module.exports = Game;

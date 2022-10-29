// Основной файл.
// Запускает игру.
const readlineSync = require('readline-sync');
const Game = require('./src/Game');

const name = readlineSync.question('Введите имя \n>');
// Инициализация игры с настройками.
const game = new Game({
  trackLength: 30,
});

// Запуск игры.
game.play();

// Основной файл.
// Запускает игру.

const Game = require('./src/Game');
// const name= require('./name')

// const name = readlineSync.question('Введите имя \n>');
// Инициализация игры с настройками.
const game = new Game({
  trackLength: 30,
});
// Запуск игры.

game.play();

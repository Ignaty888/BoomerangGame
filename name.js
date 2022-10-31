const { User } = require('./db/models');
const readlineSync = require('readline-sync').question('Введите имя \n >');
const Game = require('./src/Game.js');

module.exports = readlineSync;

const base = async () => {
  try {
    const newItem = await User.create({
      username: readlineSync,
      count: point,

    });
  } catch (error) {
    console.log(error.message);
  }
};
base();

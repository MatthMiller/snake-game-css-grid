import ItemCreator from './ItemCreator.js';
import Snake from './Snake.js';
import initBoard from './initBoard.js';
import initResize from './initResize.js';

class Game {
  gameVelocityMs = 300;

  constructor() {
    this._run();
    setInterval(this._update.bind(this), this.gameVelocityMs);
  }

  _run() {
    initBoard();
    initResize();
    this.snake = new Snake();
    this.itemCreator = new ItemCreator(this.snake.snakePositions);

    console.log('run for the first time');
  }

  _update() {
    this.snake.renderSnake();
    this.itemCreator.renderItems(this.snake.snakePositions);

    // console.log('ticking');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new Game();
});

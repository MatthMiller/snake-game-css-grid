import BOARD_SIZE from '../config.js';

class Snake {
  snakePositions = [];
  actualDirection = 'up';
  isGameOver = false;
  addNewTailNextTick = false;
  score = 0;

  constructor() {
    this.init();
    this.renderSnake();
  }

  setRandomInitialPosition() {
    const marginFromCorner = 4;
    const notAtCorner = BOARD_SIZE - marginFromCorner;
    const getRandomPosition = () =>
      Math.floor(
        Math.random() * (notAtCorner - marginFromCorner + 1) + marginFromCorner
      );
    const randomPosition = { x: getRandomPosition(), y: getRandomPosition() };

    this.snakePositions.push(randomPosition);
  }

  renderSnake() {
    document.querySelectorAll('.snake-tail').forEach((actualTile) => {
      actualTile.classList.remove('snake-tail');
      actualTile.classList.remove('snake-head');
    });

    if (this.isGameOver === true) return;

    this.collisionCheck();
    this.lastDirection = this.actualDirection;
    this.setNextSnakePositions(this.actualDirection);

    this.snakePositions.forEach((actualPosition, index) => {
      const actualSnakeTile = this.findTileWithSnakeElement(actualPosition);
      actualSnakeTile.classList.add('snake-tail');

      if (index === 0) {
        actualSnakeTile.classList.add('snake-head');
      }
    });

    if (this.addNewTailNextTick) {
      this.addNewTailNextTick = false;
    }

    this.updateScore();
  }

  findTileWithSnakeElement(position) {
    const tiles = document.querySelectorAll('.tile');
    const specificTile = [...tiles].filter(({ dataset }) => {
      const actualTilePosition = this.datasetPositionToObject(dataset.position);
      return (
        position.x === actualTilePosition.x &&
        position.y === actualTilePosition.y
      );
    })[0];

    return specificTile;
  }

  datasetPositionToObject(datasetString) {
    const [x, y] = datasetString.split(' ').map(Number);
    return { x, y };
  }

  updateScore() {
    const scoreElement = document.querySelector('#js-score');
    scoreElement.innerText = this.putZeroAtLeft(this.score);
  }

  setNextSnakePositions(direction) {
    let lastTailPosition = {
      ...this.snakePositions[this.snakePositions.length - 1],
    };

    this.snakePositions = this.snakePositions.map((actualPosition, index) => {
      if (index === 0) {
        switch (direction) {
          case 'up':
            return { x: actualPosition.x, y: actualPosition.y - 1 };
          case 'down':
            return { x: actualPosition.x, y: actualPosition.y + 1 };
          case 'left':
            return { x: actualPosition.x - 1, y: actualPosition.y };
          case 'right':
            return { x: actualPosition.x + 1, y: actualPosition.y };
          default:
            return actualPosition;
        }
      } else {
        return this.snakePositions[index - 1];
      }
    });

    if (this.addNewTailNextTick) {
      this.addNewTail(lastTailPosition);
      this.addNewTailNextTick = false;
    }
  }

  collisionCheck() {
    const head = this.snakePositions[0];
    const actualTile = this.findTileWithSnakeElement({
      x: head.x,
      y: head.y,
    });

    if (actualTile.classList.contains('item')) {
      actualTile.classList.remove('item');
      this.score += 125;

      this.addNewTailNextTick = true;
    }

    const isSnakeTail = this.snakePositions.filter((position, index) => {
      if (index !== 0) {
        return position.x === head.x && position.y === head.y;
      }
    });

    if (isSnakeTail.length) {
      alert('Colidiu com o próprio corpo!');
      this.actualDirection = 'none';
      this.isGameOver = true;

      location.reload();
    }

    if (actualTile.classList.contains('isWall')) {
      alert('Encostou na parede! Perdeu!');
      this.actualDirection = 'none';
      this.isGameOver = true;

      location.reload();
    }
  }

  addNewTail(position) {
    this.snakePositions.push(position);
  }

  handleKeyboardPress({ keyCode }) {
    if (keyCode == '40') {
      if (this.lastDirection === 'up') return;
      this.actualDirection = 'down';
      this.changeDirectionClassForHead('down');
    }
    if (keyCode == '38') {
      if (this.lastDirection === 'down') return;
      this.actualDirection = 'up';
      this.changeDirectionClassForHead('up');
    }
    if (keyCode == '37') {
      if (this.lastDirection === 'right') return;
      this.actualDirection = 'left';
      this.changeDirectionClassForHead('left');
    }
    if (keyCode == '39') {
      if (this.lastDirection === 'left') return;
      this.actualDirection = 'right';
      this.changeDirectionClassForHead('right');
    }

    console.log(this.actualDirection);
  }

  handleTouchGestures(type) {
    if (type == 'panup') {
      if (this.lastDirection === 'down') return;
      this.actualDirection = 'up';
      this.changeDirectionClassForHead('up');
    }
    if (type == 'pandown') {
      if (this.lastDirection === 'up') return;
      this.actualDirection = 'down';
      this.changeDirectionClassForHead('down');
    }
    if (type == 'panleft') {
      if (this.lastDirection === 'right') return;
      this.actualDirection = 'left';
      this.changeDirectionClassForHead('left');
    }
    if (type == 'panright') {
      if (this.lastDirection === 'left') return;
      this.actualDirection = 'right';
      this.changeDirectionClassForHead('right');
    }

    console.log(this.actualDirection);
  }

  changeDirectionClassForHead(direction) {
    document.body.classList = '';
    document.body.classList.add('direction-' + direction);
  }

  putZeroAtLeft = (n) => {
    return String(n).length !== 5
      ? '0'.repeat(5 - String(n).length) + `${n}`
      : n;
  };

  init() {
    console.log(this.putZeroAtLeft(50000));
    this.setRandomInitialPosition();
    window.addEventListener('keydown', this.handleKeyboardPress.bind(this));

    const mc = new Hammer(document.body);

    mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

    mc.on('panleft panright panup pandown', (event) => {
      this.handleTouchGestures(event.type);
    });
  }
}

export default Snake;

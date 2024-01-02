import BOARD_SIZE from '../config.js';

class ItemCreator {
  constructor(snakePositions) {
    this.snakePositions = snakePositions;

    this.createItem();
  }

  createItem() {
    console.log('snakePositions from items context:', this.snakePositions);

    const randomTile = this.getRandomTile();
    randomTile.classList.add('item');
    randomTile.classList.add(
      'item-' + String(Math.floor(Math.random() * (2 - 1 + 1) + 1))
    );
  }

  getRandomTile() {
    const marginFromCorner = 2;
    const notAtCorner = BOARD_SIZE - marginFromCorner;
    const tiles = document.querySelectorAll(
      '.tile:not(.isWall):not(.snake-tail)'
    );
    const availableTiles = [...tiles].filter((actualTile) => {
      const actualTilePosition = this.datasetPositionToObject(
        actualTile.dataset.position
      );
      return (
        actualTilePosition.x >= 2 &&
        actualTilePosition.x <= notAtCorner &&
        actualTilePosition.y >= 2 &&
        actualTilePosition.y <= notAtCorner
      );
    });

    const randomTile =
      availableTiles[Math.floor(Math.random() * availableTiles.length)];
    return randomTile;
  }

  checkIfHasItems() {
    return document.querySelectorAll('.item').length !== 0;
  }

  renderItems(snakePositions) {
    this.snakePositions = snakePositions;

    if (!this.checkIfHasItems()) {
      // console.log('Não tem itens');
      this.createItem();
    } else {
      // console.log('Tem itens');
    }
  }

  datasetPositionToObject(datasetString) {
    const [x, y] = datasetString.split(' ').map(Number);
    return { x, y };
  }

  init() {
    this.createItem(snakePositions);
  }
}

export default ItemCreator;

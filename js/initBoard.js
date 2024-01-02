import BOARD_SIZE from '../config.js';

const initBoard = () => {
  const board = document.querySelector('#js-board');

  const boardLength = BOARD_SIZE;

  let columnCounter = 1;
  for (; columnCounter <= boardLength; columnCounter++) {
    const divColumn = document.createElement('div');
    divColumn.dataset.column = `${columnCounter}`;
    divColumn.classList.add('column');

    let rowCounter = 1;
    for (
      let tempRowCounter = 1;
      tempRowCounter <= boardLength;
      tempRowCounter++
    ) {
      const tileElement = document.createElement('div');

      if (
        columnCounter === 1 ||
        columnCounter === boardLength ||
        rowCounter === 1 ||
        rowCounter === boardLength
      ) {
        tileElement.classList.add('isWall');
      }
      tileElement.classList.add('tile');
      tileElement.dataset.position = `${columnCounter} ${rowCounter}`;

      divColumn.appendChild(tileElement);
      rowCounter++;
    }
    board.appendChild(divColumn);
  }
};

export default initBoard;

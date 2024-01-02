import BOARD_SIZE from '../config.js';

const initResize = () => {
  const marginLeftAndRight = 20;
  const mediaQueryMaxWidth = 550;
  let possibleWidths = [];

  for (let counter = 100; counter <= mediaQueryMaxWidth; counter++) {
    const isPossibleChangeSquares =
      (counter + marginLeftAndRight) % BOARD_SIZE === 0;

    if (isPossibleChangeSquares) {
      const sizeObject = {
        width: counter + marginLeftAndRight,
        squareSize: (counter + marginLeftAndRight) / 16,
      };
      possibleWidths.push(sizeObject);
    }
  }
  console.log(possibleWidths);

  const handleResize = () => {
    if (window.screen.width <= mediaQueryMaxWidth) {
      const boardElement = document.querySelector('.board');
      const columnsElements = document.querySelectorAll('.column');
      const topInfoElement = document.querySelector('.top-info');

      const widths = possibleWidths
        .map((actualWidth) => {
          if (window.screen.width >= actualWidth.width) {
            return actualWidth.width;
          }
        })
        .filter((x) => x !== undefined);
      const blockSizes = possibleWidths
        .map((actualWidth) => {
          if (window.screen.width >= actualWidth.width) {
            return actualWidth.squareSize;
          }
        })
        .filter((x) => x !== undefined);

      const maxWidth = Math.max(...widths);
      const maxBlockSize = Math.max(...blockSizes);
      console.log(maxWidth, maxBlockSize);

      // Aplicar o tamanho dos quadrados dinamicamente
      boardElement.style.gridTemplateColumns = `repeat(auto-fit, ${maxBlockSize}px)`;
      columnsElements.forEach((column) => {
        column.style.gridTemplateRows = `repeat(16, ${maxBlockSize}px)`;
      });

      topInfoElement.style.width = `${maxWidth}px`;
    }
  };

  handleResize();

  window.addEventListener('resize', handleResize);
};

export default initResize;

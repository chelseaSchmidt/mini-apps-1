//CONTROLLER
//event listeners for clicks on cells
let cellElements = document.getElementsByClassName('board-cell');
cellElements = [...cellElements];
cellElements.forEach((cell) => {
  cell.addEventListener('click', (event) => {
    event.target.append('X');
  });
});
  //on click, place an X or O in target cell in VIEW and MODEL
    //check for win or tie
    //change whose turn it is

//event listener for reset button click
  //on click, empty all cells in VIEW and MODEL

//MODEL
const model = {
  player: 'X',
  board: [
    ['','',''],
    ['','',''],
    ['','',''],
  ],
  checkForWinOrTie: () => {

  },
  resetModel: () => {

  },
  changeTurn: () => {

  }
};


//VIEW
const view = {
  renderClick: (player) => {

  },
  changeDisplayedTurn: () => {

  },
  resetBoard: () => {

  },
  showWinOrTie: () => {

  }
};
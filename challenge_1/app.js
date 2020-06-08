//CONTROLLER
//event listeners for clicks on cells
let cellElements = document.getElementsByClassName('board-cell');
cellElements = [...cellElements];
cellElements.forEach((cell) => {
  cell.addEventListener('click', (event) => {
    view.renderClick(model.player, event.target);
    model.changeTurn();
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
    if (model.player === 'X') {
      model.player = 'O';
    } else {
      model.player = 'X';
    }
  }
};


//VIEW
const view = {
  renderClick: (player, eventTarget) => {
    console.log('click!');
    eventTarget.append('X');
  },
  changeDisplayedTurn: () => {

  },
  resetBoard: () => {

  },
  showWinOrTie: () => {

  }
};
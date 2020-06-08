//CONTROLLER
//event listeners for clicks on cells
let cellElements = document.getElementsByClassName('board-cell');
cellElements = [...cellElements];
cellElements.forEach((cell) => {
  cell.addEventListener('click', (event) => {
    model.placeMarker(model.player, event.target);
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
  rows: {
    A: 0,
    B: 1,
    C: 2
  },
  columns: {
    1: 0,
    2: 1,
    3: 2
  },
  placeMarker: (player, targetCell) => {
    const row = model.rows[targetCell.id[0]];
    const column = model.columns[targetCell.id[1]];
    model.board[row][column] = player;
    view.renderClick(player, targetCell);
    model.checkForWinOrTie();
  },
  checkForWinOrTie: () => {
    //if game has not ended
      model.changeTurn();
  },
  resetModel: () => {

  },
  changeTurn: () => {
    if (model.player === 'X') {
      model.player = 'O';
      view.changeDisplayedTurn('O');
    } else {
      model.player = 'X';
      view.changeDisplayedTurn('X');
    }
  }
};


//VIEW
const view = {
  renderClick: (player, eventTarget) => {
    console.log('click!');
    eventTarget.append(player);
  },
  changeDisplayedTurn: (newPlayer) => {
    const turnTracker = document.getElementById('turn-tracker');
    turnTracker.innerHTML = `Player ${newPlayer}'s Turn`;
  },
  resetBoard: () => {

  },
  showWinOrTie: () => {

  }
};
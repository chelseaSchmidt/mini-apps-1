//CONTROLLER
let cellElements = document.getElementsByClassName('board-cell');
cellElements = [...cellElements];
cellElements.forEach((cell) => {
  cell.addEventListener('click', (event) => {
    model.placeMarker(model.player, event.target);
  });
});

//event listener for reset button click
  //on click, empty all cells in VIEW and MODEL

//MODEL
const model = {
  player: 'X',

  gameCompleted: false,

  board: [
    ['','',''],
    ['','',''],
    ['','',''],
  ],

  columns: {
    A: 0,
    B: 1,
    C: 2
  },

  rows: {
    1: 0,
    2: 1,
    3: 2
  },

  placeMarker: (player, targetCell) => {
    const row = model.rows[targetCell.id[1]];
    const column = model.columns[targetCell.id[0]];
    const position = model.board[row][column];

    if (position === 'X' || position === 'O') {
      alert('This spot has already been taken! Please try again.');

    } else if (model.gameCompleted) {
      alert('The game has been completed! Please start a new game to continue.');

    } else {
      model.board[row][column] = player;
      view.renderClick(player, targetCell);
      model.checkForWinOrTie();
    }
  },

  checkForWinOrTie: () => {
    //Winning combinations
    //Row win:
    model.board.forEach(row => {
      let xSpots = 0;
      let oSpots = 0;
      row.forEach(cell => {
        if (cell === 'X') {
          xSpots++;
        } else if (cell === 'O') {
          oSpots++;
        }
      });
      if (xSpots === 3) {
        model.gameCompleted = true;
        view.showWinOrTie('X');
      } else if (oSpots === 3) {
        model.gameCompleted = true;
        view.showWinOrTie('O');
      }
    });
    //Column win:
    const columns = [];
    columns.push(model.board.map(row => row[0]));
    columns.push(model.board.map(row => row[1]));
    columns.push(model.board.map(row => row[2]));
    columns.forEach(col => {
      let xSpots = 0;
      let oSpots = 0;
      col.forEach(cell =>{
        if (cell === 'X') {
          xSpots++;
        } else if (cell === 'O') {
          oSpots++;
        }
      });
      if (xSpots === 3) {
        model.gameCompleted = true;
        view.showWinOrTie('X');
      } else if (oSpots === 3) {
        model.gameCompleted = true;
        view.showWinOrTie('O');
      }
    });


    //Diagonals:
    //if A1, B2, and C3 have same non-empty char
    //if A3, B2, and C1 have same non-empty char

    //Tie combinations
    //if all rows have at least 2 pieces placed and they are a mixture
      //if all columns have at least 2 pieces placed and they are a mixture
        //if all diagonals have at least 2 pieces placed and they are a mixture
          //call a tie


    //else
      model.changeTurn();
  },

  changeTurn: () => {
    if (model.player === 'X') {
      model.player = 'O';
      view.changeDisplayedTurn('O');
    } else {
      model.player = 'X';
      view.changeDisplayedTurn('X');
    }
  },

  resetModel: () => {

  }
};


//VIEW
const view = {
  renderClick: (player, eventTarget) => {
    eventTarget.append(player);
  },

  changeDisplayedTurn: (newPlayer) => {
    const turnTracker = document.getElementById('turn-tracker');
    turnTracker.innerHTML = `Player ${newPlayer}'s Turn`;
  },

  showWinOrTie: (winner) => {
    console.log('the winner is: ' + winner);
  },

  resetBoard: () => {

  }
};
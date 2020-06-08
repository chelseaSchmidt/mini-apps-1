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
        view.showWinOrTie('X', false);
      } else if (oSpots === 3) {
        model.gameCompleted = true;
        view.showWinOrTie('O', false);
      }
    });

    if (model.gameCompleted) {
      return;
    }

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
        view.showWinOrTie('X', false);
      } else if (oSpots === 3) {
        model.gameCompleted = true;
        view.showWinOrTie('O', false);
      }
    });

    if (model.gameCompleted) {
      return;
    }

    //Major diagonal win:
    const A1 = model.board[model.rows[1]][model.columns.A];
    const B2 = model.board[model.rows[2]][model.columns.B];
    const C3 = model.board[model.rows[3]][model.columns.C];
    if (A1.length > 0) {
      if (A1 === B2 && B2 === C3) {
        model.gameCompleted = true;
        return view.showWinOrTie(A1, false);
      }
    }

    //Minor diagonal win:
    const A3 = model.board[model.rows[3]][model.columns.A];
    const C1 = model.board[model.rows[1]][model.columns.C];
    if (A3.length > 0) {
      if (A3 === B2 && B2 === C1) {
        model.gameCompleted = true;
        return view.showWinOrTie(A3, false);
      }
    }

    //Tie combinations
    //if all rows have at least 2 pieces placed and they are a mixture
    const isEachRowMixed = model.board.map(row => {
      let xPresent = false;
      let oPresent = false;
      const count = row.reduce((total, marker) => {
        if (marker !== '') {
          if (marker === 'X') {
            xPresent = true;
          } else {
            oPresent = true;
          }
          return ++total;
        } else {
          return total;
        }
      }, 0);
      console.log(xPresent, oPresent);
      if (count >= 2 && xPresent && oPresent) {
        return true;
      } else {
        return false;
      }
    });
    console.log(isEachRowMixed);
    const rowsTied = isEachRowMixed.reduce((priorRowsAreMixed, rowIsMixed) => {
      if (priorRowsAreMixed) {
        if (rowIsMixed) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });

    if (rowsTied) {
      //if all columns have at least 2 pieces placed and they are a mixture
        //if all diagonals have at least 2 pieces placed and they are a mixture
          //call a tie
          model.gameCompleted = true;
          view.showWinOrTie(null, true);
    } else {
      model.changeTurn();
    }
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

  showWinOrTie: (winner, wasTie) => {
    const turnTracker = document.getElementById('turn-tracker');
    if (wasTie) {
      turnTracker.innerHTML = `It's a Tie!`;
    } else {
      turnTracker.innerHTML = `Player ${winner} Has Won the Game!`;
    }
  },

  resetBoard: () => {

  }
};
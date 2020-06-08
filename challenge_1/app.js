//CONTROLLER
const initialize = () => {
  let cellElements = document.getElementsByClassName('board-cell');
  cellElements = [...cellElements];
  cellElements.forEach((cell) => {
    cell.addEventListener('click', (event) => {
      model.placeMarker(model.player, event.target);
    });
  });

  let newGameButton = document.getElementById('new-game');
  newGameButton.addEventListener('click', () => {
    model.resetModel();
    view.resetBoard();
  });
}

initialize();

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

  spotsUsed: 0,

  placeMarker: (markerPlaced, targetCell) => {
    const row = model.rows[targetCell.id[1]];
    const column = model.columns[targetCell.id[0]];
    const position = model.board[row][column];

    if (model.gameCompleted) {
      alert('The game has been completed! Please start a new game to continue.');

    } else if (position !== '') {
      alert('This spot has already been taken! Please try again.');

    } else {
      model.board[row][column] = markerPlaced;
      model.spotsUsed++;
      view.renderClick(markerPlaced, targetCell);
      model.checkForWinOrTie();
    }
  },

  checkForWinOrTie: () => {

    //Row win:
    model.board.forEach(row => {
      if (row[0] !== '') {
        if (row[0] === row[1]) {
          if (row[1] === row[2]) {
            model.gameCompleted = true;
            view.showWinOrTie(row[0], false);
          }
        }
      }
    });

    if (model.gameCompleted) {
      return;
    }

    //Column win:
    const columns = [];
    for (let i = 0; i < 3; i++) {
      columns.push(model.board.map(row => row[i]));
    }
    columns.forEach(col => {
      if (col[0] !== '') {
        if (col[0] === col[1]) {
          if (col[1] === col[2]) {
            model.gameCompleted = true;
            view.showWinOrTie(col[0], false);
          }
        }
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

    //if no spots left on board and win condition hasn't been met
    if (model.spotsUsed === 9) {
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
    model.board = [
      ['','',''],
      ['','',''],
      ['','',''],
    ];
    model.player = 'X';
    model.gameCompleted = false;
    model.spotsUsed = 0;
  }

};


//VIEW
const view = {
  turnTracker: document.getElementById('turn-tracker'),

  renderClick: (player, eventTarget) => {
    eventTarget.append(player);
  },

  changeDisplayedTurn: (newPlayer) => {
    view.turnTracker.innerHTML = `Player ${newPlayer}'s Turn`;
  },

  showWinOrTie: (winner, wasTie) => {
    if (wasTie) {
      view.turnTracker.innerHTML = `It's a Tie!`;
    } else {
      view.turnTracker.innerHTML = `Player ${winner} Has Won the Game!`;
    }
  },

  resetBoard: () => {
    let cellElements = document.getElementsByClassName('board-cell');
    cellElements = [...cellElements];
    cellElements.forEach(cell => {
      cell.innerHTML = '';
    });
    view.changeDisplayedTurn('X');
  }
};
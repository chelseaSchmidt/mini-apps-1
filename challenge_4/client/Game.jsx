import React from 'react';
import Row from './Row.jsx';
import Bar from './Bar.jsx';
import Player from './Player.jsx';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ],
      player: 1,
      gameCompleted: false,
      winner: null
    }
  }

  dropPiece(event) {
    if (this.state.gameCompleted) {
      alert('The game has been completed');
      return;
    }
    const validButtons = ['D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6'];
    if (validButtons.indexOf(event.target.id) > -1) {
      const col = event.target.id.slice(1);
      let board = this.state.board;
      let nextPlayer;

      if (this.state.player === 1) {
        nextPlayer = 2;
      } else {
        nextPlayer = 1;
      }

      for (let row = 5; row >= 0; row--) {
        if (board[row][col] === 0) {
          board[row][col] = this.state.player;

          const status = this.checkForWinOrTie(board);
          let gameCompletedStatus = false;
          let winningPlayer = null;

          if (status === 'tie') {
            gameCompletedStatus = true;
          } else if (status) {
            gameCompletedStatus = true;
            winningPlayer = this.state.player;
          }

          this.setState({
            board: board,
            player: nextPlayer,
            gameCompleted: gameCompletedStatus,
            winner: winningPlayer
          });

          break;
        }
      }
    }
  }

  checkForWinOrTie(board) {

    let winFound = false;
    board.forEach(row => {
      if (this.checkForRowOrColWin(row)) {
        winFound = true;
      }
    });
    if (winFound) {
      return true;
    }

    for (let colidx = 0; colidx < 6; colidx++) {
      let column = board.map(row => {
        return row[colidx];
      });
      if (this.checkForRowOrColWin(column)) {
        winFound = true;
      }
    }
    if (winFound) {
      return true;
    }
    //Diagonals

    //at end, pass full board into checkForTie
    if (this.checkForTie(board)) {
      return 'tie';
    }
    return false;
  }

  checkForRowOrColWin(rowOrCol) {
    const scores = rowOrCol.reduce((counts, piece, i) => {

      let interimScores = Object.values(counts);
      let lastPiece = rowOrCol[i-1];

      if (interimScores.indexOf(4) > -1) {
        return counts;

      } else if (lastPiece === piece) {
        counts[piece]++;

      } else {
        counts = {0: 0, 1: 0, 2: 0};
        counts[piece]++;
      }
      return counts;

    }, {0: 0, 1: 0, 2: 0});

    for (let player in scores) {
      if (scores[player] === 4 && player !== '0') {
        return true;
      }
    }
    return false;
  }

  checkForMajorDiagonalWin() {

  }

  checkForMinorDiagonalWin() {

  }

  checkForTie(board) {
    //reduce board to object of 1, 2, and 0 counts
    //if 0 counts is 0, return true
    const openSpots = board.reduce((totalCount, row) => {
      return totalCount + row.reduce((subCount, piece) => {
        if (piece === 0) {
          return subCount + 1;
        } else {
          return subCount;
        }
      }, 0);
    }, 0);
    console.log(openSpots);
    return openSpots === 0;
  }

  render() {
    return (
      <div id="board-container">
        <Player player={this.state.player} gameCompleted={this.state.gameCompleted} winner={this.state.winner}/>
        <Bar dropPiece={this.dropPiece.bind(this)}/>
        {['R0','R1','R2','R3','R4','R5'].map((row) => {
          return <Row id={row} key={row} rowValues={this.state.board[row.slice(1)]} player={this.state.player}/>
        })}
      </div>
    );
  }
}

export default Game;
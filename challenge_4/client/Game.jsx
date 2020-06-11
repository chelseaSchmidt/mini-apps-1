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

          const status = this.checkForWinOrTie();
          let gameCompletedStatus = false;
          let winningPlayer = null;

          if (status === 1) {
            gameCompletedStatus = true;
            winningPlayer = 1;
          } else if (status === 2) {
            gameCompletedStatus = true;
            winningPlayer = 2;
          } else if (status === 'tie') {
            gameCompletedStatus = true;
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
    //call all functions below; return false, winning player, or tie
    //pass each row into checkForRowOrColWin
    //for each index, map all rows to a single column, pass into checkForRowOrColWin
    //can I do this for diagonals?
    //at end, pass full board into checkForTie
    if (this.checkForTie(board)) {
      return 'tie';
    }
  }

  checkForRowOrColWin(rowOrCol) {

  }

  checkForMajorDiagonalWin() {

  }

  checkForMinorDiagonalWin() {

  }

  checkForTie(board) {
    //reduce board to object of 1, 2, and 0 counts
    //if 0 counts is 0, return true
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
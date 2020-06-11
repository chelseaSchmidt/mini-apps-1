import React from 'react';
import Row from './Row.jsx';
import Bar from './Bar.jsx';

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
      ]
    }
  }

  dropPiece(event) {
    const validButtons = ['D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6'];
    if (validButtons.indexOf(event.target.id) > -1) {
      const col = event.target.id.slice(1);
      let board = this.state.board;
      for (let row = 5; row >= 0; row--) {
        if (board[row][col] === 0) {
          board[row][col] = 1;
          this.setState({
            board: board
          });
          break;
        }
      }
    }
    console.log(this.state.board);
  }

  render() {
    return (
      <div id="board-container">
        <Bar dropPiece={this.dropPiece.bind(this)}/>
        {['R0','R1','R2','R3','R4','R5'].map((row) => {
          return <Row id={row} key={row} rowValues={this.state.board[row.slice(1)]}/>
        })}
      </div>
    );
  }
}

export default Game;
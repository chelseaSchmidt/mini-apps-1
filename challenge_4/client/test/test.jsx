import Game from '../src/Game.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

describe('End-of-game detection logic', function () {

  it('should detect row wins', function () {
    const game = ReactDOM.render(<Game />, document.getElementById('test-container'));
    const board = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ];
    expect(game.checkForWinOrTie(board)).to.be.true;

  });
  it('should detect column wins', function () {
    const game = ReactDOM.render(<Game />, document.getElementById('test-container'));
    const board = [
      [2, 0, 0, 0, 0, 0, 0],
      [2, 0, 0, 0, 0, 0, 0],
      [2, 0, 0, 0, 0, 0, 0],
      [2, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ];
    expect(game.checkForWinOrTie(board)).to.be.true;
  });
  it('should detect diagonal wins', function () {
    const game = ReactDOM.render(<Game />, document.getElementById('test-container'));
    const board = [
      [2, 0, 0, 0, 0, 0, 0],
      [2, 1, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0],
      [2, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ];
    expect(game.checkForWinOrTie(board)).to.be.true;
  });
  it('should detect a tie', function () {
    const game = ReactDOM.render(<Game />, document.getElementById('test-container'));
    const board = [
      [2, 2, 1, 1, 2, 2, 1],
      [1, 1, 2, 2, 1, 1, 1],
      [2, 2, 2, 1, 2, 2, 1],
      [1, 1, 2, 1, 2, 1, 2],
      [1, 1, 1, 2, 1, 2, 1],
      [2, 1, 1, 2, 1, 2, 1]
    ];
    expect(game.checkForWinOrTie(board)).to.equal('tie');
  });
  it('should not detect a win when there isn\'t one', function () {
    const game = ReactDOM.render(<Game />, document.getElementById('test-container'));
    const board = [
      [2, 0, 0, 0, 0, 0, 0],
      [2, 1, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0],
      [2, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ];
    expect(game.checkForWinOrTie(board)).to.be.false;
  });

});
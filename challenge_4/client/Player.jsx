import React from 'react';

const Player = (props) => {
  let message = `Player ${props.player}'s Turn`;
  if (props.gameCompleted) {
    if (!props.winner) {
      message = `It's a tie!`
    } else {
      message = `Player ${props.winner} won!`
    }
  }
  return (
    <div id="player">
      {message}
    </div>
  );
};

export default Player;
import React from 'react';

const Player = (props) => {
  let message = `Player ${props.player}'s Turn`;
  if (props.gameCompleted) {
    message = `Player ${props.winner} won!`
  }
  return (
    <div id="player">
      {message}
    </div>
  );
};

export default Player;
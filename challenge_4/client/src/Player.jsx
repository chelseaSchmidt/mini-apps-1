import React from 'react';

const Player = (props) => {
  let message = `Player ${props.player}'s Turn`;
  let toggleClass = 'no-class';

  if (props.gameCompleted) {
    toggleClass = 'end-game';

    if (!props.winner) {
      message = `It's a tie!`
    } else {
      message = `Player ${props.winner} won!`
    }
  }
  return (
    <div id="player" className={toggleClass}>
      {message}
    </div>
  );
};

export default Player;
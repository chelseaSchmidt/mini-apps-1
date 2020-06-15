import React from 'react';

const Disc = (props) => {
  return (
    <button className="disc-button" id={props.id} onClick={props.dropPiece}>Drop Piece</button>
  );
};

export default Disc;
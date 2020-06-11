import React from 'react';

const Disc = (props) => {
  return (
    <button className="disc-button" id={props.id} onClick={props.dropPiece}></button>
  );
};

export default Disc;
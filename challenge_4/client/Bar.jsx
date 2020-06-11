import React from 'react';
import Disc from './Disc.jsx';

const Bar = (props) => {
  return (
    <div id="bar">
      {['D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6'].map(disc => {
        return <Disc id={disc} key={disc} dropPiece={props.dropPiece}/>;
      })}
    </div>
  );
};

export default Bar;
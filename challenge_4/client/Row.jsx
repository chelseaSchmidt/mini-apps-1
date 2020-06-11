import React from 'react';
import Cell from './Cell.jsx';

const Row = (props) => {
  const cellIds = [];
  const letterIds = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  letterIds.forEach(letter => {
    cellIds.push(`${letter}${props.id.slice(1)}`);
  });

  return (
    <div className="row" id={props.id}>
      {cellIds.map((cell) => {
        return <Cell id={cell} class="cell" key={cell}/>
      })}
    </div>
  );
};

export default Row;
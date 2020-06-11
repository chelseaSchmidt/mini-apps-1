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
      {cellIds.map((cell, i) => {
        if (props.rowValues[i] === 1) {
          return <Cell id={cell} class="filled-cell" key={cell}/>;
        }
        return <Cell id={cell} class="empty-cell" key={cell}/>;
      })}
    </div>
  );
};

export default Row;
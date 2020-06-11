import React from 'react';

const Cell = (props) => {
  return (
    <div className={props.class} id={props.id}>*</div>
  );
};

export default Cell;
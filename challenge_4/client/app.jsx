import React from 'react';
import ReactDOM from 'react-dom';
import Row from './Row.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ]
    }
  }

  render() {
    return (
      <div id="row-container">
        {['R0','R1','R2','R3','R4','R5'].map((row) => {
          return <Row id={row}/>
        })}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
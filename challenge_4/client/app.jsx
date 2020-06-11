import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: 0
    }
  }
  render() {
    return (
      <div>Why hello there</div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
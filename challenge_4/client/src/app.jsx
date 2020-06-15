import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game.jsx';

const gameRef = ReactDOM.render(<Game />, document.getElementById('app'));
const checkForWinOrTie = gameRef.checkForWinOrTie;

export default checkForWinOrTie;
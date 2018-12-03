import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss'
// import {
//   Button
// } from 'lzj';

// var Components = require('../lib/index');
// let Button = Components.Button;
import Button from '../lib/index';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1> IT`S MY LIVE</h1>
        <Button></Button>
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('app')); 

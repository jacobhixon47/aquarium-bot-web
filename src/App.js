import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Commands from './Commands/Commands.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">AquariumBot v0.1</h1>
        </header>
        <Commands />
      </div>
    );
  }
}

export default App;

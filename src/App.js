import React, { Component } from 'react';
import './App.css';
import CommandsList from './CommandsList/CommandsList.js';

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
        <CommandsList />
      </div>
    );
  }
}

export default App;

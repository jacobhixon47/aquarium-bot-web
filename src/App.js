import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import fire from './fire.js';
import firestore from 'firebase/firestore';

var fs = fire.firestore();
fs.enablePersistence();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      docRef: fs.doc("samples/sandwichData")
    }
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }
  handleSaveClick() {
    const testInput = document.querySelector('#testInput');
    const textToSave = testInput.value;

    console.log("I am going to save '" + textToSave + "' to Firestore! :D");

    this.state.docRef.set({
      testText: textToSave
    }).then(() => {
      console.log("Successfully saved text!");
    }).catch((error) => {
      console.log("Oops, something shitty happened: " + error);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">AquariumBot v0.1</h1>
        </header>
        <h3 id="testOutputHeader"></h3>
        <input type="text" id="testInput" />
        <button type="button" id="saveTestInputButton" onClick={this.handleSaveClick}>Save</button>
      </div>
    );
  }
}

export default App;

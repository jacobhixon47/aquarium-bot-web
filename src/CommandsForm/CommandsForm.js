import React, { Component } from 'react';
import fire from '../fire.js';
import firestore from 'firebase/firestore';
import './CommandsForm.css';

let fs = fire.firestore();

class CommandsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "47aquarian",
      name: "",
      text: ""
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }
  handleNameChange(event) {
    this.setState({name: event.target.value})
  }

  handleTextChange(event) {
    this.setState({text: event.target.value})
  }

  handleSaveClick() {
    let commandsRef = fs.collection(`channels/${this.state.username}/commands`);
    commandsRef.add({
      name: "!" + this.state.name,
      text: this.state.text
    }).then(ref => {
        console.log('Added document with ID: ', ref.id);
    });
  }

  render() {
    return (
      <div className="CommandsForm">
        <div className="inner-addon">
          <span className="icon">!</span>
          <input name="name" type="text" value={this.state.name} onChange={this.handleNameChange} placeholder="command"/>
        </div>
        <p>
          <textarea name="text" type="text" className="text" value={this.state.text} onChange={this.handleTextChange} placeholder="text"/>
        </p>
        <p>
          <button onClick={this.handleSaveClick}>Save Command</button>
        </p>
      </div>
    );
  }
}

export default CommandsForm;

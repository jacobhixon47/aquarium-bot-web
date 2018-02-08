import React, { Component } from 'react';
import { Input, TextArea, Button } from 'semantic-ui-react';
import fire from '../fire.js';
import {firestore} from 'firebase/firestore';
import './style.css';
import 'semantic-ui-css/semantic.min.css';

let fs = fire.firestore();

class CommandForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "47aquarian",
      initialName: props.name ? props.name.substr(1) : '',
      name: props.name ? props.name.substr(1) : '',
      text: props.text ? props.text : '',
      newCommand: props.newCommand,
      updateCommandList: props.updateCommandList
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);

    this.commandsRef = fs.collection(`channels/${this.state.username}/commands`);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value})
  }

  handleTextChange(event) {
    this.setState({text: event.target.value})
  }

  handleSaveClick() {
    if (this.state.initialName) {
      this.commandsRef.doc(this.state.initialName).delete()
      .then(() => {
        console.log("Deleted old command ref: " + this.state.initialName);
        console.log("Adding new command ref...: " + this.state.name);
      }).catch(function(error) {
        console.error("Error removing document: ", error);
      });
    }
    this.commandsRef.doc(this.state.name).set({
      name: "!" + this.state.name,
      text: this.state.text
    }).then(() => {
      console.log("Document successfully written!");
    }).catch(function(error) {
      console.error("Error writing document: ", error);
    });
  }

  render() {
    return (
      <div className="CommandForm" style={{
        textAlign: 'center'
      }}>
        <h3>{this.state.newCommand ? 'New Command' : 'Edit Command'}</h3>
        <div>
          <Input fluid icon='warning' iconPosition='left' value={this.state.name} onChange={this.handleNameChange} placeholder='Command Name' />
        </div>
        <div>
          <TextArea value={this.state.text} onChange={this.handleTextChange} placeholder="Command Text" style={{
            width: "100%",
            marginTop: "10px",
            marginBottom: "10px",
            padding: "3%"
          }}/>
        </div>
        <Button fluid primary content='Save' onClick={this.handleSaveClick} />
      </div>
    );
  }
}

export default CommandForm;

import React, { Component } from 'react';
import { Input, TextArea, Button } from 'semantic-ui-react';
import fire from '../fire.js';
import firestore from 'firebase/firestore';
import './CommandsForm.css';
import 'semantic-ui-css/semantic.min.css';

let fs = fire.firestore();

class CommandsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "47aquarian",
      name: "",
      text: "",
      create: props.create,
      update: props.update
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
  }
  handleNameChange(event) {
    this.setState({name: event.target.value})
  }

  handleTextChange(event) {
    this.setState({text: event.target.value})
  }

  handleUpdateClick() {
    // let commandsRef = fs.collection(`channels/${this.state.username}/commands`);
    // commandsRef.add({
    //   name: "!" + this.state.name,
    //   text: this.state.text
    // }).then(ref => {
    //     console.log('Added document with ID: ', ref.id);
    // });
    // this.setState({
    //   name: "",
    //   text: ""
    // });
  }

  handleCreateClick() {
    let commandsRef = fs.collection(`channels/${this.state.username}/commands`);
    commandsRef.add({
      name: "!" + this.state.name,
      text: this.state.text
    }).then(ref => {
        console.log('Added document with ID: ', ref.id);
    });
    this.setState({
      name: "",
      text: ""
    });
  }

  render() {
    let saveButton;
    if (this.state.create && !this.state.update) {
      saveButton = <Button fluid onClick={this.handleCreateClick} primary>Save Command</Button>;
    } else if (this.state.update && !this.state.create) {
      saveButton = <Button fluid onClick={this.handleUpdateClick} primary>Save Command</Button>;
    }
    return (
      <div style={{
        width: "35vw"
      }}>
        <h3>Add Command</h3>
        <div>
          <Input fluid={true} icon='warning' iconPosition='left' value={this.state.name} onChange={this.handleNameChange} placeholder='Command Name' />
        </div>
        <div>
          <TextArea value={this.state.text} onChange={this.handleTextChange} placeholder="Command Text" style={{
            width: "100%",
            marginTop: "10px",
            marginBottom: "10px",
            padding: "3%"
          }}/>
        </div>
        {saveButton}
      </div>
    );
  }
}

export default CommandsForm;

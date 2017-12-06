import React, { Component } from 'react';
import CommandsForm from '../CommandsForm/CommandsForm.js';
import fire from '../fire.js';
import firestore from 'firebase/firestore';
let fs = fire.firestore();
fs.enablePersistence();

class Commands extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "47aquarian",
      commands: []
    };
    this.commandsRef = fs.collection(`channels/${this.state.username}/commands`);
  }

  componentDidMount() {
    let prevCommands = [];
    this.commandsRef.onSnapshot(snapshot => {
      console.log("recieved snapshot...");
      snapshot.forEach(doc => {
        console.log(doc.data().name);
        prevCommands.push({
          name: doc.data().name,
          text: doc.data().text
        });
      });
      this.setState({
        commands: prevCommands
      });
    })
  }

  render() {
    let commandsList = this.state.commands.map(command => {
      return (
        <p key={command.name}>{command.name}: {command.text}</p>
      );
    });
    return (
      <div className="Commands" style={{
        padding: "1%"
      }}>
        <CommandsForm />
        <h3>Commands</h3>
        <div>{commandsList}</div>
      </div>
    );
  }
}

export default Commands;

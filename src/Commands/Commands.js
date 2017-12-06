import React, { Component } from 'react';
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
    this.componentDidMount = this.componentDidMount.bind(this);

  }
  componentDidMount() {
    let commandsRef = fs.collection(`channels/${this.state.username}/commands`);
    let prevCommands = this.state.commands;
    commandsRef.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
              prevCommands.push({
                name: doc.data().name,
                text: doc.data().text
              });
            });
            this.setState({
              commands: prevCommands
            });
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
  }

  render() {
    var commandsList = this.state.commands.map(command => {
      return (
        <p key={command.name}>{command.name}</p>
      );
    });
    return (
      <div className="Commands">
        <h3>Commands</h3>
        <div>{commandsList}</div>
      </div>
    );
  }
}

export default Commands;

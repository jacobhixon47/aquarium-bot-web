import React, { Component } from 'react';
import fire from '../fire.js';
import firestore from 'firebase/firestore';

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
    let fs = fire.firestore();
    fs.enablePersistence();
    let commandsRef = fs.collection(`channels/${this.state.username}/commands`);
    commandsRef.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
              this.setState({
                commands: [...this.state.commands, doc.data().name]
              });
            });
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
  }

  render() {
    var commandsList = this.state.commands.map(command => {
      return (
        <p>{command}</p>
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

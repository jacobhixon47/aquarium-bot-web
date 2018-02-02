import React, { Component } from 'react';
import CommandsForm from '../CommandsForm/CommandsForm.js';
import Command from '../Command/Command.js';
import MyModal from '../Modal/Modal.js';
import fire from '../fire.js';
import './CommandsList.css';

let fs = fire.firestore();
fs.enablePersistence();

class CommandsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "47aquarian",
      commands: []
    };
    this.commandsRef = fs.collection(`channels/${this.state.username}/commands`);
  }

  handleDelete(name) {
    console.log("deleting '" + name + "'");
    this.commandsRef.where("name", "==", name)
    .get()
    .then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete().then(() => {
            console.log("Document successfully deleted!");
          }).catch(function(error) {
            console.error("Error removing document: ", error);
          });
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

  }

  componentDidMount() {
    this.commandsRef.onSnapshot(snapshot => {
      let prevCommands = [];
      console.log("SNAPSHOT");
      snapshot.forEach(doc => {
        prevCommands.push({
          name: doc.data().name,
          text: doc.data().text
        });
      });
      this.setState({
        commands: prevCommands
      });
    });
  }

  render() {
    let commandsList = this.state.commands.map(command => {
      return (
        <Command
          key={command.name}
          name={command.name}
          text={command.text}
          id={command.id}
          // handleEdit={this.handleEdit.bind(this)}
          handleDelete={this.handleDelete.bind(this)}
        />
      );
    });
    return (
      <div className="Commands" style={{
        padding: "1%",
        width: "100vw",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-around"
      }}>
        <div style={{
          textAlign: "left"
        }}>
          <h3>Commands</h3>
          <MyModal create={true} />
          <div>{commandsList}</div>
        </div>
        {/* <CommandsForm style={{
          maxWidth: "50vw"
        }}/> */}
      </div>
    );
  }
}

export default CommandsList;

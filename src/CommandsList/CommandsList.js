import React, { Component } from 'react';
import {Button, Icon} from 'semantic-ui-react';
import CommandForm from '../CommandForm/CommandForm.js';
import Command from '../Command/Command.js';
import MyModal from '../MyModal/MyModal.js';
import fire from '../fire.js';
import './CommandsList.css';

let fs = fire.firestore();

class CommandsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "47aquarian",
      commands: []
    };
    this.commandsRef = fs.collection(`channels/${this.state.username}/commands`);

    this.updateCommandList = this.updateCommandList.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  updateCommandList() {
    this.commandsRef.onSnapshot(snapshot => {
      console.log('recieved snapshot!');
      let prevCommands = [];
      snapshot.forEach(doc => {
        console.log("Recieved ## " + doc.data().name + ' — ' + doc.data().text);
        prevCommands.push({
          name: doc.data().name,
          text: doc.data().text
        });
      });
      this.setState({
        commands: prevCommands
      });
      console.log('updated commands list');
    });
  }

  componentDidMount() {
    this.updateCommandList();
  }

  render() {
    let createModalTriggerContent = (
      <div>
        <Icon name='add'/>Add Command
      </div>
    );
    let createModalContent = <CommandForm name={this.state.name} text={this.state.text}
      newCommand={true} updateCommandList={this.updateCommandList}/>;
    let commandsList = this.state.commands.map(command => {
      return (
        <Command
          key={command.name}
          name={command.name}
          text={command.text}
          id={command.id}
          updateCommandList={this.updateCommandList}
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
        <div className="commandsList">
          <h3 style={{textAlign: 'center'}}>Commands</h3>
          <MyModal triggerContent={createModalTriggerContent} content={createModalContent} closeIcon/>
          <div>{commandsList}</div>
        </div>
      </div>
    );
  }
}

export default CommandsList;

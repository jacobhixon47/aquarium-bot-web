import React, { Component } from 'react';
import {Button, Confirm, Icon} from 'semantic-ui-react';
import MyModal from '../MyModal/index.js';
import CommandForm from '../CommandForm/index.js';
import fire from '../../fire.js';
import './style.css';

let fs = fire.firestore();
fs.enablePersistence();

class Command extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '47aquarian',
      name: props.name,
      text: props.text,
      id: props.id,
      showConfirmDelete: false,
      updateCommandList: props.updateCommandList
    };
    this.commandsRef = fs.collection(`channels/${this.state.username}/commands`);

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.updateCommandList = this.updateCommandList.bind(this);
    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    this.handleDeleteCancel = this.handleDeleteCancel.bind(this);
  }

  handleDeleteClick = () => this.setState({showConfirmDelete: true});
  handleDeleteCancel = () => this.setState({showConfirmDelete: false});
  handleDeleteConfirm = () => {
    console.log("deleting '" + this.state.name.substr(1) + "'");
    this.commandsRef.doc(this.state.name.substr(1)).delete()
    .then(() => {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
    this.setState({showConfirmDelete: false});
  }

  updateCommandList() {
    this.state.updateCommandList();
  }

  render() {
    let confirmDeleteHeader = (
      <h1>
        &nbsp;<Icon name='trash outline'/>Delete Command
      </h1>
    );
    let editModalContent = (
      <CommandForm
        fluid
        name={this.state.name}
        text={this.state.text}
        newCommand={false}
        updateCommandList={this.updateCommandList}
      />
    );

    return (
      <div className="Command" style={{
        padding: "1%",
        width: "50vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        border: "1px solid #000",
        marginTop: "1vh",
        marginBottom: "2vh",
      }}>
        <div key={this.state.name} style={{
          width: "8vw"
        }}>{this.state.name}</div>
        <div style={{
          width: "30vw"
        }}>{this.state.text}</div>
        <div className="buttonsSection" style={{
          width: "8vw",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "1%",
          paddingBottom: "1%"
        }}>
          <MyModal content={editModalContent} icon='write'/>
          <div>
            <Button negative onClick={this.handleDeleteClick} icon='trash outline'/>
            <Confirm
              header={confirmDeleteHeader}
              content='Are you sure you want to delete this command?'
              confirmButton='Delete'
              open={this.state.showConfirmDelete}
              onCancel={this.handleDeleteCancel}
              onConfirm={this.handleDeleteConfirm}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Command;

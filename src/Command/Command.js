import React, { Component } from 'react';
import {Button, Confirm} from 'semantic-ui-react';
import MyModal from '../MyModal/MyModal.js';
import CommandForm from '../CommandForm/CommandForm.js';
import './Command.css';

class Command extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      text: props.text,
      id: props.id,
      handleDelete: props.handleDelete,
      showConfirmDelete: false,
      updateCommandList: props.updateCommandList
    };
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.updateCommandList = this.updateCommandList.bind(this);
    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    this.handleDeleteCancel = this.handleDeleteCancel.bind(this);
  }

  handleDeleteClick = () => this.setState({showConfirmDelete: true});
  handleDeleteCancel = () => this.setState({showConfirmDelete: false});
  handleDeleteConfirm = () => {
    console.log('HANDLE DELETE => ' + this.state.name);
    this.state.handleDelete(this.state.name);
  }

  updateCommandList() {
    this.state.updateCommandList();
  }

  render() {
    let editModalTrigger = <Button icon='edit' />;
    let deleteModalTrigger = <Button negative icon='trash outline' />

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
          <MyModal trigger={editModalTrigger} content={editModalContent}/>
          <div>
            <Button negative onClick={this.handleDeleteClick} icon='trash outline'/>
            <Confirm
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

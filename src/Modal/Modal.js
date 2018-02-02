import React, { Component } from 'react';
import {Modal, Header, Button, Icon} from 'semantic-ui-react';
import CommandsForm from '../CommandsForm/CommandsForm.js';
import 'semantic-ui-css/semantic.min.css';
import './Modal.css';

class MyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: props.edit,
      delete: props.delete,
      create: props.create,
      name: props.name,
      text: props.text,
      updateClick: props.updateClick
      // createClick: props.createClick
    };
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
  }

  handleUpdateClick(name, text) {
    console.log("bubble update => modal");
    this.state.updateClick(name, text);
  }

  handleCreateClick(name, text) {
    this.state.createClick(name, text);
  }

  componentDidMount(name, text) {
    console.log("MODAL DID MOUNT: " + name + " " + text);
  }

  // Semantic-UI Modal does not mount and unmount on show/hide, and this is causing a bug:
  // The state attributes "name" and "text" are not being updated for the Modal after a command is edited and successfully updated.

  // This causes the Form (when re-rendered every time the modal opens) to display the old name/text for the command in their respective input fields

  // This is because the Modal state is not recieving the update with the new state. must write a fix ASAP.

  render() {
    let modalTrigger;
    let commandForm;
    if (this.state.edit && !this.state.delete && !this.state.create) {
      modalTrigger = <Button fluid>Edit</Button>;
      commandForm = <CommandsForm update={true} updateClick={this.handleUpdateClick} name={this.state.name} text={this.state.text} />;
    } else if (this.state.delete && !this.state.edit && !this.state.create) {
      modalTrigger = <Button fluid>Delete</Button>;
    } else if (this.state.create && !this.state.delete && !this.state.edit) {
      modalTrigger = <Button fluid><Icon name='add' /></Button>;
      commandForm = <CommandsForm create={true} createClick={this.handleCreateClick}/>;
    } else {
      modalTrigger = <Button fluid>Button</Button>;
    }
    return (
      <Modal trigger={modalTrigger} basic size='small'>
        <Header icon='archive' content='Archive Old Messages' />
        <Modal.Content>
          {commandForm}
        </Modal.Content>
        {/* <Modal.Actions>
          <Button basic color='red' inverted>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' inverted>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions> */}
      </Modal>
    );
  }
}

export default MyModal;

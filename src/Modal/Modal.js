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
      create: props.create
    };
  }

  render() {
    let modalTrigger;
    let form;
    if (this.state.edit && !this.state.delete && !this.state.create) {
      modalTrigger = <Button fluid>Edit</Button>;
      form = <CommandsForm update={true} />;
    } else if (this.state.delete && !this.state.edit && !this.state.create) {
      modalTrigger = <Button fluid>Delete</Button>;
    } else if (this.state.create && !this.state.delete && !this.state.edit) {
      modalTrigger = <Button fluid><Icon name='add' /></Button>;
      form = <CommandsForm create={true} />;
    }
    return (
      <Modal trigger={modalTrigger} basic size='small'>
        <Header icon='archive' content='Archive Old Messages' />
        <Modal.Content>
          {form}
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

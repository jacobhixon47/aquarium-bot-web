import React, { Component } from 'react';
import {Modal, Button, Icon} from 'semantic-ui-react';
import './MyModal.css';

class MyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      triggerContent: props.triggerContent,
      content: props.content,
      modalOpen: false,
      handleClose: props.handleClose
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleClose = () => {
    this.setState({modalOpen: false});
    if (this.state.handleClose) {
      this.state.handleClose();
    }
  };

  handleOpen = () => {
    this.setState({modalOpen: true});
    if (this.state.handleOpen) {
      this.state.handleOpen();
    }
  };

  render() {
    let modalTrigger = <Button onClick={this.handleOpen}>{this.state.triggerContent}</Button>;
    let content = this.state.content;
    return (
      <Modal
        trigger={modalTrigger}
        basic size='small'
        closeIcon
        open={this.state.modalOpen}
      >
        <Modal.Content>
          {content}
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.handleClose} inverted>
            <Icon name='checkmark' />Got it
          </Button>
      </Modal.Actions>
      </Modal>
    );
  }
}

export default MyModal;

import React, { Component } from 'react';
import {Modal} from 'semantic-ui-react';
import './MyModal.css';

class MyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trigger: props.trigger,
      content: props.content
    };
    this.closeOnSave = this.closeOnSave.bind(this);
  }

  closeOnSave = () => {this.setState({modalOpen: false})};

  render() {
    let modalTrigger = this.state.trigger;
    let content = this.state.content;
    return (
      <Modal
        trigger={modalTrigger}
        basic size='small'
        closeIcon
      >
        <Modal.Content>
          {content}
        </Modal.Content>
      </Modal>
    );
  }
}

export default MyModal;

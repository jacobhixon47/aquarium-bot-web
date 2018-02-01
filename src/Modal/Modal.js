import React, { Component } from 'react';
import './Modal.css';

class Command extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      text: props.text,
      id: props.id,
      showEdit: false
    };
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }
}

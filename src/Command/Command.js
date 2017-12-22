import React, { Component } from 'react';
import './Command.css';

class Command extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      text: props.text,
      id: props.id
    };
  }

  handleDeleteClick() {
    props.handleDelete(id);
  }

  handleEditClick(id) {
    props.handleEdit(id);
  }

  render() {
    return (
      <div className="Command" style={{
        padding: "1%",
        width: "50vw"
      }}>
        <div key={this.state.name}>{this.state.name}: {this.state.text}</div>
        <button onClick={this.handleEditClick(this.state.id)}>Edit</button>
        <button onClick={this.handleDeleteClick(this.state.id)}>Delete</button>
      </div>
    );
  }
}

export default CommandsList;

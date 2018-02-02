import React, { Component } from 'react';
import MyModal from '../Modal/Modal.js';
import './Command.css';

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

  handleDeleteClick() {
    this.props.handleDelete(this.state.name);
  }

  handleEditClick() {
    // this.props.handleEdit(this.state.name, this.props.newName, this.props.newText);
    this.setState({
      showEdit: !this.state.showEdit
    });
  }

  render() {
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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "1%",
          paddingBottom: "1%"
        }}>
          <MyModal edit={true} />
          <MyModal delete={true} />
        </div>
      </div>
    );
  }
}

export default Command;

import React, { Component } from 'react';
import './App.css';
import CommandsList from './CommandsList/CommandsList.js';
import {Button, Sidebar, Menu, Icon, Segment} from 'semantic-ui-react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarIsVisible: false,
      currentPage: 'CommandsList'
    };

    this.handleMenuToggle = this.handleMenuToggle.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind(this);
    this.handleCommandsListClick = this.handleCommandsListClick.bind(this);

  }

  handleMenuToggle() {
    this.setState({
      sidebarIsVisible: !this.state.sidebarIsVisible
    });
  }

  handleHomeClick() {
    this.setState({currentPage: 'Home'})
  }

  handleCommandsListClick() {
    this.setState({currentPage: 'CommandsList'})
  }

  render() {
    let segmentContent;
    if (this.state.currentPage === 'CommandsList') {
      segmentContent = <CommandsList />;
    } else if (this.state.currentPage === 'Home') {
      segmentContent = <h1 style={{textAlign: 'center'}}>Welcome to AquaBot!</h1>;
    }

    return (
      <div className="App">
        <div className="MySidebar">
          <Sidebar.Pushable as={Segment} style={{
            border: 'none',
            borderRadius: '0px'
          }}>
            <Sidebar as={Menu} animation='slide along' width='thin' visible={this.state.sidebarIsVisible} icon='labeled' vertical inverted>
              <Menu.Item name='aquaBot'>
                <h2>AquaBot</h2>
              </Menu.Item>
              <Menu.Item name='home' onClick={this.handleHomeClick}>
                <Icon name='home' />
                Home
              </Menu.Item>
              <Menu.Item name='commands' onClick={this.handleCommandsListClick}>
                <Icon name='unordered list' />
                Commands
              </Menu.Item>
              <Menu.Item name='camera'>
                <Icon name='camera' />
                Channels
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>
              <Segment basic>
                <Button onClick={this.handleMenuToggle} icon='content' style={{float: 'left'}}/>
                <div style={{
                  minHeight: '100vh',
                  overflowY: 'scroll'
                }}>
                  {segmentContent}
                </div>
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      </div>
    );
  }
}

export default App;

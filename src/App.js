import React, { Component } from 'react';
import './App.css';
import CommandsList from './CommandsList/CommandsList.js';
import {Button, Sidebar, Menu, Icon, Segment} from 'semantic-ui-react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarIsVisible: false
    };

    this.handleMenuToggle = this.handleMenuToggle.bind(this);
  }

  handleMenuToggle() {
    this.setState({
      sidebarIsVisible: !this.state.sidebarIsVisible
    });
  }

  render() {
    let segmentContent = <CommandsList />;

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
              <Menu.Item name='home'>
                <Icon name='home' />
                Home
              </Menu.Item>
              <Menu.Item name='gamepad'>
                <Icon name='gamepad' />
                Games
              </Menu.Item>
              <Menu.Item name='camera'>
                <Icon name='camera' />
                Channels
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>
              <Segment basic>
                <Button onClick={this.handleMenuToggle} icon='content' style={{float: 'left'}}/>
                <div style={{height: '90vh'}}>
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

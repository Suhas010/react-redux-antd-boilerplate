import React, { Component } from 'react';
import {
  Card, Menu, MenuDivider, MenuItem, Classes,
} from '@blueprintjs/core';
import {
  Route, Switch, Redirect,
} from 'react-router-dom';
import HamburgerMenu from 'react-hamburger-menu';

import NoMatch from '../app/NoMatch';
import DataEntry from '../form/DataEntry';

import Dashboard from '../dashboard/Dashboard';
import './DashBoardLayout.scss';

class DashBoardLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  toggleMenu = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  handleMenuClick = (e, path) => {
    const { history } = this.props;
    history.push(path);
  }

  getSideBarMenu = () => {
    const { history } = this.props;
    const { pathname } = history.location;
    return (
      <div className="menu-container">
        <div className="header">
          AtCOI
        </div>
        <Menu className={Classes.MENU_SUBMENU} style={{ marginTop: '10px' }} >
          <MenuItem
            icon="home"
            text="Home"
            active={pathname === '/dashboard'}
            onClick={e => this.handleMenuClick(e, '/dashboard')}
          />
          <MenuDivider />
          <MenuItem
            icon="add"
            text="Data Entry"
            active={pathname === '/dashboard/data-entry'}
            onClick={e => this.handleMenuClick(e, '/dashboard/data-entry')}
          />
          <MenuItem
            icon="edit"
            text="Monitor"
            active={pathname === '/dashboard/monitor'}
            onClick={e => this.handleMenuClick(e, '/dashboard/monitor')}
          />
          <MenuDivider />
          <MenuItem
            icon="cog"
            text="Settings"
            onClick={this.handleMenuClick}
          />
          <MenuDivider />
          <MenuItem
            icon="power"
            text="Logout"
            onClick={this.handleMenuClick}
          />
        </Menu>
      </div>
    );
  }

  getCard = () => (
    <Card
      elevation="0"
      style={{ height: '100%' }}
    >
      <>{this.getSideBarMenu()}</>
    </Card>
  );

  handleLogoClick = () => {
    this.props.history.push('/dashboard');
  }
  
  getHamburger = open => (
    <div className="nav-bar">
      <HamburgerMenu
        isOpen={open}
        menuClicked={this.toggleMenu}
        width={26}
        height={15}
        strokeWidth={1}
        rotate={0}
        color="white"
        borderRadius={0}
        animationDuration={0.5}
      />
      <div onClick={this.handleLogoClick} className="logo">AtCOI</div>
    </div>
  );

  render() {
    const { open } = this.state;
    return (
      <div className="container">
        <div className={open ? 'sidebar' : 'sidebar close'}>
          <>{this.getCard()}</>
        </div>
        <div className="content">
          <>{this.getHamburger(open)}</>
          <div className="data">
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/dashboard/data-entry" component={DataEntry} />
              <PrivateRoute component={NoMatch} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}


function isAuthenticated() {
  if (localStorage.getItem('user')) {
    console.log('true');
    return true;
  }
  console.log('fals');

  return true;
}

function getComponent({ location, ...rest }, Component) {
  if (isAuthenticated()) {
    const props = { location, ...rest };
    return <Component {...props} />;
  }
  return (
    <Redirect
      to={{
        pathname: "/",
        state: { from: location }
      }}
    />
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  return <Route {...rest} render={props => getComponent(props, Component)} />;
}

export default DashBoardLayout;

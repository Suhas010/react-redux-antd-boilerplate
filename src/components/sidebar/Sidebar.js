/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Layout, Menu, Icon, Divider,
} from 'antd';
import NAV_MENU from './Constants';
import './Sidebar.scss';
import routes from '../../utils/routes';
import { setItem, getItem } from '../helpers/localStorage';

const { Sider } = Layout;
class Sidebar extends Component {
  constructor(props) {
    super(props);
    const { open } = props;
    this.state = {
      open,
      activeMenu: routes.targetGroupList,
    };
    props.history.push(routes.targetGroupList);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      open: nextProps.open,
    });
  }

  handleMenuChange = ({ key }) => {
    if (key.includes('log-out')) {
      setItem('token', '');
      this.props.history.push(routes.root);
      return 0;
    }
    this.setState({
      activeMenu: key,
    });
    this.props.history.push(key);
  }

  getMenu = () => {
    const profile = getItem('profile');
    return NAV_MENU.map(({ path, name, icon, permission }) => {
      if (permission.includes(profile)) {
        return (
          <Menu.Item key={`${path}`}>
            <Icon type={icon} />
            <span>{name}</span>
          </Menu.Item>
        );
      }
    });
  }

  render() {
    const { open, activeMenu } = this.state;
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={open}
      >
        <div className="sidebar-logo"> Demo App </div>
        <Divider />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[activeMenu]}
          onClick={this.handleMenuChange}
        >
          {this.getMenu()}
        </Menu>
      </Sider>
    );
  }
}
export default withRouter(Sidebar);

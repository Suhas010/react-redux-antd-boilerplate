import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Icon, Divider } from 'antd';
import NAV_MENU from './Constants';
import './Sidebar.scss';

const { Sider } = Layout;
class Sidebar extends Component {
  constructor(props) {
    super(props);
    const { open } = props;
    this.state = {
      open,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      open: nextProps.open,
    });
  }

  handleMenuChange = ({ key }) => {
    this.props.history.push(key);
  }

  getMenu = () => {
    return NAV_MENU.map(({ path, name, icon }) => {
      return (
        <Menu.Item key={path}>
          <Icon type={icon} />
          <span>{name}</span>
        </Menu.Item>
      );
    });
  }

  render() {
    const { open } = this.state;
    const { history } = this.props; 
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={open}
        // collapsedWidth={10}
      >
        <div className="sidebar-logo"> AtCOI </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[history.location.pathname]}
          onClick={this.handleMenuChange}
        >
          {this.getMenu()}
          <Divider />
          <Menu.SubMenu
            key="sub1"
            title={<span><Icon type="appstore" /><span>Other</span></span>}
          >
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
            <Menu.SubMenu key="sub1-2" title="Submenu">
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
            </Menu.SubMenu>
          </Menu.SubMenu>
        </Menu>
      </Sider>
    );
  }
}
export default withRouter(Sidebar);

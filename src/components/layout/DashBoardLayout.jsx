/* eslint-disable camelcase */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import Sidebar from '../sidebar/Sidebar';
import MainContent from '../mainContent/MainContent';
import { setItem } from '../helpers/localStorage';
import './DashBoardLayout.scss';

const { Header, Content } = Layout;
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

  getSideBarMenu = open => (
    <Sidebar
      open={open}
    />
  );

  render() {
    const { open } = this.state;
    return (
      <Layout style={{ height: '100vh' }}>
        {this.getSideBarMenu(open)}
        <Layout>
          <Header style={{ background: '#f0f2f500', height: 18, padding: 0, display: 'flex', zIndex: 1 }}>
            {/* <Icon
              className="trigger"
              type={open ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggleMenu}
              style={{ paddingTop: 2 }}
            /> */}
          </Header>
          <Content style={{
            margin: '-24px 0px', padding: '3px 20px', background: '#fff', minHeight: 280, flex: 'none'
          }}
          >
            <Scrollbars style={{ height: '100vh' }}>
              <MainContent />
            </Scrollbars>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(DashBoardLayout);

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Icon } from 'antd';
import Sidebar from '../sidebar/Sidebar';
import './DashBoardLayout.scss';
import MainContent from '../mainContent/MainContent';

const { Header, Content } = Layout;

class DashBoardLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  toggleMenu = () => {
    const { open } = this.state;
    this.setState({ open: !open }, this.forceUpdate());
  }

  getSideBarMenu = open => (
    <Sidebar
      open={open}
    />
  );

  render() {
    const { open } = this.state;
    const { history } = this.props;
    return (
      <Layout style={{ height: '100vh'}}>
        {this.getSideBarMenu(open)}
        <Layout>
          <Header style={{ background: '#fff', padding: 0, display: 'flex' }}>
            <Icon
              className="trigger"
              type={open ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggleMenu}
              style={{ paddingTop: 17 }}
            />
            <div className="header-logo" onClick={() => history.push('/dashboard')}>AtCOI</div>
          </Header>
          <Content style={{
            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, flex: 'none'
          }}
          >
            <MainContent />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(DashBoardLayout);

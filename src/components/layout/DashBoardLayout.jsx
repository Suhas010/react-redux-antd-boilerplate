/* eslint-disable camelcase */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Icon } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import Sidebar from '../sidebar/Sidebar';
import MainContent from '../mainContent/MainContent';
import { getConfig, getProfiles } from '../../actions/appActions/AppConfigActions';
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

  componentWillMount() {
    getConfig().then((data) => {
      const { difficulty_levels, question_types, genders } = data;
      setItem('difficultyLevels', JSON.stringify(difficulty_levels));
      setItem('questionTypes', JSON.stringify(question_types));
      setItem('genders', JSON.stringify(genders));
    }).catch((error) => {
      console.error(error);
    });

    getProfiles().then((data) => {
      setItem('profiles', JSON.stringify(data.profiles));
    }).catch((error) => {
      console.error(error);
    });
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

/* eslint-disable camelcase */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Icon } from 'antd';
import Sidebar from '../sidebar/Sidebar';
import MainContent from '../mainContent/MainContent';
import { getConfig } from '../../actions/appActions/AppConfigActions';
import { setItem, clearStorage } from '../helpers/localStorage';
import './DashBoardLayout.scss';

const { Header, Content } = Layout;
class DashBoardLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  componentWillMount() {
    getConfig().then((data) => {
      clearStorage();
      const { difficulty_levels, question_types, genders } = data;
      const diff = JSON.stringify(difficulty_levels);
      const difff = JSON.parse(diff);

      setItem('difficulty_levels', JSON.stringify(difficulty_levels));
      setItem('question_types', JSON.stringify(question_types));
      setItem('genders', JSON.stringify(genders));
      setItem('data', JSON.stringify(data));
      // console.log(JSON.parse(getItem('difficulty_levels')));
      // console.log(Object.values(data.difficulty_levels), Object.keys(data.difficulty_levels), data.difficulty_levels, "$$$");
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
          <Header style={{ background: '#f0f2f5', height: 18, padding: 0, display: 'flex' }}>
            <Icon
              className="trigger"
              type={open ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggleMenu}
              style={{ paddingTop: 2 }}
            />
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

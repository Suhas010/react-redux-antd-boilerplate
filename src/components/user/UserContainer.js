/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Skeleton } from 'antd';

import UserModel from '../../models/AppModel/UserModel';
import { getUsers } from '../../actions/appActions/UsersActions';
import ErrorBoundary from '../reusable/ErrorBoundary';
import UsersTable from './UserTable';
import './User.scss';
import routes from '../../utils/routes';

class UserContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    // this.setLoading('loading', true);
    UserModel.deleteAll();
    // getUsers()
    //   .then((payload) => {
    //     this.setLoading('loading', false);
    //     UserModel.saveAll(payload.categories.map(category => new UserModel(category)));
    //   })
    //   .catch((error) => {
    //     this.setLoading('loading', false);
    //     console.log(error);
    //   });
  }

  setLoading = (state, value) => {
    this.setState({
      [state]: value,
    });
  }

  getUsersTable = () => {
    const { loading } = this.state;
    const { users, ...rest } = this.props;
    return (
      <>
        {loading && <Skeleton active paragraph={{ row: 5 }} />}
        {!loading && <UsersTable users={users} {...rest} />}
      </>
    );
  }

  handleAddUserClick = () => {
    const { history } = this.props;
    history.push(routes.usersAdd);
  }

  render = () => (
    <div className="users-container">
      <div className="add-button" >
        <Button icon="plus" onClick={this.handleAddUserClick} />
      </div>
      <div className="header">Users List</div>
      <ErrorBoundary name="users Table">
        {this.getUsersTable()}
      </ErrorBoundary>
    </div>
  )
}

function mapStateToProps() {
  return {
    users: UserModel.list()[0] ? UserModel.list().map(item => item[1].props) : [],
  };
}

export default connect(mapStateToProps)(UserContainer);

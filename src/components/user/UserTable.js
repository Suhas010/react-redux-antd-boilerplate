import React, { Component } from 'react';
import TableWrapper from '../table/TableWrapper';
import USER_HEADER from './Constants';
import { deleteUser, updateUser } from '../../actions/appActions/UsersActions';
import routes from '../../utils/routes';
import { showSuccessNotification, showFailureNotification } from '../reusable/Notifications';
import UserModel from '../../models/AppModel/UserModel';

class UsersTable extends Component {
  handleEditClick = (userID) => {
    const { history } = this.props;
    history.push(`${routes.categoriesList}/${userID}/edit`);
  }

  handleViewClick = (userID) => {
    const { history } = this.props;
    history.push(`/admin/dashboard/category/${userID}/sub-categories-list`);
  }

  handleDeleteClick = (categoryId) => {
    
    deleteUser(userID)
      .then((response) => {
        UserModel.get(userID).$delete();
        showSuccessNotification('User has been deleted successfully.');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateCategory = (userID, payload, oldName, api) =>{
    updateUser(userID, { category: payload })
      .then((respone) => {
        showSuccessNotification('Category has been updated successfully.');
      })
      .catch((error) => {
        const category = UserModel.get(userID);
        category.props.name = oldName;
        new UserModel(category.props).$save();
        api.refreshCells();
        showFailureNotification('Oops! Something went wrong while updating category. Resetting value to old one.');
        console.log(error);
      });
  }

  render() {
    const { users } = this.props;
    console.log(users, "$$$");
    return (
      <div className="users-table-container">
        <div>
          <TableWrapper
            data={users}
            headers={USER_HEADER}
            handleEditClick={this.handleEditClick}
            handleViewClick={this.handleViewClick}
            handleDeleteClick={this.handleDeleteClick}
            updateCategory={this.updateCategory}
          />
        </div>
      </div>
    );
  }
}

export default UsersTable;

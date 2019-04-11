/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import TableWrapper from '../table/TableWrapper';
import { CATEGORIES_HEADER } from './Constants';
import { deleteInterest, updateInterest } from '../../actions/appActions/InterestActions';
import routes from '../../utils/routes';
import { showSuccessNotification, showFailureNotification } from '../reusable/Notifications';
import InterestsModel from '../../models/AppModel/Interest';
import ErrorBoundary from '../reusable/ErrorBoundary';

class CategoriesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  handleEditClick = (interestId) => {
    const { history } = this.props;
    history.push(`${routes.interestList}/${interestId}/edit`);
  }

  handleViewClick = (interestID) => {
    const { history } = this.props;
    console.log("form")
    history.push(`/admin/dashboard/interest/${interestID}/sub-interest`);
  }

  handleDeleteClick = (interestId) => {
    deleteInterest(interestId)
      .then((response) => {
        InterestsModel.get(interestId).$delete();
        showSuccessNotification('Interest has been deleted successfully.');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateCategory = (interestID, payload, oldName, api) =>{
    updateInterest(interestID, { interest: payload })
      .then((respone) => {
        showSuccessNotification('Interest has been updated successfully.');
      })
      .catch((error) => {
        const interest = InterestsModel.get(interestID);
        interest.props.name = oldName;
        new InterestsModel(interest.props).$save();
        api.refreshCells();
        showFailureNotification('Oops! Something went wrong while updating interest. Resetting value to old one.');
        console.log(error);
      });
  }

  render() {
    const { interests } = this.props;
    return (
      <div className="interest-table-container">
        <div>
          <ErrorBoundary name="Categories Table">
            <TableWrapper
              data={interests}
              headers={CATEGORIES_HEADER}
              handleEditClick={this.handleEditClick}
              handleViewClick={this.handleViewClick}
              handleDeleteClick={this.handleDeleteClick}
              updateCategory={this.updateCategory}
            />
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}

export default CategoriesTable;

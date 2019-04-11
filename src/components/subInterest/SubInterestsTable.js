/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import TableWrapper from '../table/TableWrapper';
import { CATEGORIES_HEADER } from './Constants';
import { deleteSubInterest, updateSubInterest } from '../../actions/appActions/SubInterest';
import routes from '../../utils/routes';
import { showSuccessNotification, showFailureNotification } from '../reusable/Notifications';
import ErrorBoundary from '../reusable/ErrorBoundary';
import SubInterestsModel from '../../models/AppModel/SubInterest';

class SubInterestTable extends Component {
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
    history.push(`/admin/dashboard/interest/${interestID}/sub-interest-list`);
  }

  handleDeleteClick = (subInterestID) => {
    deleteSubInterest(subInterestID)
      .then((response) => {
        SubInterestsModel.get(subInterestID).$delete();
        showSuccessNotification('Sub-Interest has been deleted successfully.');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateSubCategory = (interestID, subInterestID, payload, oldName, api) => {
    console.log(payload);
    updateSubInterest(interestID, subInterestID, { subinterest: payload })
      .then((respone) => {
        showSuccessNotification('Sub-Interest has been updated successfully.');
      })
      .catch((error) => {
        const interest = SubInterestsModel.get(subInterestID);
        interest.props.name = oldName;
        new SubInterestsModel(interest.props).$save();
        api.refreshCells();
        showFailureNotification('Oops! Something went wrong while updating interest. Resetting value to old one.');
        console.log(error);
      });
  }

  render() {
    const { subInterest } = this.props;
    return (
      <div className="sub-interest-table-container">
        <div>
          <ErrorBoundary name="Sub Interest Table">
            <TableWrapper
              data={subInterest}
              headers={CATEGORIES_HEADER}
              handleEditClick={this.handleEditClick}
              handleViewClick={this.handleViewClick}
              handleDeleteClick={this.handleDeleteClick}
              updateSubcategory={this.updateSubCategory}
            />
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}

export default SubInterestTable;

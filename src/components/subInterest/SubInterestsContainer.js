/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Skeleton, Tooltip } from 'antd';

import SubInterestsModel from '../../models/AppModel/SubInterest';
import { getSubInterests } from '../../actions/appActions/SubInterest';
import ErrorBoundary from '../reusable/ErrorBoundary';
import SuberestsTable from './SubInterestsTable';
import InterestDetails from '../interest/InterestsDetails';
import Filter from '../filter';
import './SubInterests.scss';
import { FILTERS } from '../../utils/constant';
import routes from '../../utils/routes';

class InterestContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.setLoading('loading', true);
    const { match } = this.props;
    getSubInterests(match.params.interestID)
      .then((payload) => {
        this.setLoading('loading', false);
        SubInterestsModel.saveAll(payload.subinterests.map(subInterest => new SubInterestsModel(subInterest)));
      })
      .catch((error) => {
        this.setLoading('loading', false);
        console.log(error);
      });
  }

  componentWillUnmount() {
    SubInterestsModel.deleteAll();
  }

  setLoading = (state, value) => {
    this.setState({
      [state]: value,
    });
  }

  getInterestsTable = () => {
    const { loading } = this.state;
    const { subInterest, ...rest } = this.props;
    return (
      <>
        {loading && <Skeleton active paragraph={{ row: 5 }} />}
        {!loading && <SuberestsTable subInterest={subInterest} {...rest} />}
      </>
    );
  }

  handleAddCategoryClick = () => {
    const { history, match } = this.props;
    history.push(`/admin/dashboard/interest/${match.params.interestID}/sub-interest/add`);
  }

  applyFilter = (filter = '') => {

  }

  handleCancelButtonClick = () => {
    const { history } = this.props;
    history.push(routes.interestList);
  }

  getFilter = () => (
    <Filter
      name={FILTERS.CATEGORIES}
      applyFilter={this.applyFilter}
      clearFilter={() => this.applyFilter()}
    />
  );

  getInterestDetails = () => <InterestDetails />

  render = () => (
    <div className="sub-interest-container">
      {this.getInterestDetails()}
      <div className="add-button">
        <Tooltip title="Add New Sub-Interest">
          <Button icon="plus" onClick={this.handleAddCategoryClick} />
        </Tooltip>
      </div>
      <div className="back-button">
        <Tooltip title="Back to Interest List">
          <Button icon="left" onClick={this.handleCancelButtonClick} />
        </Tooltip>
      </div>
      <div className="header">Sub Interests List</div>
      <ErrorBoundary name="Sub Interests Table">
        {this.getFilter()}
        {this.getInterestsTable()}
      </ErrorBoundary>
    </div>
  )
}

function mapStateToProps() {
  return {
    subInterest: SubInterestsModel.list()[0] ? SubInterestsModel.list().map(item => item[1].props) : [],
  };
}

export default connect(mapStateToProps)(InterestContainer);

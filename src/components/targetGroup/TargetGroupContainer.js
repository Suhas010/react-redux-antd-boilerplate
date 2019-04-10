/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-undef */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Empty, Skeleton } from 'antd';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import TargetGroupModel from '../../models/AppModel/TargetGroup';
import TargetGroup from './TargetGroup';
import Filter from '../filter';
import routes from '../../utils/routes';

import { showFailureNotification } from '../reusable/Notifications';
import { getTargetGroups } from '../../actions/appActions/TargetGroupAction';
import { FILTERS } from '../../utils/constant';
import './TargetGroup.scss';


const defaultFilter = '?max_per_page=15';
class TargetGroupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      currentPage: 1,
      maxPerPage: 15,
      totalRecords: 0,
      filter: defaultFilter,
    };
  }

  componentWillMount() {
    this.getTargetGroupsAPI(this.state.filter.concat(`&&page_number=${this.state.currentPage}`));
  }

  componentWillUnmount() {
    TargetGroupModel.deleteAll();
  }

  getTargetGroupsAPI = (filter) => {
    this.setLoading(true);
    getTargetGroups(filter)
      .then(((data) => {
        TargetGroupModel.saveAll(data.target_groups.map(item => new TargetGroupModel(item)));
        this.setState({
          totalRecords: data.total,
        });
        this.setLoading(false);
      }))
      .catch(() => {
        this.setLoading(false);
        showFailureNotification('Something went wrong while fetching target groups.');
      });
  }

  setLoading(value) {
    this.setState({
      loading: value,
    });
  }

  handleTGEditClick = (id) => {
    const { history } = this.props;
    history.push(`/admin/dashboard/target-groups/edit/${id}`);
  }

  handleAddTGButtonClick = () => {
    const { history } = this.props;
    history.push(routes.targetGroupAdd);
  }

  handleViewTargetGroupClick = (id) => {
    const { history } = this.props;
    // console.log('view q', id)
    history.push(`/admin/dashboard/${id}/questions`);
  }

  getTargetGroups = () => {
    const { targetGroup } = this.props;
    const { totalRecords, currentPage, maxPerPage } = this.state;
    if (!targetGroup) {
      return <Empty description="No target groups" />;
    }
    return (
      <TargetGroup
        data={targetGroup}
        pageSize={maxPerPage}
        currentPage={currentPage}
        totalRecords={totalRecords}
        handleEditClick={this.handleTGEditClick}
        handleViewClick={this.handleViewTargetGroupClick}
        handleAddClick={this.handleAddTGButtonClick}
        onPageChange={this.onPageChange}
      />
    );
  }

  applyFilter = (filter = '') => {
    TargetGroupModel.deleteAll();
    filter = defaultFilter.concat(filter);
    this.getTargetGroupsAPI(filter.concat(`&&page_number=${this.state.currentPage}`));
  }

  onPageChange = (currentPage) => {
    this.setState({
      currentPage,
    }, this.applyFilter());
  }

  getFilter = () => (
    <Filter
      name={FILTERS.TARGET_GROUP}
      applyFilter={this.applyFilter}
      clearFilter={() => this.applyFilter()}
    />
  );

  render() {
    const { loading } = this.state;
    return (
      <div className="target-group-container">
        <div className="header">Target Groups</div>
        {this.getFilter()}
        {loading && <Skeleton active paragraph={{ row: 5 }} />}
        {!loading && this.getTargetGroups()}
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    targetGroup: TargetGroupModel.list()[0] ? TargetGroupModel.list().map(item => item[1].props) : [],
  };
}

TargetGroupContainer.propTypes = {
  history: propTypes.object.isRequired,
  targetGroup: propTypes.array.isRequired,
};

export default connect(mapStateToProps)(withRouter(TargetGroupContainer));

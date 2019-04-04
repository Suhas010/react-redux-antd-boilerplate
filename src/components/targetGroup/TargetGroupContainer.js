/* eslint-disable no-undef */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import { Empty, Skeleton } from 'antd';
import TargetGroupModel from '../../models/AppModel/TargetGroup';
import QuestionModel from '../../models/AppModel/Questions';
import { getTargetGroups } from '../../actions/appActions/TargetGroupAction';
import TargetGroup from './TargetGroup';
import Filter from '../filter/'
import './TargetGroup.scss';
import { showFailureNotification } from '../reusable/Notifications';
import routes from '../../utils/routes';
import { FILTERS } from '../../utils/constant';

class TargetGroupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      pageNumber: 1,
      maxPerPage: 100,
    };
  }

  componentWillMount() {

    this.getTargetGroupsAPI();
  }

  componentWillUnmount() {
    TargetGroupModel.deleteAll();
  }

  getTargetGroupsAPI = (filter = '') => {
    this.setLoading(true);
    getTargetGroups(filter)
      .then(((data) => {
        TargetGroupModel.saveAll(data.target_groups.map(item => new TargetGroupModel(item)));
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
    if (!targetGroup) {
      return <Empty description="No target groups" />;
    }
    return (
      <TargetGroup
        data={targetGroup}
        handleEditClick={this.handleTGEditClick}
        handleViewClick={this.handleViewTargetGroupClick}
        handleAddClick={this.handleAddTGButtonClick}
      />
    );
  }

  applyFilter = (filter = '') => {
    TargetGroupModel.deleteAll();
    this.getTargetGroupsAPI(filter);
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

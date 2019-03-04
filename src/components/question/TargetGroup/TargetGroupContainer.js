/* eslint-disable no-undef */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import { Empty } from 'antd';
import TargetGroupModel from '../../../models/AppModel/TargetGroup';
import { getTargetGroups } from '../../../actions/appActions/TargetGroupAction';
import JLoader from '../../reusable/Loader';
import TargetGroup from './TargetGroup';
import './TargetGroup.scss';
import { showFailureNotification } from '../../reusable/Notifications';
import routes from '../../../utils/routes';

class TargetGroupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentWillMount() {
    this.setLoading(true);
    getTargetGroups()
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

  handleViewQuestionClick = (id) => {
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
        handleTGEditClick={this.handleTGEditClick}
        handleViewQuestionClick={this.handleViewQuestionClick}
        handleAddTGButtonClick={this.handleAddTGButtonClick}
      />
    );
  }

  render() {
    const { loading, addEdit } = this.state;
    return (
      <div className="target-group-container">
        <div className="target-group-header">Target Groups</div>
        {loading && <JLoader text="Loading" size="large" />}
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

/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import { Empty } from 'antd';
import TargetGroupModel from '../../../models/AppModel/TargetGroup';
import { TG } from '../Constants';
import JLoader from '../../reusable/Loader';
import TargetGroup from './TargetGroup';
import './TargetGroup.scss';

class TargetGroupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentWillMount() {
    // getTargetGroups().then((data => {
    //   console.log(data);
    // }));
    TargetGroupModel.saveAll(TG.map(item => new TargetGroupModel(item)));
  }

  handleTGEditClick = (id) => {
    const { history } = this.props;
    history.push(`/dashboard/target-groups/edit/${id}`);
  }

  handleAddTGButtonClick = () => {
    const { history } = this.props;
    history.push('/dashboard/target-groups/add');
  }
  
  handleViewQuestionClick = (id) => {
    const { history } = this.props;
    history.push(`/dashboard/${id}/add-question`);
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
        {loading && <JLoader text="Loading" size="large" />}
        {!loading && this.getTargetGroups()}
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    targetGroup: TargetGroupModel.list()[0] && TargetGroupModel.list().map(item => item[1].props),
  };
}

TargetGroupContainer.propTypes = {
  history: propTypes.object.isRequired,
  targetGroup: propTypes.array.isRequired,
};

export default connect(mapStateToProps)(withRouter(TargetGroupContainer));

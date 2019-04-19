/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Skeleton, Tooltip } from 'antd';
import InterestsModel from '../../models/AppModel/Interest';
import { getInterests } from '../../actions/appActions/InterestActions';
import ErrorBoundary from '../reusable/ErrorBoundary';
import JButton from '../reusable/JButton';
import InterestsTable from './InterestsTable';
import Filter from '../filter';
import './Interests.scss';
import routes from '../../utils/routes';
import { FILTERS } from '../../utils/constant';

class InterestContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.setLoading('loading', true);
    getInterests()
      .then((payload) => {
        this.setLoading('loading', false);
        InterestsModel.saveAll(payload.interests.map(interest => new InterestsModel(interest)));
      })
      .catch((error) => {
        this.setLoading('loading', false);
        console.log(error);
      });
  }

  componentWillUnmount() {
    InterestsModel.deleteAll();
  }

  setLoading = (state, value) => {
    this.setState({
      [state]: value,
    });
  }

  getInterestsTable = () => {
    const { loading } = this.state;
    const { interest, ...rest } = this.props;
    return (
      <>
        {loading && <Skeleton active paragraph={{ row: 5 }} />}
        {!loading && <InterestsTable interests={interest} {...rest} />}
      </>
    );
  }

  handleAddCategoryClick = () => {
    const { history } = this.props;
    history.push(routes.interestAdd);
  }

  applyFilter = (filter = '') => {
    // TargetGroupModel.deleteAll();
    // this.getTargetGroupsAPI(filter);
  }
 
  getFilter = () => (
    <Filter
      name={FILTERS.CATEGORIES}
      applyFilter={this.applyFilter}
      clearFilter={() => this.applyFilter()}
    />
  );

  render = () => (
    <div className="interest-container">
      <div className="add-button">
        <JButton
          icon="plus"
          tooltip="Add Interest."
          onClick={this.handleAddCategoryClick} 
        />
      </div>
      <div className="header">Interests List</div>
      <ErrorBoundary name="Interests Table">
        {this.getFilter()}
        {this.getInterestsTable()}
      </ErrorBoundary>
    </div>
  )
}

function mapStateToProps() {
  return {
    interest: InterestsModel.list()[0] ? InterestsModel.list().map(item => item[1].props) : [],
  };
}

export default connect(mapStateToProps)(InterestContainer);

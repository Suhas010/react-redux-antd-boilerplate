import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Skeleton } from 'antd';

import SubCategoriesModel from '../../models/AppModel/SubCategories';
import CategoryDetails from '../categories/CategoryDetails';
import { getSubCategories } from '../../actions/appActions/AppConfigActions';
import ErrorBoundary from '../reusable/ErrorBoundary';
import JButton from '../reusable/JButton';
import SubCategoriesTable from './SubCategoriesTable';

import './SubCategories.scss';
import routes from '../../utils/routes';
import { FILTERS } from '../../utils/constant';
import Filter from '../filter';

class SubCategoriesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.setLoading('loading', true);
    const { match } = this.props;
    SubCategoriesModel.deleteAll();
    getSubCategories(match.params.categoryID)
      .then((payload) => {
        this.setLoading('loading', false);
        SubCategoriesModel.saveAll(payload.subcategories.map(category => new SubCategoriesModel(category)));
      })
      .catch((error) => {
        this.setLoading('loading', false);
        console.log(error);
      });
  }

  setLoading = (state, value) => {
    this.setState({
      [state]: value,
    });
  }

  getSubCategoriesTable = () => {
    const { loading } = this.state;
    const { subCategories, ...rest } = this.props;
    return (
      <>
        {loading && <Skeleton active paragraph={{ row: 5 }} />}
        {!loading && <SubCategoriesTable subCategories={subCategories} {...rest} />}
      </>
    );
  }

  handleAddSubCategoryClick = () => {
    const { history, match } = this.props;
    history.push(`/admin/dashboard/category/${match.params.categoryID}/sub-categories-list/add`);
  }

  handleCancelButtonClick = () => {
    const { history } = this.props;
    history.push(routes.categoriesList);
  }

  getCategoryDetails = () => <CategoryDetails />

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
    <div className="categories-container">
      {this.getCategoryDetails()}
      <div className="add-button">
        <JButton icon="plus" onClick={this.handleAddSubCategoryClick} />
      </div>
      <div className="back-button">
        <JButton icon="left" onClick={this.handleCancelButtonClick} />
      </div>
      <div className="header">Sub-Categories List</div>
      {this.getFilter()}
      <ErrorBoundary name="Categories Table">
        {this.getSubCategoriesTable()}
      </ErrorBoundary>
    </div>
  )
}

function mapStateToProps() {
  return {
    subCategories: SubCategoriesModel.list()[0] ? SubCategoriesModel.list().map(item => item[1].props) : [],
  };
}

export default connect(mapStateToProps)(SubCategoriesContainer);

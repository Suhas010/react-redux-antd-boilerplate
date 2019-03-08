import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Skeleton } from 'antd';

import SubCategoriesModel from '../../models/AppModel/SubCategories';
import CategoryDetails from '../categories/CategoryDetails';
import { getSubCategories } from '../../actions/appActions/AppConfigActions';
import ErrorBoundary from '../reusable/ErrorBoundary';
import SubCategoriesTable from './SubCategoriesTable';

import './SubCategories.scss';
import routes from '../../utils/routes';

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

  render = () => (
    <div className="categories-container">
      {this.getCategoryDetails()}
      <div className="add-button" >
        <Button icon="plus" onClick={this.handleAddSubCategoryClick} />
      </div>
      <div className="back-button" >
        <Button icon="left" onClick={this.handleCancelButtonClick} />
      </div>
      <div className="header">Sub-Categories List</div>
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Skeleton } from 'antd';

import CategoriesModel from '../../models/AppModel/Categories';
import { getCategories } from '../../actions/appActions/AppConfigActions';
import ErrorBoundary from '../reusable/ErrorBoundary';
import CategoriesTable from './CategoriesTable';

import './Categories.scss';
import routes from '../../utils/routes';

class CategoriesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.setLoading('loading', true);
    getCategories()
      .then((payload) => {
        this.setLoading('loading', false);
        CategoriesModel.saveAll(payload.categories.map(category => new CategoriesModel(category)));
      })
      .catch((error) => {
        this.setLoading('loading', false);
        console.log(error);
      });
  }

  componentWillUnmount() {
    CategoriesModel.deleteAll();
  }

  setLoading = (state, value) => {
    this.setState({
      [state]: value,
    });
  }

  getCategoriesTable = () => {
    const { loading } = this.state;
    const { categories, ...rest } = this.props;
    return (
      <>
        {loading && <Skeleton active paragraph={{ row: 5 }} />}
        {!loading && <CategoriesTable categories={categories} {...rest} />}
      </>
    );
  }

  handleAddCategoryClick = () => {
    const { history } = this.props;
    history.push(routes.categoriesAdd);
  }

  render = () => (
    <div className="categories-container">
      <div className="add-button">
        <Button icon="plus" onClick={this.handleAddCategoryClick} />
      </div>
      <div className="header">Categories List</div>
      <ErrorBoundary name="Categories Table">
        {this.getCategoriesTable()}
      </ErrorBoundary>
    </div>
  )
}

function mapStateToProps() {
  return {
    categories: CategoriesModel.list()[0] ? CategoriesModel.list().map(item => item[1].props) : [],
  };
}

export default connect(mapStateToProps)(CategoriesContainer);

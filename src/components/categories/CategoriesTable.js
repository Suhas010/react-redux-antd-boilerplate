import React, { Component } from 'react';
import TableWrapper from '../table/TableWrapper';
import { CATEGORIES_HEADER } from './Constants';
import { deleteCategory, updateCategory } from '../../actions/appActions/AppConfigActions';
import routes from '../../utils/routes';
import { showSuccessNotification, showFailureNotification } from '../reusable/Notifications';
import CategoriesModel from '../../models/AppModel/Categories';
import ErrorBoundary from '../reusable/ErrorBoundary';

class CategoriesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  handleEditClick = (categoryId) => {
    const { history } = this.props;
    history.push(`${routes.categoriesList}/${categoryId}/edit`);
  }

  handleViewClick = (categoryID) => {
    const { history } = this.props;
    history.push(`/admin/dashboard/category/${categoryID}/sub-categories-list`);
  }

  handleDeleteClick = (categoryId) => {
    
    deleteCategory(categoryId)
      .then((response) => {
        CategoriesModel.get(categoryId).$delete();
        showSuccessNotification('Category has been deleted successfully.');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateCategory = (categoryID, payload, oldName, api) =>{
    updateCategory(categoryID, { category: payload })
      .then((respone) => {
        showSuccessNotification('Category has been updated successfully.');
      })
      .catch((error) => {
        const category = CategoriesModel.get(categoryID);
        category.props.name = oldName;
        new CategoriesModel(category.props).$save();
        api.refreshCells();
        showFailureNotification('Oops! Something went wrong while updating category. Resetting value to old one.');
        console.log(error);
      });
  }

  render() {
    const { categories } = this.props;
    return (
      <div className="categories-table-container">
        <div>
          <ErrorBoundary name="Categories Table">
            <TableWrapper
              data={categories}
              headers={CATEGORIES_HEADER}
              handleEditClick={this.handleEditClick}
              handleViewClick={this.handleViewClick}
              handleDeleteClick={this.handleDeleteClick}
              updateCategory={this.updateCategory}
            />
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}

export default CategoriesTable;

import React, { Component } from 'react';
import TableWrapper from '../table/TableWrapper';
import { SUB_CATEGORIES_HEADER } from './Constants';
import { deleteSubCategory } from '../../actions/appActions/AppConfigActions';
import SubCategoryModel from '../../models/AppModel/SubCategories';
import { showSuccessNotification } from '../reusable/Notifications';
import routes from '../../utils/routes';

class SubCategoriesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  handleEditClick = (subCategoryId) => {
    const { history, match } = this.props;
    history.push(`/admin/dashboard/category/${match.params.categoryID}/sub-categories-list/${subCategoryId}/edit`);
  }

  handleDeleteClick = (categoryId) => {  
    deleteSubCategory(categoryId)
      .then((response) => {
        SubCategoryModel.get(categoryId).$delete();
        showSuccessNotification('Category has been deleted successfully.');
      })
      .catch((e) => {
        console.log(e);
      });
  }
  
  handleViewClick = (categoryID) => {
    const { history } = this.props;
    history.push(`/admin/dashboard/category/${categoryID}/sub-categories-list`);
  }

  render() {
    const { subCategories } = this.props;
    return (
      <div className="categories-table-container">
        <div>
          <TableWrapper
            data={subCategories}
            headers={SUB_CATEGORIES_HEADER}
            handleEditClick={this.handleEditClick}
            handleViewClick={this.handleViewClick}
            handleDeleteClick={this.handleDeleteClick}
          />
        </div>
      </div>
    );
  }
}

export default SubCategoriesTable;

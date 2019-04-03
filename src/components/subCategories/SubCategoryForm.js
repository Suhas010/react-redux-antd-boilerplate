/* eslint-disable react/prop-types */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import { addSubCategory, updateSubCategory, getSubCategory } from '../../actions/appActions/AppConfigActions'
import JInput from '../reusable/Input';
import CategoryDetails from '../categories/CategoryDetails';
import { showSuccessNotification } from '../reusable/Notifications';
import './SubCategories.scss';

class SubCategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subCategory: '',
      error: '',
      submitLoading: false,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.params.subCategoryID) {
      getSubCategory(match.params.subCategoryID)
        .then((payload) => {
          this.setEditData(payload.category);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  setEditData = ({ name }) => {
    this.setState({
      subCategory: name,
    });
  }

  addSubCategory(payload) {
    this.setLoading('submitLoading', true);
    const { match } = this.props;

    addSubCategory(match.params.categoryID, { subcategory: payload })
      .then((respone) => {
        console.log(respone, "Add sub");
        this.setLoading('submitLoading', true);
        showSuccessNotification('New subCategory has been added successfully.');
        this.handleCancel();
      })
      .catch((error) => {
        this.setLoading('submitLoading', false);
        console.log(error);
      });
  }

  updateSubCategory(subCategoryID, payload) {
    this.setLoading('submitLoading', true);
    const { match } = this.props;
    updateSubCategory(match.params.categoryID, subCategoryID, { subcategory: payload })
      .then((respone) => {
        this.setLoading('submitLoading', true);
        showSuccessNotification('Sub- Category has been updated successfully.');
        this.handleCancel();
      })
      .catch((error) => {
        this.setLoading('submitLoading', false);
        console.log(error);
      });
  }

  setLoading = (state, value) => {
    this.setState({
      [state]: value,
    });
  }

  getHeader = () => {
    const { match } = this.props;
    if (match.params.subCategoryID) {
      return 'Update';
    }
    return 'Add';
  }

  handleCancel = () => {
    const { history, match } = this.props;
    history.push(`/admin/dashboard/category/${match.params.categoryID}/sub-categories-list`);
  }

  validateForm = () => {
    const { subCategory } = this.state;
    if (!subCategory || subCategory.trim().length === 0) {
      this.setState({
        error: 'Sub-Category name is mandatory.',
      });
      return 0;
    }
    return 1;
  }

  handleSubmitClick = () => {
    if (!this.validateForm()) {
      return 0;
    }
    const { subCategory } = this.state;
    const { match } = this.props;
    const payload = {
      name: subCategory,
    };
    if (match.params.subCategoryID) {
      this.updateSubCategory(match.params.subCategoryID, payload);
      return 0;
    }
    this.addSubCategory(payload);
  }

  handleValueChange = ({ target }) => {
    // console.log(target);
    this.setState({
      subCategory: target.value,
    });
  }

  getCategoryDetails = () => <CategoryDetails />

  getForm = () => {
    const { subCategory, error, submitLoading } = this.state;
    return (
      <>
        <div className="form-header">
          {`${this.getHeader()} Sub-Categories`}
        </div>
        {/* <Divider /> */}
        <Row>
          <Col span={12} offset={6}>
            <JInput
              label="Sub-Category Name"
              type="text"
              value={subCategory}
              error={error}
              onChange={this.handleValueChange}
              required
            />
          </Col>
        </Row>
        {/* <Divider /> */}
        <Row>
          <Col span={24}>
            <div className="actions-container">
              <div>
                <Button onClick={this.handleSubmitClick} type="primary" loading={submitLoading}>
                  {this.getHeader()}
                </Button>
              </div>
              <div style={{ paddingLeft: '3%' }}>
                <Button onClick={this.handleCancel}>Cancel</Button>
              </div>
            </div>
          </Col>
        </Row>
      </>
    );
  }

  render = () => (
    <>
      <div>{this.getCategoryDetails()}</div>
      <div className="category-form-container">
        {this.getForm()}
      </div>
    </>
  );
}

export default SubCategoryForm;


/* eslint-disable react/sort-comp */
import React, { Component } from 'react';

import './Categories.scss';
import { Divider, Row, Col, Button } from 'antd';
import { addCategory, updateCategory, getCategory } from '../../actions/appActions/AppConfigActions'
import JInput from '../reusable/Input';
import routes from '../../utils/routes';
import { showSuccessNotification } from '../reusable/Notifications';

class CategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      error: '',
      submitLoading: false,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.params.categoryID) {
      getCategory(match.params.categoryID)
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
      category: name,
    });
  }

  addCategory(payload) {
    this.setLoading('submitLoading', true);
    addCategory({ category: payload })
      .then((respone) => {
        this.setLoading('submitLoading', true);
        showSuccessNotification('New category has been added successfully.');
        this.handleCancel();
      })
      .catch((error) => {
        this.setLoading('submitLoading', true);
        console.log(error);
      });
  }

  updateCategory(payload) {
    this.setLoading('submitLoading', true);
    updateCategory({ category: payload })
      .then((respone) => {
        this.setLoading('submitLoading', true);
        showSuccessNotification('Category has been updated successfully.');
        this.handleCancel();
      })
      .catch((error) => {
        this.setLoading('submitLoading', true);
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
    if (match.params.categoryID) {
      return 'Update';
    }
    return 'Add';
  }

  handleCancel = ()=> {
    const { history } = this.props;
    history.push(routes.categoriesList);
  }

  validateForm = () => {
    const { category } = this.state;
    if (!category || category.trim().length ===0) {
      this.setState({
        error: 'Category name is mandatory.',
      });
      return 0;
    }
    return 1;
  }

  handleSubmitClick = () => {
    if (!this.validateForm()) {
      return 0;
    }
    const { category } = this.state;
    const { match } = this.props;
    const payload = {
      name: category,
    };
    if (match.params.categoryID) {
      payload.id = match.params.categoryID;
      this.updateCategory(payload);
      return 0;
    }
    this.addCategory(payload);

  }

  handleValueChange = ({ target }) => {
    // console.log(target);
    this.setState({
      category: target.value,
    });
  }

  getForm = () => {
    const { category, error, submitLoading } = this.state;
    return (
      <>
        <div className="form-header">
          {`${this.getHeader()} Categories`}
        </div>
        {/* <Divider /> */}
        <Row>
          <Col span={12}>
            <JInput
              label="Category Name"
              type="text"
              value={category}
              error={error}
              onChange={this.handleValueChange}
              required
            />
          </Col>
        </Row>
        {/* <Divider /> */}
        <Row>
          <Col span={24}>
            <div className="actions">
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
    <div className="category-form-container">
      {this.getForm()}
    </div>
  );
}

export default CategoryForm;


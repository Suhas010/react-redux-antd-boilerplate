/* eslint-disable radix */
/* eslint-disable no-useless-return */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Row, Col, Button, Icon, Skeleton, Divider } from 'antd';
import { connect } from 'react-redux';
import { CONFIG } from './Constants';
import JInput from '../reusable/Input';
import JSelect from '../reusable/Select';
import JSwitch from '../reusable/Switch';
import './TargetGroup.scss';
import TargetGroupModel from '../../models/AppModel/TargetGroup';
import CategoriesModel from '../../models/AppModel/Categories';
import { getTargetGroup, saveTargetGroup, updateTargetGroup } from '../../actions/appActions/TargetGroupAction';
import { getCategories, getSubCategories } from '../../actions/appActions/AppConfigActions';
import routes from '../../utils/routes';
import { getConfigFor, getIDOf } from '../../utils/commonFunctions';
import { showWarningNotification, showSuccessNotification } from '../reusable/Notifications';

const MAX_AGE = 60;
const MIN_AGE = 0;

class TargetGroupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      subCategoryLoading: false,
      submitLoading: false,
      subCategories: [],
      subCategory: '',
      addEdit: false,
      gender: 1,
      minAge: 2,
      maxAge: 14,
      isRegionSpecific: false,
      error: {},
      id: '',
    };
  }

  componentWillMount() {
    const { match } = this.props;
    this.setLoading('loading', true);
    getCategories().then((payload) => {
      this.setLoading('loading', false);
      CategoriesModel.saveAll(payload.categories.map(category => new CategoriesModel(category)));
    }).catch(() => {
      this.setLoading('loading', false);
    });
    if (!match.params.targetID) {
      return 0;
    }

    if (TargetGroupModel.list().length > 0) {
      this.setEditData(TargetGroupModel.get(match.params.targetID).props);
      return 0;
    }
    getTargetGroup(match.params.targetID)
      .then((payload) => {
        this.setEditData(payload.target_group);
        new TargetGroupModel(payload.target_group).$save();
      }).catch(() => {
        this.setLoading('loading', false);
      });
    return 0;
  }

  componentWillUnmount() {
    this.setState({});
  }

  addTargetGroup =(payload) => {
    const { history } = this.props;
    saveTargetGroup({ target_group: payload })
      .then((data) => {
        showSuccessNotification('A new target group created successfully.');
        this.setLoading('submitLoading', false);
        history.push(routes.targetGroupList);
      }).catch(() => {
        this.setLoading('submitLoading', false);
      });
  }

  updateTargetGroup = (payload) => {
    const { history } = this.props;
    updateTargetGroup({ target_group: payload })
      .then((data) => {
        showSuccessNotification('Target group updated successfully.');
        this.setLoading('submitLoading', false);
        history.push(routes.targetGroupList);
      }).catch(() => {
        this.setLoading('submitLoading', false);
      });
  }

  getSubCategories = (id, categoryChanged = false) => {
    this.setLoading('subCategoryLoading', true);
    getSubCategories(id)
      .then((payload) => {
        this.setLoading('subCategoryLoading', false);
        if (!categoryChanged) {
          this.setState({
            subCategories: payload.subcategories,
          });
          return;
        }
        this.setState({
          subCategories: payload.subcategories,
          subCategory: null,
        });
      }).catch(() => {
        this.setState({
          subCategories: [],
          subCategory: null,
          subCategoryLoading: false,
        });
      });
  }

  setEditData = ({
    id, gender, maximum_age, minimum_age, category, subcategory,
  }) => {
    this.getSubCategories(category.id);
    this.setState({
      id,
      gender: getIDOf('genders', gender),
      category: category.id,
      maxAge: maximum_age,
      minAge: minimum_age,
      subCategory: subcategory.id,
      loading: false,
    });
  }

  setLoading = (type, value) => {
    this.setState({
      [type]: value,
    });
  }

  setError = (field, msg) => {
    const { error } = this.state;
    error[field] = msg;
    this.setState({
      error,
    });
  }

  resetErrors = () => {
    this.setState({
      error: {},
    });
  }

  validateAge = (value, type) => {
    const { minAge, maxAge } = this.state;
    const updatedValue = parseInt(value);
    if (type === 'minAge') {
      if (updatedValue > maxAge || updatedValue < MIN_AGE || updatedValue > MAX_AGE || !value) {
        this.setError('minAge', 'Incorrect age.');
      }
      return;
    }
    if (updatedValue < minAge || updatedValue < MIN_AGE || updatedValue > MAX_AGE || !value) {
      this.setError('maxAge', 'Incorrect age.');
    }
  }

  handleChange = (value, type) => {
    if (type === 'category') {
      this.getSubCategories(value, true);
    }
    if (type === 'subCategory') {
      this.setError('subCategory', '');
    }
    if (type === 'minAge' || type === 'maxAge') {
      this.resetErrors();
      this.validateAge(value, type);
      value = parseInt(value);
    }
    this.setState({
      [type]: value,
    });
  };

  validateForm = ({
    maxAge, minAge,
    subCategory,
  }) => {
    if (!subCategory) {
      this.setError('subCategory', 'Please select sub-category.');
      return false;
    }
    if (!minAge || !maxAge) {
      this.setError('minAge', 'Should not be empty.');
      this.setError('maxAge', 'Should not be empty.');
      return false;
    }
    if (minAge > MAX_AGE || minAge < MIN_AGE) {
      this.setError('minAge', 'Incorrect age.');
      return false;
    }
    if (maxAge > MAX_AGE || maxAge < MIN_AGE) {
      this.setError('maxAge', 'Incorrect age.');
      return false;
    }
    if (minAge > maxAge) {
      this.setError('minAge', 'Incorrect age.');
      this.setError('maxAge', 'Incorrect age.');
      return false;
    }
    this.resetErrors();
    return true;
  }

  handleSubmitClick = () => {
    const {
      maxAge, minAge,
      category, subCategory,
      gender, id,
    } = this.state;
    if (!this.validateForm(this.state)) {
      showWarningNotification('Looks like something is wrong in form.');
      return false;
    }
    this.setLoading('submitLoading', true);
    const payload = {
      gender,
      maximum_age: maxAge,
      minimum_age: minAge,
      category_id: category,
      subcategory_id: subCategory,
    };
    if (id) {
      payload.id = id;
      this.updateTargetGroup(payload);
      return 0;
    }
    this.addTargetGroup(payload);
  };

  handleCancel = () => {
    const { history } = this.props;
    history.push(routes.targetGroupList);
  };

  getHeader = () => {
    const { match } = this.props;
    if (match.params && match.params.targetID) {
      return 'Update';
    }
    return 'Add';
  };

  getForm = ({
    error,
    gender,
    minAge,
    maxAge,
    isRegionSpecific,
    country,
    state,
    city,
    tier,
    category,
    subCategory,
    subCategories,
    subCategoryLoading,
    submitLoading,
  }) => {
    const { categories } = this.props;
    return (
      <div className="target-group-form">
        <Row className="target-group-header">
          {`${this.getHeader()} Target Group`}
          <Divider />
        </Row>
        <Row>
          <Col span={12}>
            <JSelect
              showSearch
              onChange={e => this.handleChange(e, 'category')}
              options={categories}
              placeholder="Select category"
              label="Category"
              value={category || undefined}
              labelClass="label"
              style={{ width: '100%' }}
              required
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            />
          </Col>
          <Col span={11} offset={1}>
            <JSelect
              showSearch
              onChange={e => this.handleChange(e, 'subCategory')}
              options={subCategories}
              placeholder="Select sub-category"
              label="Sub Category"
              value={subCategory || undefined}
              labelClass="label"
              className={error.subCategory ? 'select-error' : ''}
              style={{ width: '100%' }}
              required
              loading={subCategoryLoading}
              disabled={!category ? true : subCategoryLoading}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              error={error.subCategory}
            />
          </Col>
        </Row>
        <Row style={{ paddingTop: 18 }}>
          <Col span={8}>
            <JSelect
              label="Gender"
              labelClass="label"
              options={getConfigFor('genders')}
              value={gender}
              onChange={e => this.handleChange(e, 'gender')}
              style={{ width: '100%' }}
            />
          </Col>
          <Col span={7} offset={1}>
            <JInput
              label="Minimum Age"
              labelClass="label"
              options={CONFIG.genders}
              value={minAge}
              type="number"
              min={0}
              max={100}
              onChange={e => this.handleChange(e.target.value, 'minAge')}
              error={error.minAge}
            />
          </Col>
          <Col span={7} offset={1}>
            <JInput
              label="Maximum Age"
              labelClass="label"
              options={CONFIG.genders}
              value={maxAge}
              type="number"
              min={0}
              max={100}
              onChange={e => this.handleChange(e.target.value, 'maxAge')}
              error={error.maxAge}
            />
          </Col>
        </Row>
        <Row style={{ paddingTop: 18 }}>
          <Col span={10}>
            <JSwitch
              label="Region specific?"
              labelClass="label"
              disabled
              value={isRegionSpecific}
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="close" />}
              onChange={e => this.handleChange(e, 'isRegionSpecific')}
            />
          </Col>
        </Row>
        {isRegionSpecific && (
          <Row className="row-padding">
            <Col span={5}>
              <JSelect
                label="Country"
                labelClass="label"
                value={country}
                options={CONFIG.questionTypes}
                onChange={e => this.handleChange(e, 'country')}
                style={{ width: '100%' }}
              />
            </Col>
            <Col span={5} offset={1}>
              <JSelect
                label="State"
                labelClass="label"
                value={state}
                options={CONFIG.questionTypes}
                onChange={e => this.handleChange(e, 'state')}
                style={{ width: '100%' }}
              />
            </Col>
            <Col span={5} offset={1}>
              <JSelect
                label="City"
                labelClass="label"
                value={city}
                options={CONFIG.questionTypes}
                onChange={e => this.handleChange(e, 'city')}
                style={{ width: '100%' }}
              />
            </Col>
            <Col span={5} offset={1}>
              <JSelect
                label="Tier"
                labelClass="label"
                value={tier}
                options={CONFIG.questionTypes}
                onChange={e => this.handleChange(e, 'tier')}
                style={{ width: '100%' }}
              />
            </Col>
          </Row>
        )}
        <Row>
          <Col span={24}>
            <div className="actions">
              <div>
                <Button onClick={this.handleSubmitClick} type="primary" loading={submitLoading}>
                  {this.getHeader()}
                </Button>
              </div>
              <div>
                <Button onClick={this.handleCancel}>Cancel</Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  };

  render = () => {
    const { loading } = this.state;
    return (
      <div className="target-group-form-container">
        {loading && <Skeleton active paragraph={{ row: 5 }} /> }
        {!loading && this.getForm(this.state)}
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    categories: CategoriesModel.list()[0] ? CategoriesModel.list().map(item => item[1].props) : [],
  };
}
export default connect(mapStateToProps)(TargetGroupForm);

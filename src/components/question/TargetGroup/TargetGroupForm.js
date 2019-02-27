/* eslint-disable radix */
/* eslint-disable no-useless-return */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import { connect } from 'react-redux';
import { CONFIG } from '../Constants';
import JInput from '../../reusable/Input';
import JSelect from '../../reusable/Select';
import JSwitch from '../../reusable/Switch';
import './TargetGroup.scss';
import TargetGroupModel from '../../../models/AppModel/TargetGroup';
import CategoriesModel from '../../../models/AppModel/Categories';
import { getTargetGroup } from '../../../actions/appActions/TargetGroupAction';
import { getCategories, getSubCategories } from '../../../actions/appActions/AppConfigActions';
import JLoader from '../../reusable/Loader';
import routes from '../../../utils/routes';
import { showWarningNotification } from '../../reusable/Notifications';

const initialError = {
  minAge: '',
  maxAge: '',
  subCategory: '',
};
class TargetGroupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      subCategoryLoading: false,
      subCategories: [],
      addEdit: false,
      gender: 1,
      minAge: "",
      maxAge: "",
      region: false,
      error: initialError,
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
    if (!match.params.id) {
      return 0;
    }
    
    if (TargetGroupModel.list().length > 0) {
      this.setEditData(TargetGroupModel.get(match.params.id).props);
      return 0;
    }
    getTargetGroup(match.params.id)
      .then((payload) => {
        this.setEditData(payload.target_group);
      }).catch(() => {
        this.setLoading('loading', false);
      });
    return 0;
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
    id, gender, maximum_age, minimum_age, category_id, subcategory_id,
  }) => {
    this.getSubCategories(category_id);
    this.setState({
      gender,
      maxAge: maximum_age,
      minAge: minimum_age,
      category: category_id,
      subCategory: subcategory_id,
      loading: false,
    });
  }

  setLoading = (type, value) => {
    this.setState({
      [type]: value,
    });
  }

  setError = (field, msg) => {
    console.log("**")
    const { error } = this.state;
    error[field] = msg;
    this.setState({
      error,
    });
  }

  resetErrors = () => {
    console.log("##");
    let { error } = this.state;
    error = { ...initialError };
    console.log(error, initialError);
    this.setState({
      error,
    });
  }

  validateAge = (value, type) => {
    const { minAge, maxAge } = this.state;
    const updatedValue = parseInt(value);
    if (type === 'minAge') {
      if (updatedValue > maxAge || updatedValue < 0 || updatedValue > 100 || !value) {
        this.setError('minAge', 'Incorrect age.');
        this.setError('subCategory', 'Incorrect age.');
      }
      return;
    }
    if (updatedValue < minAge || updatedValue < 0 || updatedValue > 100 || !value) {
      this.setError('maxAge', 'Incorrect age.');
    }
  }

  handleChange = (value, type) => {
    if (type === 'category') {
      this.getSubCategories(value, true);
    }
    if (type === 'minAge' || type === 'maxAge') {
      this.resetErrors();
      this.validateAge(value, type);
    }
    this.setState({
      [type]: value,
    });
  };

  handleSubmitClick = () => {
    console.log("FORM", this.state);


  };

  handleCancel = () => {
    const { history } = this.props;
    history.push(routes.targetGroup);
  };

  getHeader = () => {
    const { match } = this.props;
    if (match.params && match.params.id) {
      return 'Edit';
    }
    return 'Add';
  };

  getForm = ({
    error,
    gender,
    minAge,
    maxAge,
    region,
    country,
    state,
    city,
    tier,
    id,
    category,
    subCategory,
    subCategories,
    subCategoryLoading,
  }) => {
    const { categories } = this.props;
    console.log(error, error.minAge, "$$$$$");
    return (
      <div className="target-group-form">
        <Row className="target-group-header">
          {`${this.getHeader()} Target Group`}
        </Row>
        <Row>
          <Col span={12}>
            <JSelect
              showSearch
              onChange={e => this.handleChange(e, 'category')}
              options={categories}
              label="Category"
              value={category}
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
              disabled={subCategoryLoading}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              error={error.subCategory}
            />
          </Col>
        </Row>
        <Row style={{ paddingTop: 10 }}>
          <Col span={8}>
            <JSelect
              label="Gender"
              labelClass="label"
              options={CONFIG.genders}
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
        <Row className="row-padding">
          <Col span={10}>
            <JSwitch
              label="Is region specific?"
              labelClass="label"
              value={region}
              onChange={e => this.handleChange(e, 'region')}
              style={{ display: 'flex', marginTop: 8 }}
            />
          </Col>
        </Row>
        {region && (
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
                <Button onClick={this.handleSubmitClick} type="primary">
                  {`${this.getHeader()}  Target Group`}
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
        {loading && <JLoader /> }
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

import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import { CONFIG } from '../Constants';
import JInput from '../../reusable/Input';
import JSelect from '../../reusable/Select';
import JSwitch from '../../reusable/Switch';
import './TargetGroup.scss';

class TargetGroupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      addEdit: false,
      gender: 1,
      minAge: '',
      maxAge: '',
      region: false,
    };
  }


  handleChange = (value, type) => {
    this.setState({
      [type]: value,
    });
  }

  handleSubmitClick = () => {
    console.log('FORM', this.state);
  }

  handleCancel = () => {
    const { history } = this.props;
    history.push('/dashboard/target-groups');
  }

  getHeader = () => {
    const { match } = this.props;
    if (match.params && match.params.id) {
      return 'Edit';
    }
    return 'Add';
  }

  getForm = ({
    gender, minAge, maxAge, region, country, state, city, tier, id, category, subCategory
  }) => {
    return (
      <div className="target-group-form">
        <Row className="target-group-header">
          {`${this.getHeader()} Target Group`}
        </Row>
        <Row>
          <Col span={12}>
            <JSelect
              onChange={e => this.handleChange(e, 'category')}
              options={CONFIG.questionTypes}
              label="Category"
              value={category}
              labelClass="label"
              style={{ width: '100%' }}
              required
            />
          </Col>
          <Col span={11} offset={1}>
            <JSelect
              onChange={e => this.handleChange(e, 'subCategory')}
              options={CONFIG.questionTypes}
              label="Sub Category"
              value={subCategory}
              labelClass="label"
              style={{ width: '100%' }}
              required
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
              onChange={e => this.handleChange(e.target.value, 'minAge')}
            />
          </Col>
          <Col span={7} offset={1}>
            <JInput
              label="Maximum Age"
              labelClass="label"
              options={CONFIG.genders}
              value={maxAge}
              onChange={e => this.handleChange(e.target.value, 'maxAge')}
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
        { region && (
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
                <Button onClick={this.handleSubmitClick} intent>Add Target Group</Button>
              </div>
              <div>
                <Button onClick={this.handleCancel}>Cancel</Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }


  render = () => (
    <div className="target-group-form-container">
      {this.getForm(this.state)}
    </div>
  )
}

export default TargetGroupForm;

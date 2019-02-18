import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Empty, Row, Col, Button } from 'antd';

import TargetGroupModel from '../../../models/AppModel/TargetGroup';
import { TG, CONFIG } from '../Constants';
import JLoader from '../../reusable/Loader';
import TargetGroup from './TargetGroup';
import './TargetGroup.scss';
import JInput from '../../reusable/Input';
import JSelect from '../../reusable/Select';
import JSwitch from '../../reusable/Switch';

class TargetGroupContainer extends Component {
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

  componentWillMount() {
    TargetGroupModel.saveAll(TG.map(item => new TargetGroupModel(item)));
  }

  handleTGEditClick = (id) => {
    this.setState({
      addEdit: true,
      id,
    });
  }

  handleAddTGButtonClick = () => {
    this.setState({
      addEdit: true,
    });
  }
  
  handleCancel = () => {
    this.setState({
      addEdit: false,
      id: null,
    });
  }

  handleViewQuestionClick = (id) => {
    const { history } = this.props;
    history.push(`/dashboard/add-question/${id}`);
  }

  getTargetGroups = () => {
    const { targetGroup } = this.props;
    console.log(targetGroup);
    if (!targetGroup) {
      return <Empty description="No target groups" />;
    }
    return (
      <TargetGroup
        data={targetGroup}
        handleTGEditClick={this.handleTGEditClick}
        handleViewQuestionClick={this.handleViewQuestionClick}
        handleAddTGButtonClick={this.handleAddTGButtonClick}
      />
    );
  }

  handleChange = (value, type) => {
    this.setState({
      [type]: value,
    });
  }
  
  handleSubmitClick = () => {
    console.log('FORM', this.state);
  }

  getTargetGroupFrom = () => {
    const { gender, minAge, maxAge, region, country, state, city, tier, id, category, subCategory } = this.state;
    return (
      <div className="target-group-form">
        <Row className="target-group-header">
          {`${id ? 'Edit' : 'Add'} Target Group`}
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
                <Button onClick={this.handleSubmitClick}>Add Target Group</Button>
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

  render() {
    const { loading, addEdit } = this.state;
    return (
      <div className="target-group-container">
        {loading && <JLoader text="Loading" size="large" />}
        {!loading && !addEdit && this.getTargetGroups()}
        {addEdit && this.getTargetGroupFrom()}
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    targetGroup: TargetGroupModel.list()[0] && TargetGroupModel.list().map(item => item[1].props),
  };
}

export default connect(mapStateToProps)(withRouter(TargetGroupContainer));

/* eslint-disable react/sort-comp */
import React, { Component } from 'react';

import { Divider, Row, Col, Button } from 'antd';
import { addSubInterest, updateSubInterest, getSubInterests } from '../../actions/appActions/SubInterest';
import JInput from '../reusable/Input';
import routes from '../../utils/routes';
import { showSuccessNotification } from '../reusable/Notifications';
import './SubInterests.scss';


class SubInterestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subInterest: '',
      error: '',
      submitLoading: false,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.params.subInterestID) {
      getSubInterests(match.params.interestID)
        .then((payload) => {
          this.setEditData(payload.subinterests);
        })
        .catch((error) => {
          this.handleCancel();
          console.log(error);
        });
    }
  }

  setEditData = ({ name }) => {
    this.setState({
      subInterest: name,
    });
  }

  addSubInterest(payload) {
    const { match } = this.props;
    this.setLoading('submitLoading', true);
    addSubInterest(match.params.interestID, { subInterest: payload })
      .then((respone) => {
        this.setLoading('submitLoading', true);
        showSuccessNotification('New sub-interest has been added successfully.');
        this.handleCancel();
      })
      .catch((error) => {
        this.setLoading('submitLoading', false);
        console.log(error);
      });
  }

  updateSubInterest(id, payload) {
    this.setLoading('submitLoading', true);
    updateSubInterest(id, { subInterest: payload })
      .then((respone) => {
        this.setLoading('submitLoading', true);
        showSuccessNotification('Interest has been updated successfully.');
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
    if (match.params.subInterestID) {
      return 'Update';
    }
    return 'Add';
  }

  handleCancel = ()=> {
    const { history, match } = this.props;
    history.push(`/admin/dashboard/interest/${match.params.interestID}/sub-interest`);
  }

  validateForm = () => {
    const { subInterest } = this.state;
    if (!subInterest || subInterest.trim().length ===0) {
      this.setState({
        error: 'Sub Interest name is mandatory.',
      });
      return 0;
    }
    return 1;
  }

  handleSubmitClick = () => {
    if (!this.validateForm()) {
      return 0;
    }
    const { subInterest } = this.state;
    const { match } = this.props;
    const payload = {
      name: subInterest,
    };
    if (match.params.categoryID) {
      // payload.id = match.params.categoryID;
      this.updateSubInterest(match.params.categoryID, payload);
      return 0;
    }
    this.addSubInterest(payload);
  }

  handleValueChange = ({ target }) => {
    // console.log(target);
    this.setState({
      subInterest: target.value,
    });
  }

  getForm = () => {
    const { subInterest, error, submitLoading } = this.state;
    return (
      <>
        <div className="form-header">
          {`${this.getHeader()} Sub-Interest`}
        </div>
        {/* <Divider /> */}
        <Row>
          <Col span={12} offset={6}>
            <JInput
              labelClass="j-label"
              label="Sub-Interest Name"
              type="text"
              value={subInterest}
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
    <div className="sub-interest-form-container">
      {this.getForm()}
    </div>
  );
}

export default SubInterestForm;


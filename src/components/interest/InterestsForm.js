/* eslint-disable react/sort-comp */
import React, { Component } from 'react';

import { Row, Col } from 'antd';
import { addInterest, updateInterest } from '../../actions/appActions/InterestActions'
import JInput from '../reusable/Input';
import JButton from '../reusable/JButton';
import routes from '../../utils/routes';
import { showSuccessNotification } from '../reusable/Notifications';
import './Interests.scss';


class InterestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interest: '',
      error: '',
      submitLoading: false,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.params.categoryID) {
      addInterest(match.params.interestID)
        .then((payload) => {
          this.setEditData(payload.interest);
        })
        .catch((error) => {
          this.handleCancel();
          console.log(error);
        });
    }
  }

  setEditData = ({ name }) => {
    this.setState({
      interest: name,
    });
  }

  addInterest(payload) {
    this.setLoading('submitLoading', true);
    addInterest({ interest: payload })
      .then((respone) => {
        this.setLoading('submitLoading', true);
        showSuccessNotification('New interest has been added successfully.');
        this.handleCancel();
      })
      .catch((error) => {
        this.setLoading('submitLoading', false);
        console.log(error);
      });
  }

  updateInterest(id, payload) {
    this.setLoading('submitLoading', true);
    updateInterest(id, { interest: payload })
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
    if (match.params.interestID) {
      return 'Update';
    }
    return 'Add';
  }

  handleCancel = ()=> {
    const { history } = this.props;
    history.push(routes.interestList);
  }

  validateForm = () => {
    const { interest } = this.state;
    if (!interest || interest.trim().length ===0) {
      this.setState({
        error: 'Interest name is mandatory.',
      });
      return 0;
    }
    return 1;
  }

  handleSubmitClick = () => {
    if (!this.validateForm()) {
      return 0;
    }
    const { interest } = this.state;
    const { match } = this.props;
    const payload = {
      name: interest,
    };
    if (match.params.categoryID) {
      // payload.id = match.params.categoryID;
      this.updateInterest(match.params.categoryID, payload);
      return 0;
    }
    this.addInterest(payload);
  }

  handleValueChange = ({ target }) => {
    // console.log(target);
    this.setState({
      interest: target.value,
    });
  }

  getForm = () => {
    const { interest, error, submitLoading } = this.state;
    return (
      <>
        <div className="form-header">
          {`${this.getHeader()} Interest`}
        </div>
        {/* <Divider /> */}
        <Row>
          <Col span={12} offset={6}>
            <JInput
              labelClass="j-label"
              label="Interest Name"
              type="text"
              value={interest}
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
                <JButton
                  onClick={this.handleSubmitClick}
                  type="primary"
                  loading={submitLoading}
                  name={this.getHeader()}
                />
              </div>
              <div style={{ paddingLeft: '3%' }}>
                <JButton
                  onClick={this.handleCancel}
                  name="Cancel"
                />
              </div>
            </div>
          </Col>
        </Row>
      </>
    );
  }

  render = () => (
    <div className="interest-form-container">
      {this.getForm()}
    </div>
  );
}

export default InterestForm;


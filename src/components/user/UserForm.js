/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Button } from 'antd';
import MobileNumber from '../reusable/PhoneInput';
import routes from '../../utils/routes';
import JSelect from '../reusable/Select';
import { getConfigFor, getMobileNumber } from '../../utils/commonFunctions';
import { showFailureNotification, showSuccessNotification } from '../reusable/Notifications';
import { addUser } from '../../actions/appActions/UsersActions';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: '',
      number: '',
      dialCode: '',
      loading: false,
    };
  }

  getHeader = () => {
    const { match } = this.props;
    if (match.params.categoryID) {
      return 'Update';
    }
    return 'Add';
  }

  setPhoneNumber = ({ number, country: { dialCode } }) => {
    this.setState({
      dialCode: `+${dialCode}`,
      number: getMobileNumber(number, dialCode),
    });
  }

  handleAddUserAPI = (user) => {
    this.setState({
      loading: true,
    });
    addUser({ user })
      .then((data) => {
        this.setState({
          loading: false,
        });
        showSuccessNotification(data.message);
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
        console.log(error);
      });
  }

  validateForm = () => {
    const { number, profile } = this.state;
    if (!profile) {
      showFailureNotification('Select user profile.');
      return 0;
    }
    if (number.length <= 8) {
      showFailureNotification('Invalid phone number.');
      return 0;
    }
    return true;
  }

  handleAddUser = () => {
    const { dialCode, number, profile } = this.state;
    if (!this.validateForm()) return 0;
    const user = {
      country_code: dialCode,
      mobile_no: number,
      profile,
    };
    this.handleAddUserAPI(user);
  }

  handleProfileChange = (profile) => {
    this.setState({
      profile,
    });
  }

  getUserForm = () => {
    return (
      <>
        <div className="form-header">
          {`${this.getHeader()} User`}
        </div>
        <Row>
          <Col lg={{ span: 13, offset: 5 }}>
            <JSelect
              label="Select Profile"
              labelClass="j-label"
              placeholder="Select Profile"
              options={getConfigFor('profiles')}
              style={{ width: '100%' }}
              onChange={this.handleProfileChange}
              required
            />
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <Col lg={{ span: 13, offset: 5 }}>
            <MobileNumber
              getNumber={this.setPhoneNumber}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={{ span: 6, offset: 5 }}>
            <Button
              type="primary"
              style={{ width: '-webkit-fill-available', marginTop: 20 }}
              onClick={this.handleAddUser}
              loading={this.state.loading}
            >
              {`${this.getHeader()} User`}
            </Button>
          </Col>
          <Col lg={{ span:6, offset:1 }}>
            <Button
              type="default"
              style={{ width: '-webkit-fill-available', marginTop: 20 }}
              onClick={() => this.props.history.push(routes.usersList)}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </>
    );
  }

  render() {
    return (
      <div className="user-form-container">
        {this.getUserForm()}
      </div>
    );
  }
}

export default User;

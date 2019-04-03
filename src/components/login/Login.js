/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Form, Button, Row, Col,
} from 'antd';
import './Login.scss';
import MobileNumber from '../reusable/PhoneInput';
import JInput from '../reusable/Input';
import { getMobileNumber } from '../../utils/commonFunctions';
import { login, verify } from '../../actions/appActions/UsersActions';
import { showSuccessNotification } from '../reusable/Notifications';
import UserModel from '../../models/AppModel/UserModel';

class WrappedLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verifyOTP: false,
      loadingLogin: false,
      loginError: '',
      loadingOTP: false,
      otpError: '',
      otp:'',
      number: '',
      dialCode: '',

    };
  }

  login = (user) => {
    this.setState({
      loadingLogin: true,
    });
    login({ user })
      .then((response) => {
        this.setState({
          loadingLogin: false,
          verifyOTP: true,
          otp: response.otp_code,
        });
        showSuccessNotification(response.message);
      })
      .catch((error) => {
        this.setState({
          loadingLogin: false,
        });
        console.log(error);
      });
  }

  verifyOTP = (user) => {
    verify({ user })
      .then((response) => {
        showSuccessNotification('One Time Password Verified Successfully.');
        new UserModel({
          id: response.user.id,
          user: response.user,
          config: response.config,
        }).$save();
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleOtpSubmit = () => {
    const { otp, dialCode, number } = this.state;
    // if (!otp || otp.length < 4) {
    //   this.setState({
    //     otpError: 'Invalid OTP.',
    //   });
    //   return 0;
    // }
    const user = {
      country_code: dialCode,
      mobile_no: number,
      otp_code: otp,
    };
    this.verifyOTP(user);
  }

  handleLoginSubmit = () => {
    const { number, dialCode } = this.state;
    if (!number || number.length <= 8 || !dialCode) {
      this.setState({
        loginError: 'Invalid form submission.',
      });
      return 0;
    }
    const user = {
      country_code: dialCode,
      mobile_no: number,
    };

    this.login(user);
  }

  setPhoneNumber = ({ number, country: { dialCode } }) => {
    // console.log(dialCode, getMobileNumber(number, dialCode));
    this.setState({
      dialCode: `+${dialCode}`,
      number: getMobileNumber(number, dialCode),
    });
  }

  getLoginForm = () => (
    <>
      <MobileNumber
        getNumber={this.setPhoneNumber}
      />
      {this.state.loginError && <span className="error">{this.state.loginError}</span>}
      <Button
        type="primary"
        size="small"
        loading={this.state.loadingLogin}
        onClick={this.handleLoginSubmit}
        style={{
          marginTop: '8%',
          height: 30,
          width: '100%',
        }}
      >
        Log In
      </Button>
    </>
  );

  getOTPVerificationForm = () => (
    <>
      <Row>
        <Col span={24}>
          <JInput
            label="Enter OTP"
            value={this.state.otp}
            placeholder="Enter OTP"
            disabled
            error={this.state.otpError}
          />
        </Col>
      </Row>
      <Row>
        <Col span={11}>
          <Button
            type="primary"
            size="small"
            loading={this.state.loadingOTP}
            onClick={this.handleOtpSubmit}
            style={{
              marginTop: '15%',
              height: 30,
              width: '100%',
            }}
          >
            Verify OTP
          </Button>
        </Col>
        <Col span={11} offset={2}>
          <Button
            type="default"
            size="small"
            onClick={() => this.setState({ verifyOTP: false })}
            style={{
              marginTop: '15%',
              height: 30,
              width: '100%',
            }}
          >
            Cancel
          </Button>
        </Col>
      </Row>
    </>
  )

  render() {
    const { verifyOTP } = this.state;
    return (
      <div className="login-container">
        {!verifyOTP && this.getLoginForm()}
        {verifyOTP && this.getOTPVerificationForm()}
      </div>
    );
  }
}

const Login = Form.create({ name: 'normal_login' })(WrappedLogin);
export default withRouter(Login);

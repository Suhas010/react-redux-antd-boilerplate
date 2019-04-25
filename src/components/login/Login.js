/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Form,
} from 'antd';
import './Login.scss';
import MobileNumber from '../reusable/PhoneInput';
import Button from '../reusable/JButton';
import { getMobileNumber } from '../../utils/commonFunctions';
import 'react-phone-input-2/dist/style.css'

const initialState = {
  verifyOTP: false,
  loadingLogin: false,
  loginError: '',
  loadingOTP: false,
  otpError: '',
  otp: '',
  number: '',
  dialCode: '',
};

class WrappedLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  login = (user) => {
    this.props.history.push('/dashboard');
  }

  handleLoginSubmit = () => {
    this.login();
  }

  setPhoneNumber = ({ number, country: { dialCode } }) => {
    this.setState({
      dialCode: `+${dialCode}`,
      number: getMobileNumber(number, dialCode),
      loginError: '',
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
        name="Login"
        style={{
          marginTop: '8%',
          height: 30,
          width: '100%',
        }}
      />
    </>
  );

  render() {
    const { verifyOTP } = this.state;
    return (
      <div className="login-container">
        {!verifyOTP && this.getLoginForm()}
      </div>
    );
  }
}

const Login = Form.create({ name: 'normal_login' })(WrappedLogin);
export default withRouter(Login);

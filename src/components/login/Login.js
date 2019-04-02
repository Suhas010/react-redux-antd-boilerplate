/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Form, Icon, Input, Button,
} from 'antd';
import './Login.scss';
import MobileNumber from '../reusable/PhoneInput';

class WrappedLogin extends React.Component {
  handleSubmit = (e) => {
    const { history } = this.props;
    history.push('/admin/dashboard');
    // e.preventDefault();
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     console.log('Received values of form: ', values);
    //   }
    // });
  }

  setPhoneNumber = (n) => {
    console.log(n);
  }

  render() {
    return (
      <div className="login-container">
        <Form className="login-form" onSubmit={this.handleSubmit} autoComplete="off">
          <MobileNumber
            getNumber={this.setPhoneNumber}
          />
          <Button type="primary" htmlType="submit" className="login-form-button" style={{ marginTop: 20 }}>
            Log in
          </Button>
        </Form>
      </div>
    );
  }
}

const Login = Form.create({ name: 'normal_login' })(WrappedLogin);
export default withRouter(Login);

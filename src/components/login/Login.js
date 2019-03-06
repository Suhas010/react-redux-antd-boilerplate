import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from "antd";
import './Login.scss';
class WrappedLogin extends React.Component {
  handleSubmit = e => {
    e.prevendDefault();
    console.log(this.props);
    // e.preventDefault();
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     console.log("Received values of form: ", values);
    //   }
    // });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { history } = this.props;
    return (
      <div className="login-container">
        <Form className="login-form">
          <Form.Item>
            {getFieldDecorator("userName", {
              rules: [{ required: true, message: "Please input your username!" }]
            })(
              <Input
                prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "Please input your Password!" }]
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={() => history.push('/admin/dashboard/target-groups')}
              style={{ width: '100%'}}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const Login = Form.create({ name: "normal_login" })(WrappedLogin);
export default withRouter(Login);
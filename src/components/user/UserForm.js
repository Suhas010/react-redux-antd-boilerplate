import React, { Fragment } from 'react';
import { Form, Row, Col, Button } from 'antd';
import MobileNumber from '../reusable/PhoneInput';
import { number } from 'prop-types';

class User extends React.Component {

  getHeader = () => {
    const { match } = this.props;
    if (match.params.categoryID) {
      return 'Update';
    }
    return 'Add';
  }
  
  setPhoneNumber = (number) => {
    console.log(number);
  }

  getUserForm = () => {
    return (
      <>
        <div className="form-header">
          {`${this.getHeader()} User`}
        </div>
        <Row>
          <Col lg={{ span:11, offset:7 }}>
            <Form className="form" onSubmit={this.handleSubmit}>
              <MobileNumber
                getNumber={this.setPhoneNumber}
              />
              <Button type="primary" htmlType="submit" style={{ width: '-webkit-fill-available', marginTop: 20 }}>
                {`${this.getHeader()} User`}
              </Button>
            </Form>
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

export default Form.create({ name: 'add_user' })(User);


import React from 'react';
import { withRouter } from 'react-router';
import {
  Button,
  Tooltip,
} from 'antd';
import './Login.scss';
import routes from '../../utils/routes';
import JInput from '../reusable/Input';

const initialState = {
  showPassword: false,
  small: false,
  disabled: false,
  userName: '',
  password: '',
};
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }


  validateForm = () => {
    const { userName, password } = this.state;
    if (userName && password) {
      return true;
    }
    return true;
  }

  handleLoginClick = () => {
    if (this.validateForm) {
      this.props.history.push(routes.dashboard);
    }
  }

  handleValueChange = ({ target }, type) => this.setState({ [type]: target.value })
  
  handleLockClick = () => this.setState({ showPassword: !this.state.showPassword })

  render() {
    const { showPassword, userName, password } = this.state;
    return (
      <div className="login-container">
        <JInput
          type="text"
          label="User Name"
          placeholder="Enter user name..."
          // rightElement={this.getUserIcon()}
          value={userName}
          onChange={e => this.handleValueChange(e, 'userName')}
        />
        <br />
        <JInput
          type="password"
          placeholder="Enter your password..."
          label="Password"
          // rightElement={this.getLockIcon(this.state)}
          value={password}
          onChange={e => this.handleValueChange(e, 'password')}
        />
        <br />
        <div className="actions">
          <Button
            onClick={this.handleLoginClick}
            type="primary"
          >
            Login
          </Button>
          <span />
          <Button
            onClick={() => this.setState(initialState)}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);

import React from 'react';
import { withRouter } from 'react-router';
import {
  Button,
  InputGroup,
  Intent,
  Tooltip,
} from '@blueprintjs/core';
import './Login.scss';
import routes from '../../utils/routes';

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

  getLockIcon = ({ showPassword }) => (
    <Tooltip
      content={`${showPassword ? 'Hide' : 'Show'} Password`}
    >
      <Button
        icon={showPassword ? 'unlock' : 'lock'}
        intent={Intent.NONE}
        onClick={this.handleLockClick}
      />
    </Tooltip>
  );

  getUserIcon = () => (
    <Tooltip
      content="User name"
    >
      <Button
        icon="person"
        intent={Intent.NONE}
      />
    </Tooltip>
  );

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
        <InputGroup
          type="text"
          placeholder="Enter user name..."
          rightElement={this.getUserIcon()}
          value={userName}
          onChange={e => this.handleValueChange(e, 'userName')}
        />
        <br />
        <InputGroup
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password..."
          rightElement={this.getLockIcon(this.state)}
          value={password}
          onChange={e => this.handleValueChange(e, 'password')}
        />
        <br />
        <div className="actions">
          <Button
            text="Login"
            onClick={this.handleLoginClick}
            intent={Intent.PRIMARY}
          />
          <span />
          <Button
            text="Reset"
            onClick={() => this.setState(initialState)}
            intent={Intent.NONE}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Login);

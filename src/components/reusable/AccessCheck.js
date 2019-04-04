import React, { Component } from 'react';

class AccessCheck extends Component {
  constructor(props){
    super(props);
  }
  
  canAccess = () => {
    return true;
  }

  render() {
    if (this.canAccess()) {
      return this.props.child;
    }
    return null;
  }
}

export default AccessCheck;


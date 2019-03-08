/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import styled from 'styled-components';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    const { error, errorInfo } = this.state;
    const { name, showError } = this.props;
    const ErrorContainer = styled.div`
      border: 1px solid #de1b1b;
      background: #ffccb459;
      padding: 3%;
      color: red;
    `;
    const Message = styled.data`
      font-size: 14px;
      letter-spacing: 3px;
      color: red;
      font-weight: 700;
    `;
    if (errorInfo) {
      // Error path
      return (
        <ErrorContainer>
          <Message>
            Something went wrong
            <>
              { name && (
                <span>{` in ${name}`}</span>
              )}
            </>
          </Message>
          { showError && (
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {error && error.toString()}
              <br />
              {errorInfo.componentStack}
            </details>
          )}
        </ErrorContainer>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}



export default ErrorBoundary;

import React, { Component } from 'react';
import { Card } from '@blueprintjs/core';
import styled from 'styled-components';

class NewC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };
  }

  render() {
    const { isOpen } = this.state;
    const CardContainer = styled.div`
      left: 0%;
      width: 200px;
      position: absolute;
      height: 100%;
    `;
    const options = {
      side: "left",
      effect: "slide-out",
      speed: 250,
      timing: 'ease-in-out'
    }
    return (     
      <CardContainer>
        <Card
          elevation="4"
          style={{ height: '100%' }}
        />
      </CardContainer>
    )
  }
}
export default NewC;

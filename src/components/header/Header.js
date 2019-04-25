import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
    display: flex;
    width: 100%;
    height: 49px;
    background-color: #207fbe;
    justify-content: center;
    line-height: 49px;
    font-weight: 900;
    font-size: 22px;
    letter-spacing: 4px;
    color: white;
`;

const Header = () => (
  <HeaderContainer>
    <span>App Header</span>
  </HeaderContainer>
);

export default Header;

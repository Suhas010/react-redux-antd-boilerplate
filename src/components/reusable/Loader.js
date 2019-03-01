import React from 'react';
import { Spin } from 'antd';
import propTypes from 'prop-types';

const JLoader = ({ text, size }) => (
  <Spin style={{ width: '100%' }} tip={text} size={size || 'default'} />
);

JLoader.propTypes = {
  text: propTypes.string,
  size: propTypes.oneOf(['small', 'large', 'default']),
};
JLoader.defaultProps = {
  text: 'Loading...',
  size: 'large',
};


export default JLoader;

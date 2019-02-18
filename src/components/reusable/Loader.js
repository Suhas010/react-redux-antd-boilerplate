import React from 'react';
import { Spin } from 'antd';

const JLoader = ({ text, size }) => (
  <Spin style={{ width: '100%' }} tip={text} size={size || 'default'} />
);

export default JLoader;

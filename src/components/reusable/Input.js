/* eslint-disable react/prop-types */
import React from 'react';
import { Input } from 'antd';

const JInput = ({ labelClass, required, label, error, ...rest }) => (
  <div className="labeled-input">
    <span
      className={labelClass}
      
    >
      {label}
      {required && <span style={{ color: 'red' }}>*</span>}
    </span>
    <Input {...rest} style={error ? { borderColor: 'red' } : {}} />
    {error && <span className="error">{error}</span>}
  </div>
);

export default JInput;

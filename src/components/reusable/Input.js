import React from 'react';
import { Input } from 'antd';

const JInput = ({ labelClass, required, label, ...rest }) => (
  <div className="labeled-input">
    <span
      className={labelClass}
      style={{
        display: 'flex', top: '-11%', color: '#333333', fontSize: '14px', width: '192px', fontWeight: '500',
      }}
    >
      {label}
      {required && <span style={{ color: 'red' }}>*</span>}
    </span>
    <Input {...rest} />
  </div>
);

export default JInput;

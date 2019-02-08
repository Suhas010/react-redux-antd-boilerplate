import React from 'react';
import { Select } from 'antd';

const JSelect = ({ labelClass, label, options, required, ...rest }) => (
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
    <Select {...rest}>
      {options.map(option => <Select.Option value={option.value} key={`${option.value}${option.name}`}>{option.name}</Select.Option>)}
    </Select>
  </div>
);

export default JSelect;

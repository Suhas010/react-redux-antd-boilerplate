/* eslint-disable react/prop-types */
import React from 'react';
import { Select } from 'antd';

const JSelect = ({ labelClass, label, options, required, placeholder, error, ...rest }) => (
  <div className="labeled-input">
    <span
      className={labelClass}
      style={{
        display: 'flex', top: '-11%', color: '#333333', fontSize: '14px', width: '192px', fontWeight: '500',
      }}
    >
      {label}
      {required && <span style={{ color: 'red' }}> &nbsp;*</span>}
    </span>
    <Select {...rest} placeholder={placeholder}>
      {options.map(option => <Select.Option value={option.value || option.id} key={`${option.value || option.id}${option.name}`}>{option.name}</Select.Option>)}
    </Select>
    {error && <span className="error">{error}</span>}
  </div>
);

export default JSelect;

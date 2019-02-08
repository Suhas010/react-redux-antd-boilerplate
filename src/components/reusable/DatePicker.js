import React from 'react';
import { DatePicker } from 'antd';

const JDatePicker = ({ label, required, labelClass, ...rest }) => (
  <div className="labled-input">
    <span
      className={labelClass}
      style={{
        display: 'flex', top: '-11%', color: '#333333', fontSize: '14px', width: '192px', fontWeight: '500',
      }}
    >
      {label}
      {required && <span style={{ color: 'red' }}>*</span>}
    </span>
    <DatePicker {...rest} style={{ paddingTop: 5 }} />
  </div>
);

export default JDatePicker;

import React from 'react';
import { DatePicker } from 'antd';

const JDatePicker = ({ label, required, labelClass, ...rest }) => (
  <div className="labled-input">
    <span
      className={labelClass}
    >
      {label}
      {required && <span style={{ color: 'red' }}>*</span>}
    </span>
    <DatePicker {...rest} style={{ paddingTop: 5 }} />
  </div>
);

export default JDatePicker;

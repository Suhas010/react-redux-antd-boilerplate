import React from 'react';
import { Switch, Icon } from 'antd';

const JSwitch = ({ labelClass, label, required, ...rest }) => (
  <div className="labeled-input" style={{ display: 'flex' }}>
    <span
      className={labelClass}
    >
      {label}
      {required && <span style={{ color: 'red' }}>*</span>}
    </span>
    <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} {...rest} />
  </div>
);

export default JSwitch;

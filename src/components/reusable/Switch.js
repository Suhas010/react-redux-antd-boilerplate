import React from 'react';
import { Switch, Icon } from 'antd';

const JSwitch = ({ labelClass, label, required, ...rest }) => (
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
    <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} {...rest} />
  </div>
);

export default JSwitch;

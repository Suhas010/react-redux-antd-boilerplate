/* eslint-disable react/prop-types */
import React from 'react';
import TextArea from 'antd/lib/input/TextArea';

const JTextArea = ({ labelClass, required, label, error, ...rest }) => (
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
    <TextArea {...rest} style={error ? { borderColor: 'red' } : {}} />
    {error && <span className="error">{error}</span>}
  </div>
);

export default JTextArea;

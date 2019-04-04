/* eslint-disable react/prop-types */
import React from 'react';
import TextArea from 'antd/lib/input/TextArea';

const JTextArea = ({ labelClass, required, label, error, ...rest }) => (
  <div className="labeled-input">
    <span
      className={labelClass}
    >
      {label}
      {required && <span style={{ color: 'red' }}>*</span>}
    </span>
    <TextArea {...rest} style={error ? { borderColor: 'red' } : {}} />
    {error && <span className="error">{error}</span>}
  </div>
);

export default JTextArea;

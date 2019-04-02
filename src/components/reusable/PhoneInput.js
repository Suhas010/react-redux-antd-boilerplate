import React, { Component, useState } from 'react';
import PhoneInput from 'react-phone-number-input/react-responsive-ui';
import 'react-responsive-ui/style.css'

function changeState(v, setState, getNumber) {
  getNumber(v);
  setState(v);
}
const MobileNumber = ({ getNumber }) => {
  const [value, setState] = useState('+91');
  return (
    <PhoneInput
      country="IN"
      placeholder="Enter phone number"
      value={value}
      onChange={v => changeState(v, setState, getNumber)}
    />
  );
};

export default MobileNumber;

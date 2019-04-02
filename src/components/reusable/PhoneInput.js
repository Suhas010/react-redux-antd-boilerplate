/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ReactPhoneInput from 'react-phone-input-2';

function changeState({ number, country }, setState, setNumberInProps = () => {}) {
  
  setNumberInProps({ number, country });
  setState(number);
}
const MobileNumber = ({ getNumber }) => {
  const [value, setState] = useState();
  return (
    <ReactPhoneInput
      defaultCountry="in"
      enableSearchField
      value={value}
      onChange={(number, country) => changeState({ number, country }, setState, getNumber)}
    />
  );
};

export default MobileNumber;

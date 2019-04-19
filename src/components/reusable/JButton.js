import React from 'react';
import { Button, Tooltip } from 'antd';
import PropTypes from 'prop-types';

const ButtonWithoutTooltip = ({ name, className, onClick, type, loading, ...rest }) => (
  <Button
    className={className}
    onClick={onClick}
    type={type}
    loading={loading}
    {...rest}
  >
    {name}
  </Button>
);

const JButton = ({
  tooltip, ...rest
}) => {
  if(tooltip) return (
    <Tooltip title={tooltip}>
      <ButtonWithoutTooltip {...rest} />
    </Tooltip>
  );
  return <ButtonWithoutTooltip {...rest} />;
};


JButton.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.oneOf(['primary', 'secondary', 'danger', '']),
  onClick: PropTypes.func,
  tooltip: PropTypes.string,
  loading: PropTypes.bool,
};

JButton.defaultProps = {
  name: '',
  type: '',
  tooltip: '',
  className: 'j-button',
  onClick: () => {},
  loading: false,
};

export default JButton;

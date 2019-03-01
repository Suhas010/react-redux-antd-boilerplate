import React, { Component } from 'react';
import { Button } from 'antd';
import propTypes from 'prop-types';
import TableWrapper from '../../table/TableWrapper';

import { TG_DATA, TG_HEADER } from '../Constants';

class TargetGroup extends Component {
  render() {
    const { data, handleAddTGButtonClick, handleTGEditClick, handleViewQuestionClick } = this.props;
    return (
      <>
        <div className="add-button">
          <Button icon="plus" onClick={handleAddTGButtonClick} />
        </div>
        <TableWrapper
          data={data}
          headers={TG_HEADER}
          handleTGEditClick={handleTGEditClick}
          handleViewQuestionClick={handleViewQuestionClick}
        />
      </>
    );
  }
}

TargetGroup.propTypes = {
  handleAddTGButtonClick: propTypes.func.isRequired,
  handleTGEditClick: propTypes.func.isRequired,
  handleViewQuestionClick: propTypes.func.isRequired,
};

export default TargetGroup;

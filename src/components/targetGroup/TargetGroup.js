import React from 'react';
import { Button } from 'antd';
import propTypes from 'prop-types';
import TableWrapper from '../table/TableWrapper';
import ErrorBoundary from '../reusable/ErrorBoundary';
import { TG_HEADER } from './Constants';

const TargetGroup = ({
  data, handleAddClick, handleEditClick, handleViewClick,
}) => (
  <>
    <div className="add-button" >
      <Button icon="plus" onClick={handleAddClick} />
    </div>
    <ErrorBoundary name="Target Group List">
      <TableWrapper
        data={data}
        headers={TG_HEADER}
        handleEditClick={handleEditClick}
        handleViewClick={handleViewClick}
      />
    </ErrorBoundary>
  </>
);

TargetGroup.propTypes = {
  handleAddTGButtonClick: propTypes.func.isRequired,
  handleTGEditClick: propTypes.func.isRequired,
  handleViewClick: propTypes.func.isRequired,
};

export default TargetGroup;

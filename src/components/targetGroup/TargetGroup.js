/* eslint-disable react/prop-types */
import React from 'react';
import propTypes from 'prop-types';
import TableWrapper from '../table/TableWrapper';
import ErrorBoundary from '../reusable/ErrorBoundary';
import { TG_HEADER } from './Constants';
import Pagination from '../reusable/Pagination';
import JButton from '../reusable/JButton';

const TargetGroup = ({
  data, handleAddClick, handleEditClick, handleViewClick, onPageChange, totalRecords, pageSize, currentPage,
}) => (
  <>
    <div className="add-button">
      <JButton icon="plus" onClick={handleAddClick} />
    </div>
    <ErrorBoundary name="Target Group List">
      <TableWrapper
        data={data}
        pageSize={pageSize}
        headers={TG_HEADER}
        handleEditClick={handleEditClick}
        handleViewClick={handleViewClick}
      />
    </ErrorBoundary>
    <ErrorBoundary name="Pagination">
      <Pagination
        currentPage={currentPage}
        totalRecords={totalRecords}
        maxPerPage={pageSize}
        onPageChange={onPageChange}
      />
    </ErrorBoundary>
  </>
);

TargetGroup.propTypes = {
  handleAddClick: propTypes.func.isRequired,
  handleEditClick: propTypes.func.isRequired,
  handleViewClick: propTypes.func.isRequired,
};

export default TargetGroup;

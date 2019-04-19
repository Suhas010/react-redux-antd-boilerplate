/* eslint-disable react/prop-types */
import React from 'react';
import { Pagination as Page } from 'antd';

const Pagination = ({
  totalRecords, maxPerPage, onPageChange, currentPage,
}) => {
  return (
    <div className="pagination">
      <Page
        defaultCurrent={currentPage}
        pageSize={maxPerPage || 1}
        total={totalRecords}
        onChange={page => onPageChange(page)}
      />
    </div>
  );
};

export default Pagination;

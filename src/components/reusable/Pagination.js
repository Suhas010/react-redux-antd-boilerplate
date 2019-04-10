/* eslint-disable react/prop-types */
import React from 'react';
import { Pagination as Page } from 'antd';

const Pagination = ({
  totalRecords, maxPerPage, onPageChange, currentPage,
}) => {
  return (
    <Page
      defaultCurrent={currentPage}
      pageSize={maxPerPage || 1}
      total={totalRecords}
      onChange={page => onPageChange(page)}
    />
  );
};

export default Pagination;

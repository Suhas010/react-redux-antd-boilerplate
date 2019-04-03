/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';
import { FILTERS } from '../../utils/constant';
import TargetGroupFilter from './TargetGroupFilter';

const FilterContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 15px;
`;

class Filter extends Component {
  constructor(props) {
    super(props);
    
  }

  getTargetGroupFilter = () => (
    <TargetGroupFilter />
  );

  getFilter = () => {
    const { name } = this.props;
    switch (name) {
    case FILTERS.TARGET_GROUP:
      return this.getTargetGroupFilter();
    default:
      return null;
    }
  }

  render = () => (
    <FilterContainer>
      {this.getFilter()}
    </FilterContainer>
  )
}

export default Filter;

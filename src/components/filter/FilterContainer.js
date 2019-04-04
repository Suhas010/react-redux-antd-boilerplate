/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';
import { FILTERS } from '../../utils/constant';
import TargetGroupFilter from './TargetGroupFilter';
import './Filter.scss';

class Filter extends Component {
  constructor(props){
    super(props);
  }

  getTargetGroupFilter = () => (
    <TargetGroupFilter
      applyFilter={this.props.applyFilter}
      clearFilter={this.props.clearFilter}
    />
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
    <div className="filter-container">
      {this.getFilter()}
    </div>
  )
}

export default Filter;

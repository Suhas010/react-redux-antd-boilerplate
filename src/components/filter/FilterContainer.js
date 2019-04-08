/* eslint-disable no-useless-constructor */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { FILTERS } from '../../utils/constant';
import TargetGroupFilter from './TargetGroupFilter';
import QuestionFilter from './QuestionFilter';
import './Filter.scss';
import NameFilter from './NameFilter';

class Filter extends Component {
  constructor(props) {
    super(props);
  }

  getTargetGroupFilter = () => (
    <TargetGroupFilter
      applyFilter={this.props.applyFilter}
      clearFilter={this.props.clearFilter}
    />
  );

  getQuestionsFilter = () => (
    <QuestionFilter
      applyFilter={this.props.applyFilter}
      clearFilter={this.props.clearFilter}
    />
  );

  getCategoryAndSubcategoryFilter = () => (
    <NameFilter
      applyFilter={this.props.applyFilter}
      clearFilter={this.props.clearFilter}
    />
  );

  getFilter = () => {
    const { name } = this.props;
    switch (name) {
    case FILTERS.TARGET_GROUP:
      return this.getTargetGroupFilter();
    case FILTERS.QUESTIONS:
      return this.getQuestionsFilter();
    case FILTERS.CATEGORIES:
    case FILTERS.SUBCATEGORIES:
      return this.getCategoryAndSubcategoryFilter();
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

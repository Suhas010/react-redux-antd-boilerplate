/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Button, Icon } from 'antd';

import JSelect from '../reusable/Select';
import { getItem } from '../helpers/localStorage';
import { sort } from '../../utils/commonFunctions';

let defaultQuestionTypes = JSON.parse(getItem('questionTypes'));
defaultQuestionTypes.push({ id: 'all', name: 'All' });
let defaultDifficultyLevels = JSON.parse(getItem('difficultyLevels'));
defaultDifficultyLevels.push({ id: 'all', name: 'All' });
defaultDifficultyLevels = sort(defaultDifficultyLevels, 'name');
defaultQuestionTypes = sort(defaultQuestionTypes, 'name');

const initialState = {
  questionTypes: defaultQuestionTypes,
  questionType: 'all',
  difficultyLevels: defaultDifficultyLevels,
  difficultyLevel: 'all',
  filterChanged: false,
};

class QuestionFilter extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  applyFilter = () => {
    this.setState({
      filterChanged: true,
    });
    this.props.applyFilter(this.state);
  }

  resetFilter = () => {
    this.setState(initialState);
    this.props.clearFilter();
  }

  handleChange = (value, state) => {
    this.setState({
      [state]: value,
      filterChanged: false,
    });
  }

  render() {
    const { questionTypes, questionType, difficultyLevels, difficultyLevel, filterChanged } = this.state;
    return (
      <>
        <JSelect
          options={questionTypes}
          value={questionType}
          onChange={value => this.handleChange(value, 'questionType')}
          style={{ width: '100%' }}
          label="Question Type"
          labelClass="filter-label"
        />
        <JSelect
          options={difficultyLevels}
          value={difficultyLevel}
          onChange={value => this.handleChange(value, 'difficultyLevel')}
          style={{ width: '100%' }}
          label="Difficulty Level"
          labelClass="filter-label"
        />
        <Button
          type="primary"
          onClick={this.applyFilter}
          disabled={filterChanged}
        >
          Search
        </Button>
        <Button
          type="primary"
          className="reset-filter"
          onClick={this.resetFilter}
        >
          <Icon type="undo" />
          Reset
        </Button>
      </>
    );
  }
}

export default QuestionFilter;

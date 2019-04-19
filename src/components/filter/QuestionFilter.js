/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Button, Icon, Select } from 'antd';

import JSelect from '../reusable/Select';
import JMSelect from '../reusable/MultipleSelect';

import { getItem } from '../helpers/localStorage';
import { sort } from '../../utils/commonFunctions';

const defaultQuestionTypes = JSON.parse(getItem('questionTypes'));
// defaultQuestionTypes.push({ id: 'all', name: 'All' });
let defaultDifficultyLevels = JSON.parse(getItem('difficultyLevels'));
defaultDifficultyLevels.push({ value: 'all', name: 'All' });
const defaultStatus = [{ value: 'all', name: 'All' }, { id: 'new', name: 'New' }, { id: 'draft', name: 'Draft' }, { id: 'published', name: 'Published' }, { id: 'rejected', name: 'Rejected' }, { id: 'deactivated', name: 'Deactivated' }];

defaultDifficultyLevels = sort(defaultDifficultyLevels, 'name');
// defaultQuestionTypes = sort(defaultQuestionTypes, 'name');

const initialState = {
  questionTypes: defaultQuestionTypes,
  questionType: [],
  difficultyLevels: defaultDifficultyLevels,
  difficultyLevel: 'all',
  status: defaultStatus,
  statusValue: 'draft',
  filterChanged: false,
  tags: [],
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
    const { tags, difficultyLevel, statusValue, questionType } = this.state;
    const type = [];
    if (questionType || questionType.length > 0) {
      questionType.map((qType) => {
        type.push(defaultQuestionTypes[defaultQuestionTypes.findIndex(type => type.value === qType)].name);
      });
    }
    const filter = {};
    if (type) {
      filter.types = type;
    }
    // if difficulty level and status value is set all do not add it in filter
    if (tags || tags.length > 0) filter.tags = tags;
    if (difficultyLevel !== 'all') filter.difficulty_level = defaultDifficultyLevels[defaultDifficultyLevels.findIndex(difficulty => difficulty.value === difficultyLevel)].name;
    if (statusValue !== 'all') filter.status = statusValue;

    this.props.applyFilter(filter);
  }

  resetFilter = () => {
    this.setState(initialState);
    this.props.clearFilter();
  }

  handleChange = (value, state) => {
    console.log(value, state);
    this.setState({
      [state]: value,
      filterChanged: false,
    });
  }

  getSelectedTag = (options) => {
    if (!options || options.length === 0) {
      return [];
    }
    return options.map((item) => {
      if (item) return <Select.Option key={item}>{item}</Select.Option>;
    });
  };

  render() {
    const { questionTypes, questionType, tags, difficultyLevels, difficultyLevel, status, statusValue, filterChanged } = this.state;
    return (
      <>
        <JMSelect
          mode="multiple"
          options={questionTypes}
          value={questionType}
          onChange={value => this.handleChange(value, 'questionType')}
          style={{ width: '100%' }}
          label="Question Type"
          labelClass="filter-label"
          placeholder="All"
        />
        <div className="tags">
        <header className="filter-label">Tags</header>
          <Select
            mode="tags"
            style={{ width: '100%' }}
            placeholder="Tags Mode"
            onChange={value => this.handleChange(value, 'tags')}
            defaultValue={tags}
          >
            {this.getSelectedTag(tags)}
          </Select>
        </div>
        <JSelect
          options={difficultyLevels}
          value={difficultyLevel}
          onChange={value => this.handleChange(value, 'difficultyLevel')}
          style={{ width: '100%' }}
          label="Difficulty Level"
          labelClass="filter-label"
        />
        <JSelect
          options={status}
          value={statusValue}
          onChange={value => this.handleChange(value, 'statusValue')}
          style={{ width: '100%' }}
          label="Status"
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
          Clear
        </Button>
      </>
    );
  }
}

export default QuestionFilter;

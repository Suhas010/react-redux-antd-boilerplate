/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Dialog, Tooltip, TextArea, Button } from '@blueprintjs/core';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import QuestionModal from '../../models/AppModel/Questions';
import './QuestionForm.scss';
import JSelect from '../reusable/Select';
import JInput from '../reusable/Input';
import JDatePicker from '../reusable/DatePicker';
import JTag from '../reusable/Tag';

const DATA = {
  questionCategory: [
    {
      value: 'Category 1',
      name: 'Option 1',
    },
    {
      value: 'Category 2',
      name: 'Option 2',
    },
    {
      value: 'Category 3',
      name: 'Option 3',
    },
  ],
  questionSubCategory: [
    {
      value: 'Sub Category 1',
      name: 'Sub Option 1',
    },
    {
      value: 'Sub Category 2',
      name: 'Sub Option 2',
    },
    {
      value: 'Sub Category 3',
      name: 'Sub Option 3',
    },
  ],
  questionType: [
    {
      value: 'Select',
      name: 'Select',
    },
    {
      value: 'Multi Select',
      name: 'Multi Select',
    },
    {
      value: 'Paragraph',
      name: 'Paragraph',
    },
    {
      value: 'Date Time',
      name: 'Date Time',
    },
    {
      value: 'Number',
      name: 'Number',
    },
  ],
  gender: [
    {
      value: 'Male',
      name: 'Male',
    },
    {
      value: 'Female',
      name: 'Female',
    },
    {
      value: 'Other',
      name: 'Other',
    },
  ],
  difficultyLevel: [
    {
      value: 'Easy',
      name: 'Easy',
    },
    {
      value: 'Medium',
      name: 'Medium',
    },
    {
      value: 'Hard',
      name: 'Hard',
    },
  ],
  Tags: [
    'Unremovable',
    'Tag 2',
    'Tag 3',
  ],
};

const initialState = {
  operationMode: '',
  selectedQuestion: {},
  selectedTags: [],
  isDialogOpen: true,
  questionText: '',
  questionType: 'Multi Select',
  questionCategory: 'Category 1',
  questionSubCategory: 'Sub Category 1',
  gender: 'Male',
  difficultyLevel: 'Easy',
  optionsArray: ['', ''],
  minimumAge: 2,
  maximumAge: 14,
  Tags: [
    'Unremovable',
    'Tag 2',
    'Tag 3',
  ],
};


class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const { operationMode, id } = this.props;
    if (operationMode && id) {
      this.setState({
        selectedQuestion: QuestionModal.get(id),
        operationMode,
        questionText: 'Suhas'
      });
    }
  }

  getTitleAndIcon = (operationMode) => {
    if (operationMode === 'Edit') {
      return {
        title: 'Edit questionText',
        icon: 'edit',
      };
    }
    if (operationMode === 'View') {
      return {
        title: 'View Question',
        icon: 'circle',
      };
    }
    return {
      title: 'Add Question',
      icon: 'plus',
    };
  }

  handleClose = () => {
    this.props.handleClose();
    this.setState({
      isDialogOpen: false,
    });
  }

  handleInputValueChange = (value, item) => {
    //now this runs
    // console.log('clicked', item, value)
    this.setState({
      [item]: value,
    });
  }
 
  handleSelectChange = (value, type) => {
    this.setState({
      [type]: value,
    });
  }

  removeOption = (key) => {
    // const { optionsArray } = this.state;
    this.state.optionsArray.splice(key, 1);
    this.setState({
      optionsArray: this.state.optionsArray,
    });
  }

  addOption = () => {
    this.setState({
      optionsArray: [...this.state.optionsArray, ''],
    });
  }

  handleOptionValueChange = ({ value }, key) => {
    // console.log(value, key);
    this.state.optionsArray[key] = value;
    this.setState({
      optionsArray: this.state.optionsArray,
    });
  }

  getMultipleOptions = () => {
    const { optionsArray } = this.state;
    return optionsArray.map((option, key) => {
      return (
        <Col span={7} offset={(key) % 3 === 0 ? 0 : 1} key={key} style={{ display: 'flex', marginBottom: '10px' }}>
          <JInput
            label={`Option ${key + 1}`}
            value={option}
            placeholder={`option ${key + 1}`}
            onChange={({ target }) => this.handleOptionValueChange(target, key)}
          />
          {key > 1 && (
            <Tooltip content={`Remove Option ${key + 1}`}>
              <Button
                icon="minus"
                style={{ margin: '17px 6px' }}
                onClick={() => this.removeOption(key)}
              />
            </Tooltip>
          )
          }
        </Col>
      );
    });
  }

  getOptions = () => {
    const { questionType } = this.state;
    switch (questionType) {
    case 'Select':
    case 'Multi Select':
      return (
        <>
          <Row>
            {this.getMultipleOptions()}
            <Col span={1} style={{ margin: '7px 7px' }}>
              <Tooltip content="Add Options">
                <Button
                  icon="plus"
                  style={{ margin: '10px 12px' }}
                  onClick={this.addOption}
                />
              </Tooltip>
            </Col>
          </Row>
          
        </>
      );
    case 'Paragraph':
      return (
        <Row>
          <Col span={24}>
            <TextArea
              large
              intent="primary"
              onChange={({ target }) => this.handleInputValueChange(target.value, 'Paragraph')}
              value={this.state.Paragraph}
              style={{ width: '100%' }}
            />
          </Col>
        </Row>
      );
    default:
      return (
        <>
          <Row>
            {this.getMultipleOptions()}
          </Row>
          <Row>
            <Tooltip content="Add Options">
              <Button
                icon="plus"
                style={{ margin: '10px 0px' }}
                onClick={this.addOption}
              />
            </Tooltip>
          </Row>
        </>
      );
    }
  }

  onDateChange = (e, v) => {
    console.log(e, v);
    this.setState({
      triggerDate: v,
    });
  }

  onTagSelect = (selectedTags) => {
    console.log(selectedTags);
    this.setState({
      selectedTags,
    }, this.forceUpdate());
  }

  getTags = () => {
    const { Tags, selectedTags } = this.state;
    return (
      <div className="tag-container">
        <Tooltip content="Click on tag to select tag for question">
          <span className="header">Add Tags</span>
        </Tooltip>
        <span className="caption">{`Selected ${selectedTags.length}`}</span>
        <JTag
          tags={Tags}
          selectedTags={selectedTags}
          onSelect={this.onTagSelect}
        />
      </div>
    );
  }

  getAddForm = () => {
    const { questionCategory, questionSubCategory, questionText, questionType, gender, difficultyLevel, minimumAge, maximumAge, RCount, RInterval } = this.state;
    return (
      <div className="add-form">
        <Row>
          <Col span={14}>
            <JInput
              label="Question"
              required
              value={questionText}
              placeholder="Add question..."
              onChange={({ target }) => this.handleInputValueChange(target.value, 'questionText')}
            />
          </Col>
          <Col span={8} offset={2}>
            <JSelect
              label="Question Type"
              style={{ width: '100%' }}
              value={questionType}
              allowClear
              options={DATA.questionType}
              onChange={e => this.handleSelectChange(e, 'questionType')}
            />
          </Col>
        </Row>
        <div className="options-row">
          <div className="header">{questionType}</div>
          {this.getOptions()}
        </div>
        <Row>
          <Col span={5}>
            <JSelect
              label="Question Category"
              style={{ width: '100%' }}
              value={questionCategory}
              allowClear
              options={DATA.questionCategory}
              onChange={e => this.handleSelectChange(e, 'questionCategory')}
            />
          </Col>
          <Col span={5} offset={1}>
            <JSelect
              label="Question Subcategory"
              style={{ width: '100%' }}
              value={questionSubCategory}
              allowClear
              options={DATA.questionSubCategory}
              onChange={e => this.handleSelectChange(e, 'questionSubCategory')}
            />
          </Col>
          <Col span={5} offset={2}>
            <JSelect
              label="Gender"
              style={{ width: '100%' }}
              value={gender}
              allowClear
              options={DATA.gender}
              onChange={e => this.handleSelectChange(e, 'gender')}
            />
          </Col>
          <Col span={5} offset={1}>
            <JSelect
              label="Difficulty Level"
              style={{ width: '100%' }}
              value={difficultyLevel}
              allowClear
              options={DATA.difficultyLevel}
              onChange={e => this.handleSelectChange(e, 'difficultyLevel')}
            />
          </Col>
        </Row>
        <Row className="options-row">
          <Col span={5}>
            <JInput
              label="Min Age"
              placeholder="Minimum age..."
              value={minimumAge}
              type="number"
              min={2}
              max={40}
              onChange={({ target }) => this.handleInputValueChange(target.value, 'minimumAge')}
            />
            {minimumAge < 2 && <span className="error">Age Should not be less than 2</span>}
          </Col>
          <Col span={5} offset={1}>
            <JInput
              label="Max Age"
              placeholder="Maximum age..."
              value={maximumAge}
              type="number"
              min={2}
              max={40}
              onChange={({ target }) => this.handleInputValueChange(target.value, 'maximumAge')}
            />
          </Col>
          <Col span={5} offset={2}>
            <JInput
              label="Repeat Count"
              placeholder="Repeat count..."
              value={RCount}
              type="number"
              min={2}
              max={40}
              onChange={({ target }) => this.handleInputValueChange(target.value, 'RCount')}
            />
          </Col>
          <Col span={5} offset={1}>
            <JInput
              label="Repeat Interval (days)"
              placeholder="Repeat Interval in days..."
              value={RInterval}
              type="number"
              min={2}
              max={40}
              onChange={({ target }) => this.handleInputValueChange(target.value, 'RInterval')}
            />
          </Col>
        </Row>
        <Row style={{ paddingTop: 10 }}>
          <Col span={5}>
            <JDatePicker
              label="Repeat Trigger Date"
              onChange={this.onDateChange}
            />
          </Col>
          <Col span={18} offset={1}>
            {this.getTags()}
          </Col>
        </Row>
      </div>
    );
  }
  
  getEditForm = () => {
    return (
      <div>
        {`Edit `}
      </div>
    );
  }
  
  getViewForm = () => {
    return (
      <div>
        {`view `}
      </div>
    );
  }

  getQuestionForm = ({ props }, operationMode) => {
    // console.log(props, "props", operationMode);
    switch (operationMode) {
    case 'Edit':
      return this.getEditForm(props);
    case 'View':
      return this.getAddForm(props);
    default:
      return this.getAddForm();
    }
  }

  handleReset = () => {
    this.setState(initialState);
  }
  
  handleFormSubmit = () => {
    const {
      questionText,
      questionCategory,
      questionSubCategory,
      minimumAge,
      maximumAge,
      selectedTags,
      triggerDate,
    } = this.state;
  }

  render() {
    const { operationMode, isDialogOpen, selectedQuestion, optionsArray } = this.state;
    const { title, icon } = this.getTitleAndIcon(operationMode);
    console.log(optionsArray);
    return (
      <Dialog
        isOpen={isDialogOpen}
        icon={icon}
        title={title}
        onClose={this.handleClose}
        canEscapeKeyClose={false}
        style={{ width: '800px', height: '600px' }}
        canOutsideClickClose={false}
      >
        <div className="form">
          <div className="form-container">
            {this.getQuestionForm(selectedQuestion, operationMode)}
          </div>
          <div className="action">
            <div>
              <Button
                intent="none"
                text="Reset"
                onClick={this.handleReset}
              />
            </div>
            <div style={{ marginLeft: 10 }}>
              <Button
                intent="primary"
                text={title}
                onClick={this.handleFormSubmit}
              />
            </div>
          </div>
        </div>
      </Dialog>

    );
  }
}

QuestionForm.propType = {
  operationMode: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default QuestionForm;

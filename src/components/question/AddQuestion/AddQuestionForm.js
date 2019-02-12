import React from 'react';
import { Button, Row, Col, Divider, Select, Tooltip, DatePicker } from 'antd';
import moment from 'moment';
import { showWarningNotification } from '../../reusable/Notifications';
import JSelect from '../../reusable/Select';
import JTextArea from '../../reusable/TextArea';
import { CONFIG } from '../Constants';
import JInput from '../../reusable/Input';
import JSwitch from '../../reusable/Switch';
import { getUUID } from '../../../utils/commonFunctions';

const Option = Select.Option;

class AddQuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 0,
      subCategory: 1,
      questionType: 4,
      question: '',
      showOptions: true,
      diffLevel: 3,
      repeatThis: false,
      triggerDate: 2,
      count: '',
      interval: '',
      tags: ['Suhas'],
      options: ['', ''],
      date: moment(),
    };
  }

  handleTagsChange = (tags) => {
    this.setState({
      tags,
    });
  }

  handleChange = (value, type) => {
    console.log(value, type, "###");
    this.setState({
      [type]: value,
    });
  }

  getSelectedTag = (options) => {
    if (!options || options.length === 0) {
      return [];
    }
    return options.map(item => <Option key={item}>{item}</Option>);
  }

  getTags = tags => (
    <div className="tags">
      <header>Tags</header>
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="Tags Mode"
        onChange={this.handleTagsChange}
      >
        {this.getSelectedTag(tags)}
      </Select>
    </div>
  );

  addOption = () => {
    this.state.options.push('');
    this.setState({
      options: this.state.options,
    });
  }

  handleRemoveOption = (key) => {
    const { options } = this.state;
    options.splice(key, 1);
    this.setState({
      options,
    });
  }

  handleOptionChange = ({ target }, index) => {
    const { value } = target;
    this.state.options[index] = value;
    this.setState({
      options: this.state.options,
    });
  }

  getOptions = () => {
    const { options } = this.state;
    return options.map((option, index) => {
      const marginLeft = index > 0 ? index % 2 === 0 ? 0 : 10 : 0;
      return (
        <>
          <Col span={index >1 ? 10 : 11} style={{ marginLeft, marginTop: 5, marginBottom: 5 }}>
            <JInput
              value={option}
              onChange={e=> this.handleOptionChange(e, index)}
              label={`Option ${index}`}
              labelClass="label"
            />
          </Col>
          {index > 1 && (
            <Col span={1} style={{ marginTop: '4%', marginLeft: 3 }}>
              <Button
                icon="minus"
                onClick={() => this.handleRemoveOption(index)}
              />
            </Col>
          )}
        </>
      );
    });
  }

  getQuestionsOptions = () => (
    <>
      {this.getOptions()}
      <Col span={1} style={{ marginTop: '4%', marginLeft: 6 }}>
        <Button icon="plus" onClick={this.addOption} />
      </Col>
    </>
  );
   

  handleSelectChange = (value, type) => {
    this.setState({
      [type]: value,
    });
  }

  disabledEndDate = (endValue) => {
    const startValue = moment();
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  handleDateChange = (value) => {
    this.setState({
      date: value,
    });
  }

  validateForm = () => {
    const { category, subCategory, questionType,  question, showOptions, diffLevel, repeatThis, triggerDate, count, interval, tags, date } = this.state;
    if (!question.trim()) {
      showWarningNotification('Question is mandatory.');
    }
  }

  handleSubmit = () => {
    if (!this.validateForm()) {
      return 0;
    }

  }

  render() {
    const { handleCancelClick } = this.props;
    const { category, subCategory, questionType,  question, showOptions, diffLevel, repeatThis, triggerDate, count, interval, tags, date } = this.state;
    return (
      <div className="question-form-container">
        <Row className="header">
          Add Question
        </Row>
        <div className="form">
          <Divider className="divider" dashed>Category</Divider>
          <Row>
            <Col span={12}>
              <JSelect
                onChange={e => this.handleSelectChange(e, 'category')}
                options={CONFIG.questionTypes}
                label="Category"
                value={category}
                labelClass="label"
                style={{ width: '90%' }}
                required
              />
            </Col>
            <Col span={12}>
              <JSelect
                onChange={e => this.handleSelectChange(e, 'subCategory')}
                options={CONFIG.questionTypes}
                label="Sub Category"
                value={subCategory}
                labelClass="label"
                style={{ width: '90%' }}
                required
              />
            </Col>
          </Row>
          <Divider className="divider" dashed> Question </Divider>
          <Row>
            <Col span={12}>
              <JSelect
                onChange={e => this.handleSelectChange(e, 'questionType')}
                options={CONFIG.questionTypes}
                label="Questions Answer Type"
                labelClass="label"
                value={questionType}
                style={{ width: '90%' }}
                required
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>
              <JTextArea
                label="Question"
                labelClass="label"
                value={question}
                row={1}
                onChange={e => this.handleChange(e.target.value, 'question')}
                required
              />
            </Col>
          </Row>
          <Row>
            {(questionType === 0 || questionType === 1) && this.getQuestionsOptions()}
          </Row>
          <Divider dashed className="divider">Will Repeat</Divider>
          <Row>
            <Col span={11}>
              <JSelect
                label="Difficulty Level"
                labelClass="label"
                onChange={e => this.handleSelectChange(e, 'diffLevel')}
                value={diffLevel}
                options={CONFIG.questionTypes}
                style={{ width: '90%' }}
              />
            </Col>
            <Col span={11} offset={1}>
              <JSwitch
                checked={repeatThis}
                onChange={e => this.handleChange(e, 'repeatThis')}
                label="Repeat this question?"
                labelClass="label"
              />
            </Col>
          </Row>
          { repeatThis && (
            <Row style={{ paddingTop: '4%' }}>
              <Col span={7}>
                <JSelect
                  value={triggerDate}
                  label="Trigger Date"
                  labelClass="label"
                  options={CONFIG.date}
                  onChange={e => this.handleSelectChange(e, 'triggerDate')}
                  style={{ width: '90%' }}
                />
              </Col>
              {triggerDate === 7 && (
                <Col span={7}>
                  <span
                    className="label"
                    style={{
                      display: 'flex', top: '-11%', color: '#333333', fontSize: '14px', width: '192px', fontWeight: '500',
                    }}
                  >
                    Custom Date
                  </span>
                  <DatePicker
                    value={date}
                    onChange={this.handleDateChange}
                    disabledDate={this.disabledDate}
                  />
                </Col>
              )}
              <Col span={7} offset={1}>
                <JInput
                  label="Count"
                  labelClass="label"
                  value={count}
                  onChange={e => this.handleChange(e.target.value, 'count')}
                />
              </Col>
              <Col span={7} offset={triggerDate === 7 ? 0 : 1} style={triggerDate === 7 ? { paddingTop: '4%' } : {}}>
                <JInput
                  label="Interval"
                  labelClass="label"
                  value={interval}
                  onChange={e => this.handleChange(e.target.value, 'interval')}
                />
              </Col>
            </Row>
          )}
          <Divider dashed className="divider">Tags </Divider>
          <Row>
            {this.getTags(tags)}
          </Row>
        </div>
        <div className="action">
          <div>
            <Button onClick={this.handleSubmit}>Submit</Button>
          </div>
          <div>
            <Button onClick={handleCancelClick}>Cancel</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddQuestionForm;

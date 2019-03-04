/* eslint-disable camelcase */
import React from 'react';
import { Button, Row, Col, Divider, Select, DatePicker, Skeleton } from 'antd';
import moment from 'moment';
import { showWarningNotification } from '../../reusable/Notifications';
import JSelect from '../../reusable/Select';
import JTextArea from '../../reusable/TextArea';
import { CONFIG } from '../Constants';
import JInput from '../../reusable/Input';
import JSwitch from '../../reusable/Switch';
import TargetGroupAffix from './TargetGroupAffix';
import './AddQuestions.scss';
import QuestionModel from '../../../models/AppModel/Questions';
import { getQuestion } from '../../../actions/appActions/QuestionActions';
import { getConfigFor } from '../../../utils/commonFunctions';

const Option = Select.Option;
const QUESTION_TYPES = getConfigFor('questionTypes');
const DIFF_LEVELS = getConfigFor('difficultyLevels');

class AddQuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      questionType: 0,
      question: '',
      difficultyLevel: 10,
      repeatThis: false,
      triggerDate: 2,
      count: '',
      interval: '',
      tags: [],
      options: ['', ''],
      date: moment(),
    };
  }

  componentWillMount() {
    const { match } = this.props;
    const { questionID, targetID } = match.params;
    if (!questionID) {
      this.setState({ loading: false });
      return;
    }
    if (QuestionModel.list().length > 0) {
      this.setQuestionData(QuestionModel.get(questionID).props);
      return;
    }
    getQuestion(targetID, questionID)
      .then((data) => {
        this.setQuestionData(data.question);
        new QuestionModel(data.question).$save();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  setQuestionData({
    id, tags, body, difficulty_level, type,
  }) {
    this.setState({
      tags: tags.split(','),
      question: body,
      difficultyLevel: difficulty_level,
      questionType: type,
      loading: false,
    });
  }

  handleTagsChange = (tags) => {
    this.setState({
      tags,
    });
  };

  handleChange = (value, type) => {
    this.setState({
      [type]: value,
    });
  };

  getSelectedTag = (options) => {
    if (!options || options.length === 0) {
      return [];
    }
    return options.map(item => <Option key={item}>{item}</Option>);
  };

  getTags = tags => (
    <div className="tags">
      <header>Tags</header>
      <Select
        mode="tags"
        style={{ width: '100%' }}
        placeholder="Tags Mode"
        onChange={this.handleTagsChange}
        defaultValue={tags}
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
  };

  handleRemoveOption = (key) => {
    const { options } = this.state;
    options.splice(key, 1);
    this.setState({
      options,
    });
  };

  handleOptionChange = ({ target }, index) => {
    const { value } = target;
    this.state.options[index] = value;
    this.setState({
      options: this.state.options
    });
  };

  getOptions = () => {
    const { options } = this.state;
    return options.map((option, index) => {
      let marginLeft = index > 1 ? (index % 2 === 0 ? 0 : 36) : 0;
      if (index === 1) {
        marginLeft = 10;
      }
      return (
        <>
          <Col
            span={index > 1 ? 10 : 11}
            style={{ marginLeft, marginTop: 5, marginBottom: 5 }}
          >
            <JInput
              value={option}
              onChange={e => this.handleOptionChange(e, index)}
              label={`Option ${index + 1}`}
              labelClass="label"
              suffix={
                index > 1 ? (
                  <Button
                    icon="minus"
                    className="remove-button"
                    onClick={() => this.handleRemoveOption(index)}
                  />
                ) : null
              }
            />
          </Col>
        </>
      );
    });
  };

  getQuestionsOptions = () => (
    <>
      {this.getOptions()}
      <Col span={1} style={{ marginTop: "4%", marginLeft: 6 }}>
        <Button icon="plus" onClick={this.addOption} />
      </Col>
    </>
  );

  handleSelectChange = (value, type) => {
    // console.log(value, type, QUESTION_TYPES);
    this.setState({
      [type]: value,
    });
  };

  disabledEndDate = endValue => {
    const startValue = moment();
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  handleDateChange = value => {
    this.setState({
      date: value
    });
  };

  validateForm = () => {
    const {
      questionType,
      question,
      showOptions,
      difficultyLevel,
      repeatThis,
      triggerDate,
      count,
      interval,
      tags,
      date
    } = this.state;
    if (!question.trim()) {
      showWarningNotification("Question is mandatory.");
    }
  };

  handleSubmit = () => {
    if (!this.validateForm()) {
      return 0;
    }
  };

  handleCancelClick = () => {
    const { history, match } = this.props;
    history.push(`/admin/dashboard/${match.params.targetID}/questions`);
  };

  getAffix = () => <TargetGroupAffix />;

  getHeader = () => {
    const { match } = this.props;
    if (match.params && match.params.questionID) {
      return 'Edit';
    }
    return 'Add';
  };

  getForm = ({ questionType, question, difficultyLevel, repeatThis,
    triggerDate, count, interval, tags, date,
  }) => (
    <div className="question-form-container">
      <Row className="header">
        {`${this.getHeader()} Question`}
      </Row>
      <div className="form">
        <Divider />
        <Row>
          <Col span={12}>
            <JSelect
              onChange={e => this.handleSelectChange(e, 'questionType')}
              options={QUESTION_TYPES}
              label="Questions Answer Type"
              labelClass="label"
              value={questionType}
              style={{ width: '90%' }}
              required
            />
          </Col>
          <Col span={11} offset={1}>
            <JSelect
              label="Difficulty Level"
              labelClass="label"
              onChange={e => this.handleSelectChange(e, 'difficultyLevel')}
              value={difficultyLevel}
              options={DIFF_LEVELS}
              style={{ width: '90%' }}
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
        <Divider dashed className="divider">
          Will Repeat
        </Divider>
        <Row>
          <Col span={12}>
            <JSwitch
              checked={repeatThis}
              onChange={e => this.handleChange(e, 'repeatThis')}
              label="Repeat this question?"
              labelClass="label"
            />
          </Col>
        </Row>
        {repeatThis && (
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
                    display: 'flex',
                    top: '-11%',
                    color: '#333333',
                    fontSize: '14px',
                    width: '192px',
                    fontWeight: '500',
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
            <Col
              span={7}
              offset={triggerDate === 7 ? 0 : 1}
              style={triggerDate === 7 ? { paddingTop: '4%' } : {}}
            >
              <JInput
                label="Interval"
                labelClass="label"
                value={interval}
                onChange={e => this.handleChange(e.target.value, 'interval')}
              />
            </Col>
          </Row>
        )}
        <Divider dashed className="divider">
          Tags
        </Divider>
        <Row>{this.getTags(tags)}</Row>
      </div>
      <div className="action">
        <div>
          <Button onClick={this.handleSubmit}>Submit</Button>
        </div>
        <div>
          <Button onClick={this.handleCancelClick}>Cancel</Button>
        </div>
      </div>
    </div>
  );
  
  render() {
    const { loading, ...rest } = this.state;
    return (
      <>
        {this.getAffix()}
        {!loading && this.getForm(rest)}
        {loading && <Skeleton row={5} />}
      </>
    );
  }
}

export default AddQuestionForm;

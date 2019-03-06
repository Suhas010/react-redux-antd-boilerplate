/* eslint-disable react/prop-types */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
import React from 'react';
import { Button, Row, Col, Divider, Select, DatePicker, Skeleton, Icon } from 'antd';
import moment from 'moment';
import { showSuccessNotification } from '../../reusable/Notifications';
import JSelect from '../../reusable/Select';
import JTextArea from '../../reusable/TextArea';
import { CONFIG, DEFAULT_DATE } from '../Constants';
import JInput from '../../reusable/Input';
import JSwitch from '../../reusable/Switch';
import TargetGroupAffix from './TargetGroupAffix';
import './AddQuestions.scss';
import QuestionModel from '../../../models/AppModel/Questions';
import { getQuestion, updateQuestion, saveQuestion } from '../../../actions/appActions/QuestionActions';
import { getConfigFor, getIDOf } from '../../../utils/commonFunctions';

const { Option } = Select;
const QUESTION_TYPES = getConfigFor('questionTypes');
const DIFF_LEVELS = getConfigFor('difficultyLevels');

class AddQuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      submitLoading: false,
      openDatePicker: false,
      questionType: 0,
      question: '',
      difficultyLevel: 10,
      repeatThis: false,
      triggerDate: 2,
      count: '',
      interval: '',
      tags: [],
      options: [{ body: '' }, { body: '' }],
      date: moment(),
      error: {},
    };
  }

  componentWillMount() {
    const { match } = this.props;
    const { questionID, targetID } = match.params;
    if (!questionID) {
      this.setState({ loading: false });
      return;
    }
    // if (QuestionModel.list().length > 0) {
    //   this.setQuestionData(QuestionModel.get(questionID).props);
    //   return;
    // }
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
    tags, body, difficulty_level, type, options, repeat_trigger_at, repeat_count, repeat_interval
  }) {
    let questionOptions = [];
    if (!options) {
      questionOptions = [{ body: '' }, { body: '' }];
    }
    options.map(item => questionOptions.push(item));
    this.setState({
      tags: tags.split(','),
      triggerDate: repeat_trigger_at ? 7 : 2,
      date: moment(repeat_trigger_at),
      count: repeat_count,
      repeatThis: repeat_trigger_at ? true : false,
      interval: repeat_interval,
      question: body,
      difficultyLevel: getIDOf('difficultyLevels', difficulty_level),
      questionType: getIDOf('questionTypes', type),
      loading: false,
      options: questionOptions,
    });
  }

  updateQuestion = (payload) => {
    const { match: { params } } = this.props;
    updateQuestion(params.targetID, payload)
      .then(() => {
        this.setLoading('submitLoading', false);
        showSuccessNotification('Question has been updated successfully.');
        this.handleCancelClick();
      })
      .catch((error) => {
        this.setLoading('submitLoading', false);
        console.log(error);
      });
  }

  addQuestion = (payload) => {
    const { match: { params } } = this.props;
    saveQuestion(params.targetID, payload)
      .then((response) => {
        this.setLoading('submitLoading', false);
        showSuccessNotification('A new question has been added successfully.');
        this.handleCancelClick();
      })
      .catch((error) => {
        this.setLoading('submitLoading', false);
        console.log(error);
      });
  }

  setLoading = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  handleTagsChange = (tags) => {
    this.setState({
      tags,
    });
  };

  handleChange = (value, type) => {
    if (type === 'question') {
      this.resetError();
    }
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
    this.state.options.push({ body: '' });
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
    this.state.options[index].body = value;
    this.setState({
      options: this.state.options,
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
              value={option.body}
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
      <Col span={1} style={{ marginTop: '4%', marginLeft: 6 }}>
        <Button icon="plus" onClick={this.addOption} />
      </Col>
    </>
  );

  handleDateChange = (date, ...rest) => {
    if (!date) {
      this.setState({
        triggerDate: 1,
        openDatePicker: false,
      });
    }
    this.setState({
      date,
      openDatePicker: false,
    });
  };


  handleSelectChange = (value, type) => {
    if (type === 'triggerDate' && value === 7) {
      this.setState({
        date: moment(),
        openDatePicker: true,
      });
    }
    
    this.setState({
      [type]: value,
    });
  };

  setError = (field, message) => {
    const { error } = this.state;
    error[field] = message;
    this.setState({
      error,
    });
  }

  resetError = () => this.setState({ error: {} });

  validateForm = () => {
    const {
      question,      
    } = this.state;
    if (!question.trim()) {
      this.setError('question', 'Field is mandatory.');
      return false;
    }
    return true;
  };

  handleSubmit = () => {
    if (!this.validateForm()) {
      return 0;
    }
    this.setLoading('submitLoading', true);
    const {
      questionType,
      question,
      difficultyLevel,
      repeatThis,
      triggerDate,
      count,
      interval,
      options,
      tags,
      date
    } = this.state;
    let questionTags = "";
    if (tags) {
      tags.forEach((tag) => {
        questionTags = questionTags.concat(`${tag},`);
      });
      questionTags = questionTags.slice(0, questionTags.length - 1);
    }

    const payload = {
      body: question,
      tags: questionTags,
      difficulty_level: difficultyLevel,
      type: questionType,
      options,
    };
    const { match } = this.props;
    if (repeatThis) {
      payload.repeat_trigger_at = triggerDate === 7 ? date : DEFAULT_DATE[triggerDate].value;
      payload.repeat_count = parseInt(count);
      payload.repeat_interval = parseInt(interval);
    }
    if (match.params && match.params.questionID) {
      payload.id = match.params.questionID;
      this.updateQuestion({ question: payload });
      return 0;
    }
    this.addQuestion({ question: payload });
    return 0;
  };

  handleCancelClick = () => {
    const { history, match } = this.props;
    history.push(`/admin/dashboard/${match.params.targetID}/questions`);
  };

  getAffix = () => <TargetGroupAffix />;

  getHeader = () => {
    const { match } = this.props;
    if (match.params && match.params.questionID) {
      return 'Update';
    }
    return 'Add';
  };

  disabledDate = (currentDate) => {
    // Can not select days before today and today
    return currentDate && currentDate < moment().subtract(1, 'd').endOf('day');
  }

  getForm = ({ questionType, question, difficultyLevel, repeatThis,
    triggerDate, count, interval, tags, date, error, submitLoading, openDatePicker,
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
              error={error.question}
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
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="close" />}
              onChange={e => this.handleChange(e, 'repeatThis')}
              label="Repeat this question?"
              labelClass="label"
            />
          </Col>
        </Row>
        {repeatThis && (
          <Row style={{ paddingTop: '4%' }}>
            {triggerDate !== 7 && (
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
            )}
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
                  Trigger Date
                </span>
                <DatePicker
                  value={date}
                  onOpenChange={() => this.setState({ openDatePicker: true })}
                  onChange={this.handleDateChange}
                  disabledDate={this.disabledDate}
                  open={openDatePicker}
                />
              </Col>
            )}
            <Col span={7} offset={1}>
              <JInput
                label="Repeat Count"
                labelClass="label"
                type="number"
                value={count}
                min={0}
                onChange={e => this.handleChange(e.target.value, 'count')}
              />
            </Col>
            <Col
              span={7}
              offset={1}
              // style={triggerDate === 7 ? { paddingTop: '4%' } : {}}
            >
              <JInput
                label="Repeat Interval"
                labelClass="label"
                value={interval}
                type="number"
                min={0}
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
          <Button
            onClick={this.handleSubmit}
            loading={submitLoading}
            type="primary"
          >
            {this.getHeader()}
          </Button>
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

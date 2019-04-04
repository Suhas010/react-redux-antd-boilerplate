/* eslint-disable react/prop-types */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
import React from 'react';
import { Button, Row, Col, Divider, Select, DatePicker, Skeleton, Icon } from 'antd';
import moment from 'moment';
import { showSuccessNotification, showWarningNotification } from '../reusable/Notifications';
import JSelect from '../reusable/Select';
import JTextArea from '../reusable/TextArea';
import { CONFIG, DEFAULT_DATE } from '../targetGroup/Constants';
import JInput from '../reusable/Input';
import JSwitch from '../reusable/Switch';
import TargetGroupDetails from '../targetGroup/TargetGroupDetails';
import './Question.scss';
import QuestionModel from '../../models/AppModel/Questions';
import { getConfig } from '../../actions/appActions/AppConfigActions';
import { getQuestion, updateQuestion, saveQuestion } from '../../actions/appActions/QuestionActions';
import { getIDOf } from '../../utils/commonFunctions';
import ErrorBoundary from '../reusable/ErrorBoundary';

const { Option } = Select;

class QuestionForm extends React.Component {
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
      repeatTypeOption: 2,
      repeatCount: '',
      interval: '',
      tags: [],
      options: [{ body: '' }, { body: '' }],
      triggerDate: moment(),
      error: {},
      questionTypes: [],
      difficultyLevels: [],
    };
  }

  componentWillMount() {
    const { match } = this.props;
    const { questionID, targetID } = match.params;

    getConfig().then((data) => {
      const { difficulty_levels, question_types } = data;
      this.setState({
        questionTypes: question_types,
        difficultyLevels: difficulty_levels,
      });
    }).catch((e) => {
      console.log(e);
    });

    if (!questionID) {
      this.setState({ loading: false });
      return;
    }

    getQuestion(targetID, questionID)
      .then((data) => {
        this.setQuestionData(data.question);
        new QuestionModel(data.question).$save();
      })
      .catch((e) => {
        this.handleCancelClick();
        console.log(e);
      });
  }

  setQuestionData({
    tags, body, difficulty_level, type, options, repeat_trigger_at, repeat_count, repeat_interval,
  }) {
    let questionOptions = [];
    if (!options) {
      questionOptions = [{ body: '' }, { body: '' }];
    }
    options.map(item => questionOptions.push(item));
    this.setState({
      tags: tags.length > 0 ? tags.split(',') : [],
      repeatTypeOption: repeat_trigger_at ? 7 : 2,
      triggerDate: moment(repeat_trigger_at),
      repeatCount: repeat_count,
      repeatThis: repeat_count ? true : false,
      interval: repeat_interval,
      question: body,
      difficultyLevel: getIDOf('difficultyLevels', difficulty_level),
      questionType: getIDOf('questionTypes', type),
      loading: false,
      options: questionOptions,
    });
  }

  updateQuestion = (questionID, payload) => {
    const { match: { params } } = this.props;
    updateQuestion(params.targetID, questionID, payload)
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
    console.log(tags, "$$$$");
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
    return options.map((item) => {
      if (item) return <Option key={item}>{item}</Option>;
    });
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
        <React.Fragment key={`${option.body}${index}`}>
          <Col
            span={index > 1 ? 10 : 11}
            style={{ marginLeft, marginTop: 5, marginBottom: 5 }}
            key={option.body}
          >
            <JInput
              value={option.body}
              onChange={e => this.handleOptionChange(e, index)}
              label={`Option ${index + 1}`}
              labelClass="j-label"
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
        </React.Fragment>
      );
    });
  };

  getQuestionsOptions = () => (
    <>
      {this.getOptions()}
      <Col span={1} style={{ marginTop: 29, marginLeft: 6 }}>
        <Button icon="plus" onClick={this.addOption} />
      </Col>
    </>
  );

  handleDateChange = (triggerDate, ...rest) => {
    if (!triggerDate) {
      this.setState({
        repeatTypeOption: 1,
        openDatePicker: false,
      });
    }
    this.setState({
      triggerDate,
      openDatePicker: false,
    });
  };


  handleSelectChange = (value, type) => {
    if (type === 'repeatTypeOption' && value === 7) {
      this.setState({
        triggerDate: moment(),
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
      repeatThis,
      interval,
      repeatCount,
    } = this.state;

    if (repeatThis) {
      if (!repeatCount || !interval) {
        showWarningNotification('If question is repeating, Trigger date, repeat count and repeat interval must present');
        return false;
      }
      return true;
    }

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
      repeatTypeOption,
      repeatCount,
      interval,
      options,
      tags,
      triggerDate,
    } = this.state;
    let questionTags = null;
    if (tags && tags.length > 0) {
      questionTags = tags.join().replace(/,\s*$/, '');
    }

    const payload = {
      body: question,
      tags: questionTags ? questionTags : null,
      difficulty_level: difficultyLevel,
      type: questionType,
      options,
    };
    const { match } = this.props;
    if (repeatThis) {
      payload.repeat_trigger_at = repeatTypeOption === 7 ? triggerDate : DEFAULT_DATE[repeatTypeOption].value;
      payload.repeat_count = parseInt(repeatCount);
      payload.repeat_interval = parseInt(interval);
    }
    if (match.params && match.params.questionID) {
      this.updateQuestion(match.params.questionID, { question: payload });
      return 0;
    }
    this.addQuestion({ question: payload });
    return 0;
  };

  handleCancelClick = () => {
    const { history, match } = this.props;
    history.push(`/admin/dashboard/${match.params.targetID}/questions`);
  };

  getAffix = () => <TargetGroupDetails />;

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

  renderCloseButton = () => {
    return (
      <Button type="primary" onClick={()=> this.setState({ openDatePicker: false })}>Ok </Button>
    );
  }

  getForm = ({ questionTypes, difficultyLevels, questionType, question, difficultyLevel, repeatThis,
    repeatTypeOption, repeatCount, interval, tags, triggerDate, error, submitLoading, openDatePicker,
  }) => (
    <div className="question-form-container">
      <Row className="header">
        {`${this.getHeader()} Question`}
      </Row>
      <div className="form">
        <Divider />
        <ErrorBoundary name="Question Type and Difficulty Level">
          <Row>
            <Col span={12}>
              <JSelect
                onChange={e => this.handleSelectChange(e, 'questionType')}
                options={questionTypes}
                label="Question's Answer Type"
                labelClass="j-label"
                value={questionType}
                style={{ width: '90%' }}
                required
              />
            </Col>
            <Col span={11} offset={1}>
              <JSelect
                label="Difficulty Level"
                labelClass="j-label"
                onChange={e => this.handleSelectChange(e, 'difficultyLevel')}
                value={difficultyLevel}
                options={difficultyLevels}
                style={{ width: '90%' }}
              />
            </Col>
          </Row>
        </ErrorBoundary>
        <br />
        <ErrorBoundary name="Question">
          <Row>
            <Col span={24}>
              <JTextArea
                label="Question"
                labelClass="j-label"
                value={question}
                row={1}
                onChange={e => this.handleChange(e.target.value, 'question')}
                required
                error={error.question}
              />
            </Col>
          </Row>
        </ErrorBoundary>
        <ErrorBoundary name="Question Options">
          <Row>
            {(questionType === 0 || questionType === 1) && this.getQuestionsOptions()}
          </Row>
        </ErrorBoundary>
        <ErrorBoundary name="Question Repetition">
          <Divider dashed className="divider" />
          <Row>
            <Col span={12}>
              <JSwitch
                checked={repeatThis}
                checkedChildren={<Icon type="check" />}
                unCheckedChildren={<Icon type="close" />}
                onChange={e => this.handleChange(e, 'repeatThis')}
                label="Repetition"
                labelClass="j-label"
              />
            </Col>
          </Row>
          {repeatThis && (
            <Row style={{ paddingTop: '4%' }}>
              {repeatTypeOption !== 7 && (
                <Col span={7}>
                  <JSelect
                    value={repeatTypeOption}
                    label="Trigger Date"
                    labelClass="j-label"
                    options={CONFIG.triggerDate}
                    onChange={e => this.handleSelectChange(e, 'repeatTypeOption')}
                    style={{ width: '90%' }}
                  />
                </Col>
              )}
              {repeatTypeOption === 7 && (
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
                    value={triggerDate}
                    // onOpenChange={() => this.setState({ openDatePicker: true })}
                    onChange={this.handleDateChange}
                    disabledDate={this.disabledDate}
                    // renderExtraFooter={this.renderCloseButton}
                    format="DD-MM-YYYY"
                    // open={openDatePicker}
                  />
                </Col>
              )}
              <Col span={7} offset={1}>
                <JInput
                  label="Repeat Count"
                  labelClass="j-label"
                  type="number"
                  value={repeatCount}
                  min={0}
                  onChange={e => this.handleChange(e.target.value, 'repeatCount')}
                />
              </Col>
              <Col
                span={7}
                offset={1}
              >
                <JInput
                  label="Repeat Interval In Days"
                  labelClass="j-label"
                  value={interval}
                  type="number"
                  min={0}
                  onChange={e => this.handleChange(e.target.value, 'interval')}
                />
              </Col>
            </Row>
          )}
        </ErrorBoundary>
        <Divider dashed className="divider" />
        <ErrorBoundary name="Tags">
          <Row>{this.getTags(tags)}</Row>
        </ErrorBoundary>
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
          <Button
            onClick={this.handleCancelClick}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );

  render() {
    const { loading, ...rest } = this.state;
    return (
      <ErrorBoundary name="Question Form">
        {this.getAffix()}
        {!loading && this.getForm(rest)}
        {loading && <Skeleton active paragraph={{ row: 5 }} />}
      </ErrorBoundary>
    );
  }
}

export default QuestionForm;

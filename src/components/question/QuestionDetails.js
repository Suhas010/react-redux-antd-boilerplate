/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Collapse, Row, Col, Icon, Empty, Tooltip, Tag, Divider, Modal, Button, Skeleton } from 'antd';
import moment from 'moment';
import QuestionDetailsModel from './QuestionDetailsModel';
import { changeQuestionState, getSimilarQuestions } from '../../actions/appActions/QuestionActions';
import { getItem } from '../helpers/localStorage';
import routes from '../../utils/routes';
import ErrorBoundary from '../reusable/ErrorBoundary';
import { showSuccessNotification, showFailureNotification } from '../reusable/Notifications';
import QuestionModel from '../../models/AppModel/Questions';
import SimilarQuestionPanel from './SimilarQuestionPanel';

const { Panel } = Collapse;
const colorArray = ['magenta', 'red', 'volcano', 'orange', 'cyan', 'blue', 'geekblue', 'purple'];
class QuestionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsID: '',
      showSimilarModal: false,
      similarLoading: false,
      similarQuestions: [],
    };
  }

  updateQuestionStatus = (questionsID, newState, available_transitions) => {
    const question = QuestionModel.get(questionsID);
    question.props.status = newState;
    question.props.available_transitions = available_transitions;
    new QuestionModel(question.props).$save();
  }

  changeQuestionState = (targetID, questionsID, newState) => {
    changeQuestionState(targetID, questionsID, newState)
      .then((payload) => {
        showSuccessNotification(payload.message);
        this.updateQuestionStatus(questionsID, payload.status, payload.available_transitions);
      })
      .catch((error) => {
        showFailureNotification('Something went wrong while changing question status.');
        console.log(error);
      });
  }

  getSimilarQuestionsAPI = (questionID) => {
    this.setState({
      similarLoading: true,
    });
    const { props: { body } } = QuestionModel.get(questionID);
    const { match: { params } } = this.props;
    getSimilarQuestions(params.targetID, { filters: { body } })
      .then((payload) => {
        this.setState({
          similarLoading: false,
          similarQuestions: payload.questions,
        });
      })
      .catch((error) => {
        this.setState({
          similarLoading: false,
          similarQuestions: [],
        });
      });
  }

  getOptions = options => options.map((option, index) => (
    <Row className="options-container" key={option.body + index}>
      <Col span={2}>
        <span>{`Option ${index + 1}`}</span>
      </Col>
      <Col span={21}>
        <div>{option.body}</div>
      </Col>
    </Row>
  ));

  getQuestionsAllOptions = (type, options) => {
    const ifOptions = type === 'Select' || type === 'MultiSelect';
    return (
      <>
        <Divider style={{ margin: '8px 0px' }} />
        {ifOptions && (
          <>
            {this.getOptions(options)}
          </>
        )
        }
      </>
    );
  }

  getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getTags = (tags) => {
    return tags.map((tag) => {
      if (!tag) return null;
      return (
        <Tag
          color={colorArray[this.getRandomInt(0, 8)]}
          key={tag}
        >
          {tag}
        </Tag>
      );
    });
  }

  handleTransition = (questionsID, transition) => {
    const { match: { params } } = this.props;
    this.changeQuestionState(params.targetID, questionsID, transition.toLocaleLowerCase());
  }

  // returns actionable buttons
  getAvailableTransitions = (id, transitions) => {
    return transitions.map((transition) => {
      return (
        <Tooltip title={`Move question to ${transition.toLocaleLowerCase()} state.`} key={transition}>
          <Button
            onClick={() => this.handleTransition(id, transition)}
            style={{
              color: 'white',
              background: this.getTransitionColor(transition),
            }}
          >
            {`${this.getCamelCase(transition)} Question`}
          </Button>
        </Tooltip>
      );
    });
  }

  get_TYPE_UPDATED_DIFF_TRANSITION = (id, type, time, diff, availableTransitions, isSimilar) => (
    <>
      <Row>
        <Col span={3}>
          <div className="data-container">
            <span className="label">Type</span>
            <div className="tags">
              {type}
            </div>
          </div>
        </Col>
        <Col span={3}>
          <div className="data-container">
            <span className="label">Difficulty</span>
            <span>{diff}</span>
          </div>
        </Col>
        <Col span={5}>
          <div className="data-container">
            <span className="label">Updated</span>
            <span>{moment(time).from(moment())}</span>
          </div>
        </Col>
        { availableTransitions && !isSimilar && (
          <Col span={12}>
            <div className="transition">
              {this.getAvailableTransitions(id, availableTransitions)}
            </div>
          </Col>
        )}
      </Row>
    </>
  )

  getPrimaryInformation = (id, type, isSimilar, {
    updated_at, difficulty_level, tags, available_transitions,
  }) => (
    <div className="details-container">
      {this.get_TYPE_UPDATED_DIFF_TRANSITION(id, type, updated_at, difficulty_level, available_transitions, isSimilar)}
      <Divider style={{ margin: '8px 0px' }} />
      <Row>
        <Col span={1}>
          <span className="label">Tags</span>
        </Col>
        <Col span={23}>
          <ErrorBoundary name="Show Tags">
            { tags && tags.length > 0 && (
              <div className="tags">
                {this.getTags(tags)}
              </div>
            )}

          </ErrorBoundary>
        </Col>
      </Row>
    </div>
  );

  getTransitionColor = (status) => {
    switch (status) {
    case 'NEW': return '#108ee9';
    case 'SUBMIT': return '#3a8a61';
    case 'DRAFT': return '#2db7f5';
    case 'PUBLISH':
    case 'PUBLISHED': return '#87d068';
    case 'REJECT':
    case 'REJECTED': return '#ffbf00';
    case 'DEACTIVATE':
    case 'DEACTIVATED': return '#ff0202';
    default: return '#108ee9';
    }
  }

  getCamelCase = (string) => {
    return string[0].toLocaleUpperCase().concat(string.slice(1, string.length).toLocaleLowerCase());
  }

  getExtras = (id, status) => {
    const profile = getItem('profile');
    const { history, match: { params } } = this.props;
    const EditIcon = (
      <Tooltip connect="Edit Question" key={id}>
        <Icon type="edit" onClick={() => history.push(`${routes.dashboard}/${params.targetID}/questions/edit/${id}`)} />
      </Tooltip>
    );

    return (
      <div className="extras-container">
        <Tag
          className="status"
          color={this.getTransitionColor(status)}
        >
          {this.getCamelCase(status)}
        </Tag>
        <span className="edit">{EditIcon}</span>
      </div>
    );
  }

  handleCloseModal = () => {
    this.setState({
      showSimilarModal: false,
      questionsID: '',
    });
  }


  showSimilarModal = (id) => {
    this.setState({
      showSimilarModal: true,
    });
  }

  // Shows similar question of particular question on modal.
  getModel = (body) => {
    const { showSimilarModal, questionsID, similarQuestions } = this.state;
    if (showSimilarModal) {
      return (
        <Modal
          title={`Followings are similar of "${body}"`}
          centered
          visible={showSimilarModal}
          onCancel={this.handleCloseModal}
          onOk={this.handleCloseModal}
          width={1000}
          className="question-details-model"
        >
          <QuestionDetailsModel
            questions={similarQuestions}
            isSimilar
          />
        </Modal>
      );
    }
    return null;
  }

  getStatus = (status) => {
    return (
      <Tag className="status" color={this.getTransitionColor(status)}>{status}</Tag>
    );
  }

  handlePanelClick = (clickedID) => {
    this.setState({
      clickedID,
      // similarQuestions: [],
    });
    if (clickedID && !this.props.isSimilar) {
      this.getSimilarQuestionsAPI(clickedID);
    }
  }

  getQuestions = () => {
    const { questions, isSimilar } = this.props;
    return questions.map(({
      id, body, type, options, status, ...rest
    }) => (
      <Panel
        header={body}
        key={id}
        extra={isSimilar ? this.getStatus(status) : this.getExtras(id, status)}
      >
        <div className="question-body">
          {!isSimilar && this.getModel(body)}
          <Row>
            {this.getPrimaryInformation(id, type, isSimilar, rest)}
          </Row>
          <Row>
            {this.getQuestionsAllOptions(
              type,
              options,
            )}
          </Row>
        </div>
      </Panel>
    ));
  }

  getSimilarQuestions = () => {
    const { similarLoading, similarQuestions } = this.state;
    if (similarLoading) return <Skeleton active paragraph />;
    if (!similarQuestions || similarQuestions.length === 0) {
      return <Empty description="No similar questions found." />;
    }
    return (
      <SimilarQuestionPanel
        questions={similarQuestions}
        handleViewDetailsClick={this.showSimilarModal}
      />
    );
  }

  getQuestionPanel = () => {
    const { questions, isSimilar } = this.props;
    const { clickedID } = this.state;
    if (!questions || questions.length === 0) {
      return <Empty description="No question found in selected target group." />;
    }
    return (
      <Row>
        <Col span={clickedID && !isSimilar ? 16 : 24}>
          <Collapse
            onChange={this.handlePanelClick}
            bordered={false}
            accordion
          >
            {this.getQuestions()}
          </Collapse>
        </Col>
        { clickedID && !isSimilar && (
          <Col span={8}>
            {this.getSimilarQuestions()}
          </Col>
        )}
      </Row>

    );
  }

  render = () => (
    <>
      {this.getQuestionPanel()}
    </>
  );
}

export default QuestionDetails;

/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import moment from 'moment';
import {
  Collapse, Row, Col, Icon, Empty, Tooltip, Tag, Divider, Modal, Button, Skeleton,
} from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import QuestionDetailsModel from './QuestionDetailsModel';
import QuestionModel from '../../models/AppModel/Questions';
import SimilarQuestionPanel from './SimilarQuestionPanel';
import ErrorBoundary from '../reusable/ErrorBoundary';
import Pagination from '../reusable/Pagination';
import routes from '../../utils/routes';
import { changeQuestionState, getSimilarQuestions } from '../../actions/appActions/QuestionActions';
import { showSuccessNotification, showFailureNotification } from '../reusable/Notifications';


const { Panel } = Collapse;
class QuestionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSimilarModal: false,
      similarLoading: false,
      similarQuestions: [],
      isSimilarExist: false,
      selectedSimilarQuestionBody: '',
      selectedSimilarQuestion: '',
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
      isSimilarExist: true,
    });
    const { props: { body } } = QuestionModel.get(questionID);
    const { match: { params } } = this.props;
    getSimilarQuestions(params.targetID, { filters: { body } })
      .then((payload) => {
        this.setState({
          similarLoading: false,
          isSimilarExist: payload.questions.length >0 ? true : false,
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

  getTags = (tags) => {
    return tags.map((tag) => {
      if (!tag) return null;
      return (
        <Tag
          color="blue"
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
            type="primary"
            // style={{
            //   color: 'white',
            //   background: this.getTransitionColor(transition),
            // }}
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
          <Col span={13}>
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
    if (!string) return 0;
    return string[0].toLocaleUpperCase().concat(string.slice(1, string.length).toLocaleLowerCase());
  }

  getStatusStyleClass = (status) => {
    switch (status) {
    case 'NEW': return 'new';
    case 'SUBMIT': return 'submit';
    case 'DRAFT': return 'new';
    case 'PUBLISH':
    case 'PUBLISHED': return 'publish';
    case 'REJECT':
    case 'REJECTED': return 'reject';
    case 'DEACTIVATE':
    case 'DEACTIVATED': return 'deactivated';
    default: return 'new';
    }
  }

  getExtras = (id, status) => {
    const { history, match: { params } } = this.props;
    return (
      <div className="extras-container">
        <div
          className={`status ${this.getStatusStyleClass(status)}`}
        >
          {this.getCamelCase(status)}
        </div>
        <Tooltip title="Edit Question">
          <span
            className="edit"
            role="button"
            onClick={() => history.push(`${routes.dashboard}/${params.targetID}/questions/edit/${id}`)}
          >
            <Icon type="edit" theme="twoTone" />
          </span>
        </Tooltip>
      </div>
    );
  }

  handleCloseModal = () => {
    this.setState({
      showSimilarModal: false,
      selectedSimilarQuestion: '',
    });
  }


  showSimilarModal = (id) => {
    this.setState({
      showSimilarModal: true,
      selectedSimilarQuestion: id,
    });
  }

  // Shows similar question of particular question on modal.
  getModel = () => {
    const { showSimilarModal, selectedSimilarQuestion, selectedSimilarQuestionBody, similarQuestions } = this.state;
    if (showSimilarModal) {
      return (
        <Modal
          title={`Followings are published similar questions of "${selectedSimilarQuestionBody}" question.`}
          centered
          visible={showSimilarModal}
          onCancel={this.handleCloseModal}
          onOk={this.handleCloseModal}
          width={1000}
          className="question-details-model"
        >
          <QuestionDetailsModel
            questions={similarQuestions}
            selectedSimilarQuestion={selectedSimilarQuestion}
            isSimilar
          />
        </Modal>
      );
    }
    return null;
  }

  handlePanelClick = (clickedID) => {
    this.setState({
      clickedID,
      selectedSimilarQuestionBody: clickedID ? QuestionModel.get(clickedID).props.body : '',
    });
    if (clickedID && !this.props.isSimilar) {
      console.log();
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
        extra={!isSimilar && this.getExtras(id, status)}
      >
        <div className="question-body">
          {!isSimilar && this.getModel()}
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
    const { questions, isSimilar, selectedSimilarQuestion } = this.props;
    const { clickedID, isSimilarExist } = this.state;
    if (!questions || questions.length === 0) {
      return <Empty description="No question found in selected target group." />;
    }
    return (
      <Row>
        <Col span={clickedID && !isSimilar && isSimilarExist ? 16 : 24}>
          <Scrollbars
            style={{ height: 470 }}
          >
            <Collapse
              onChange={this.handlePanelClick}
              bordered={false}
              defaultActiveKey={isSimilar ? selectedSimilarQuestion : ''}
              accordion
            >
              {this.getQuestions()}
            </Collapse>
          </Scrollbars>
        </Col>
        { clickedID && !isSimilar && isSimilarExist && (
          <Col span={8}>
            {this.getSimilarQuestions()}
          </Col>
        )}
      </Row>

    );
  }

  getPagination = () => {
    const { currentPage, totalRecords, pageSize, onPageChange, questions, isSimilar } = this.props;
    if (!questions || questions.length === 0 || isSimilar) return null;
    return (
      <Pagination
        currentPage={currentPage}
        totalRecords={totalRecords}
        maxPerPage={pageSize}
        onPageChange={onPageChange}
      />
    );
  }

  render = () => (
    <>
      {this.getQuestionPanel()}
      {this.getPagination()}
    </>
  );
}

export default QuestionDetails;

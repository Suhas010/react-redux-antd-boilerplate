/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Collapse, Row, Col, Icon, Empty, Tooltip, Tag, Divider, Modal } from 'antd';
import moment from 'moment';
import QuestionDetailsModel from './QuestionDetailsModel';
import { getItem } from '../helpers/localStorage';
import routes from '../../utils/routes';

const { Panel } = Collapse;
const colorArray = ['magenta', 'red', 'volcano', 'orange', 'cyan', 'blue', 'geekblue', 'purple'];
class QuestionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsID: '',
      showSimilarModal: false,
    };
  }

  getQuestionOptions = options => options.map((option, index) => (
    <Row className="options-container" key={option.body+index}>
      <Col span={2}>
        <span>{`Option ${index + 1}`}</span>
      </Col>
      <Col span={21}>
        <div>{option.body}</div>
      </Col>
    </Row>
  ));

  getQuestionTypeAndOptions = (type, options) => {
    const ifOptions = type === 'Select' || type === 'MultiSelect';
    return (
      <>
        <Divider style={{ margin: '8px 0px' }} />
        {ifOptions && (
          <>
            {this.getQuestionOptions(options)}
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
    const tagsArray = tags.split(',');
    return tagsArray.map(tag => <Tag color={colorArray[this.getRandomInt(0, 8)]} key={tag}>{tag}</Tag>);
  }


  getUpdated = (type, time, status, diff) => (
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
        <Col span={3}>
          <div className="data-container">
            <span className="label">Updated</span>
            <span>{moment(time).from(moment())}</span>
          </div>
        </Col>
      </Row>
    </>
  )

  getQuestionTagsAndUpdatedAt = (type, status, {
    updated_at, difficulty_level, tags,
  }) => (
    <div className="details-container">
      {this.getUpdated(type, updated_at, status, difficulty_level)}
      <Divider style={{ margin: '8px 0px' }} />
      <Row>
        <Col span={1}>
          <span className="label">Tags</span>
        </Col>
        <Col span={23}>
          <div className="tags">
            {tags && this.getTags(tags)}
          </div>
        </Col>
      </Row>
    </div>
  );

  handleSimilarClick = (id) => {
    this.setState({
      showSimilarModal: true,
      questionsID: id,
    });
  }

  getExtras = (id, status) => {
    const profile = getItem('profile');
    const { history, match: { params } } = this.props;
    const EditIcon = (
      <Tooltip connect="Edit Question">
        <Icon type="edit" onClick={() => history.push(`${routes.dashboard}/${params.targetID}/questions/edit/${id}`)} />
      </Tooltip>
    );

    return (
      <div className="extras-container">
        <span className="similar" onClick={ () => this.handleSimilarClick(id)}> Similar </span>
        <Tag className="status" color={status === 'accepted' ? 'green' : 'red'}>{status}</Tag>
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

  // Shows similar question of particular question on modal.
  getModel = (body) => {
    const { showSimilarModal, questionsID } = this.state;
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
            questionsID={questionsID}
          />
        </Modal>
      );
    }
    return null;
  }

  getStatus = (status) => {
    return (
      <Tag className="status" color={status === 'accepted' ? 'green' : 'red'}>{status}</Tag>
    );
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
            {this.getQuestionTagsAndUpdatedAt(type, status, rest)}
          </Row>
          <Row>
            {this.getQuestionTypeAndOptions(
              type,
              options,
            )}
          </Row>
        </div>
      </Panel>
    ));
  }

  getQuestionPanel = () => {
    const { questions } = this.props;
    if (!questions || questions.length === 0) {
      return <Empty />;
    }
    return (
      <Collapse bordered={false} accordion>
        {this.getQuestions()}
      </Collapse>
    );
  }

  render = () => (
    <>
      {this.getQuestionPanel()}
    </>
  );
}

export default QuestionDetails;

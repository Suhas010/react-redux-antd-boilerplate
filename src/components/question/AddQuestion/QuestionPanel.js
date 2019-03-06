/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Collapse, Row, Col, Icon, Empty, Tooltip, Tag, Divider } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import QuestionModel from '../../../models/AppModel/Questions';

const { Panel } = Collapse;
const colorArray = ['magenta', 'red', 'volcano', 'orange', 'cyan', 'blue', 'geekblue', 'purple'];
class QuestionPanel extends Component {
  getQuestionOptions = options => options.map((option, index) => (
    <>
      <Col span={2}>
        <span>{`Option ${index + 1}`}</span>
      </Col>
      <Col span={21}>
        <div>{option.body}</div>
      </Col>
    </>
  ));

  getQuestionsDetails = (type, options) => {
    const ifOptions = type === 'Select' || type === 'MultiSelect';
    return (
      <>
        <Divider />
        {ifOptions && (
          <Row className="options-container">
            {this.getQuestionOptions(options)}
          </Row>
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
    return tagsArray.map(tag => <Tag color={colorArray[this.getRandomInt(0, 8)]}>{tag}</Tag>);
  }


  getUpdated = (type, time, status, diff) => (
    <>
      <Row>
        <Col span={12}>
          <Row>
            <Col span={4}>
              <span className="label"> Status</span>
            </Col>
            <Col span={18}>
              <span className="status">{status}</span>
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <span className="label">Type</span>
            </Col>
            <Col span={18}>
              <div className="tags">
                {type}
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={4}>
              <span className="label">Difficulty</span>
            </Col>
            <Col span={18}>
              <span style={{ paddingLeft: 17 }}>{diff}</span>
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <span className="label">Updated</span>
            </Col>
            <Col span={18}>
              <span style={{ paddingLeft: 17 }}>{moment(time).from(moment())}</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )

  getQuestionStatus = (type, {
    updated_at, difficulty_level, status, tags,
  }) => {
    return (
      <div className="details-container">
        <Row>
          <Col span={4}>
            <span className="label">Tags</span>
          </Col>
          <Col span={18}>
            <div className="tags">
              {tags && this.getTags(tags)}
            </div>
          </Col>
        </Row>
        {this.getUpdated(type, updated_at, status, difficulty_level)}
      </div>
    );
  }

  getQuestions = () => {
    const { questions, history, match } = this.props;
    const { params } = match;
    return questions.map(({
      id, body, type, options, ...rest
    }) => (
      <Panel
        header={body}
        key={id}
        style={{
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <div className="question-body">
          <Row className="edit-button">
            <Tooltip connect="Edit Question">
              <Icon type="edit" onClick={() => history.push(`/admin/dashboard/${params.targetID}/questions/edit/${id}`)} />
            </Tooltip>
          </Row>
          <Row>
            <Col span={12} >
              {this.getQuestionStatus(type, rest)}
            </Col>
          </Row>
          <Row span={12}>
            {this.getQuestionsDetails(
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

function mapStateToProps() {
  return {
    questions: QuestionModel.list()[0] ? QuestionModel.list().map(item => item[1].props) : [],
  };
}

export default connect(mapStateToProps)(QuestionPanel);

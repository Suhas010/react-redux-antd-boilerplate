/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Collapse, Row, Col, Icon, Empty, Tooltip } from 'antd';
import { connect } from 'react-redux';
import QuestionModel from '../../../models/AppModel/Questions';

const { Panel } = Collapse;

class QuestionPanel extends Component {
  getQuestionOptions = options => options.map((option, index) => (
    <Col span={6}>
      <div className="q-label">{`Option ${index + 1}`}</div>
      <div className="q-data">{option.body}</div>
    </Col>
  ));

  getQuestionsDetails = (type, options) => {
    if (type === 0 || type === 1) {
      return (
        <Row>
          {this.getQuestionOptions(options)}
        </Row>
      );
    }
    return null;
  }

  getQuestions = () => {
    const { questions, history, match } = this.props;
    const { params } = match;
    return questions.map(({
      id, body, type, options,
    }) => (
      <Panel header={body} key={id}>
        <div className="question-body">
          <Row className="edit-button">
            <Tooltip connect="Edit Question">
              <Icon type="edit" onClick={() => history.push(`/admin/dashboard/${params.targetID}/questions/edit/${id}`)} />
            </Tooltip>
          </Row>
          {this.getQuestionsDetails(
            type,
            options,
          )}
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

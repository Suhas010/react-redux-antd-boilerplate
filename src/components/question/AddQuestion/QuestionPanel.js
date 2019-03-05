/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Collapse, Row, Col, Icon, Empty, Tooltip } from 'antd';
import { connect } from 'react-redux';
import QuestionModel from '../../../models/AppModel/Questions';

const { Panel } = Collapse;

class QuestionPanel extends Component {
  getQuestionOptions = options => options.map((option, index) => (
    <Col span={3}>
      <div className="q-label">{`Option ${index + 1}`}</div>
      <div className="q-data">{option.body}</div>
    </Col>
  ));

  getQuestionsDetails = (type, options) => {
    const ifOptions = type === 0 || type === 1;
    return (
      <>
        {ifOptions && (
          <Row>
            {this.getQuestionOptions(options)}
          </Row>
        )
        }
      </>
    );
  }

  getQuestionStatus = ({
    updated_at, difficulty_level, status, tags,
  }) => {
    console.log(updated_at, difficulty_level, status, tags, "##");
     
  }

  getQuestions = () => {
    const { questions, history, match } = this.props;
    const { params } = match;
    return questions.map(({
      id, body, type, options, ...rest
    }) => (
      <Panel header={body} key={id}>
        <div className="question-body">
          <Row className="edit-button">
            <Tooltip connect="Edit Question">
              <Icon type="edit" onClick={() => history.push(`/dashboard/${params.targetID}/questions/edit/${id}`)} />
            </Tooltip>
          </Row>
          {this.getQuestionStatus(rest)}
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

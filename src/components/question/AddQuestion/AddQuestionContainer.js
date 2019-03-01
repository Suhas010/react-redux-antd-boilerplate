/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Collapse, Button, Tooltip, Row, Col } from 'antd';
import QuestionModel from '../../../models/AppModel/Questions';
import TargetGroupModel from '../../../models/AppModel/TargetGroup';
import AddQuestionForm from './AddQuestionForm';
import TargetGroupAffix from './TargetGroupAffix';
import './AddQuestions.scss';
import routes from '../../../utils/routes';

const { Panel } = Collapse;

class AddQuestionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addQuestion: false,
    };
  }

  componentWillMount() {
    const { match } = this.props; 
  }

  handleAddQuestionClick = (mode) => {
    const { history, match } = this.props;
    console.log(mode)
    if (mode === 'Add') {
      history.push(`/dashboard/${match.params.targetID}/questions/add`);
      return 0;
    }
    history.push(`/dashboard/${match.params.targetID}/questions/edit/${123}`);
  }

  handleBackClick = () => {
    const { history } = this.props;
    history.push(routes.targetGroupList);
  }

  getAddBackButtons = () => (
    <div className="buttons">
      <div>
        <Tooltip title="Target Group">
          <Button
            onClick={this.handleBackClick}
            icon="arrow-left"
          />
        </Tooltip>
      </div>
      <div>
        <Tooltip title="Add question">
          <Button
            onClick={() => this.handleAddQuestionClick('Add')}
            icon="plus"
          />
        </Tooltip>
      </div>
    </div>
  );

  getQuestionList = () => (
    <>
      <Panel header="How's the Josh ?" key="1">
        <div className="question-body">
          <Row className="edit-button">
            <Button icon="edit" onClick={() => this.handleAddQuestionClick('Edit')} />
          </Row>
          <Row>
            <Col span={4}>
              <div className="data-container">
                <div className="label">Option 1</div>
                <div className="value">High Sir</div>
              </div>
            </Col>
            <Col span={4} offset={1}>
              <div className="data-container">
                <div className="label">Option 1</div>
                <div className="value">High Sir</div>
              </div>
            </Col>
            <Col span={4} offset={1}>
              <div className="data-container">
                <div className="label">Option 1</div>
                <div className="value">High Sir</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <div className="data-container">
                <div className="label">Difficulty</div>
                <div className="value">Medium</div>
              </div>
            </Col>
          </Row>
        </div>
      </Panel>
    </>
  )

  getAffix = () => <TargetGroupAffix />

  getQuestions = () => (
    <div className="questions">
      <Collapse bordered={false}>
        {this.getQuestionList()}
      </Collapse>
    </div>
  )

  render() {
    const { addQuestion } = this.state;

    return (
      <div
        className="question-container"
      >
        {this.getAffix()}
        {this.getAddBackButtons(addQuestion)}
        { this.getQuestions()}
      </div>
    );
  }
}

export default AddQuestionContainer;

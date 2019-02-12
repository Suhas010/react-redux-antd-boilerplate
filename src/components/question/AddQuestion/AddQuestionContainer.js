import React, { Component } from 'react';
import { Affix, Collapse, Button, Tooltip, Row, Col } from 'antd';
import QuestionModel from '../../../models/AppModel/Questions';
import TargetGroupModel from '../../../models/AppModel/TargetGroup';
import AddQuestionForm from './AddQuestionForm';
import './AddQuestions.scss';

const Panel = Collapse.Panel;

const text = (
  <p style={{ paddingLeft: 24 }}>
    A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households across
    the world.
  </p>
);

class AddQuestionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addQuestion: false,
    };
  }

  componentWillMount() {
    const { location, history } = this.props;
    console.log(location, 'lll', location.pathname.split('/')[3]);
    if (!location) {
      history.push('/dashboard/target-groups');
    }
    this.setState({
      data: TargetGroupModel.get(location.pathname.split("/")[3]),
    });
    QuestionModel.saveAll(
      ["Q1", "Q2", "Q3", "Q4"].map(item => new QuestionModel(item))
    );
  }

  getAddQuestionForm = (mode = 'Add') => (
    <AddQuestionForm handleCancelClick={this.handleCancelForm} mode={mode} />
  )

  handleCancelForm = () => {
    this.setState({
      addQuestion: false,
    });
  }

  handleAddQuestionClick = (mode) => {
    this.setState({
      addQuestion: true,
      mode,
    });
  }

  handleBackClick = () => {
    const {history} = this.props;
    history.push('/dashboard/target-groups');
  }

  getAffix = addQuestion => (
    <div style={{ display: 'flex'}}>
      <div className="bacl">
        <Tooltip title="Target Group">
          <Button
            onClick={this.handleBackClick}
            icon="arrow-left"
          />
        </Tooltip>
      </div>
      <div className="target-group">
        <Row className="header">
          Target Group
        </Row>
        <Row className="center">
          <Col span={6} offset={6}>
            <label>Gender</label>
            <value>Male</value>
          </Col>
          <Col span={6} offset={1}>
            <label>Age</label>
            <value>1 to 14</value>
          </Col>
        </Row>
        <Row className="center">
          <Col span={6} offset={6}>
            <label>Region</label>
            <value>Yes</value>
          </Col>
          <Col span={3} offset={1}>
            <label>Contry</label>
            <value>India</value>
          </Col>
        </Row>
        <Row>
          <Col span={6} offset={6}>
            <label>State</label>
            <value>Maharashtra</value>
          </Col>
          <Col span={3} offset={1}>
            <label>City</label>
            <value>Pune</value>
          </Col>
        </Row>
      </div>
      {!addQuestion && (
        <div className="bacl">
          <Tooltip title="Add question">
            <Button
              onClick={() => this.handleAddQuestionClick('Add')}
              icon="plus"
            />
          </Tooltip>
        </div>
      )
      }
    </div>
  );

  getQuestionList = () => (
    <>
      <Panel header="How's the Josh ?" key="1">
        <div className="question-body">
          <Row className="edit-button">
            <Button icon="edit" onClick={this.handleAddQuestionClick}/>
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
                <div className="label">Category</div>
                <div className="value">Select</div>
              </div>
            </Col>
            <Col span={4} offset={1}>
              <div className="data-container">
                <div className="label">Sub-Category</div>
                <div className="value">Sub Cate</div>
              </div>
            </Col>
            <Col span={4} offset={1}>
              <div className="data-container">
                <div className="label">Difficulty</div>
                <div className="value">Medium</div>
              </div>
            </Col>
          </Row>
        </div>
      </Panel>
      <Panel header="Hows the Josh?" key="2">
        {text}
      </Panel>
    </>
  )

  getQuestions = () => (
    <div className="questions">
      <Collapse bordered={false} defaultActiveKey={['1']}>
        {this.getQuestionList()}
      </Collapse>
    </div>
  )

  render() {
    const { addQuestion, mode } = this.state;

    return (
      <div
        className="question-container"
        ref={(node) => {
          this.container = node;
        }}
      >
        {this.getAffix(addQuestion)}
        {addQuestion && this.getAddQuestionForm(mode)}
        {!addQuestion && this.getQuestions()}
      </div>
    );
  }
}

export default AddQuestionContainer;

import React, { Component } from 'react';
import { Affix, Collapse, Button, Tooltip, Row, Col } from 'antd';
import QuestionModel from '../../../models/AppModel/Questions';
import TargetGroupModel from '../../../models/AppModel/TargetGroup';
import AddQuestionForm from './AddQuestionForm';
import './AddQuestions.scss';

const { Panel } = Collapse;

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

  getAddBackButtons = addQuestion => (
    <div className="buttons">
      <div>
        <Tooltip title="Target Group">
          <Button
            onClick={this.handleBackClick}
            icon="arrow-left"
          />
        </Tooltip>
      </div>
      {!addQuestion && (
        <div>
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
                <div className="label">Difficulty</div>
                <div className="value">Medium</div>
              </div>
            </Col>
          </Row>
        </div>
      </Panel>
    </>
  )

  getAffix = () => (
    <div className="target-group">
      <div>
        <div className="tg-label">Category</div>
        <div className="tg-data">Media</div>
      </div>
      <div>
        <div className="tg-label">Sub-Category</div>
        <div className="tg-data">Movies</div>
      </div>
      <div>
        <div className="tg-label">Gender</div>
        <div className="tg-data">Male</div>
      </div>
      <div>
        <div className="tg-label">Age</div>
        <div className="tg-data">1 to 14</div>
      </div>
      <div>
        <div className="tg-label">Region</div>
        <div className="tg-data">Yes</div>
      </div>
      <div>
        <div className="tg-label">Contry</div>
        <div className="tg-data">India</div>
      </div>
      <div>
        <div className="tg-label">State</div>
        <div className="tg-data">Maharashtra</div>
      </div>
      <div>
        <div className="tg-label">City</div>
        <div className="tg-data">Pune</div>
      </div>
    </div>
  )

  getQuestions = () => (
    <div className="questions" onScroll={() => console.log('$$  ')}>
      <Collapse bordered={false}>
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
        {this.getAffix()}
        {this.getAddBackButtons(addQuestion)}
        {addQuestion && this.getAddQuestionForm(mode)}
        {!addQuestion && this.getQuestions()}
      </div>
    );
  }
}

export default AddQuestionContainer;

/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Button, Tooltip, BackTop, Skeleton } from 'antd';
import { connect } from 'react-redux';
import QuestionModel from '../../models/AppModel/Questions';
import { getQuestions } from '../../actions/appActions/QuestionActions';
import TargetGroupDetails from '../targetGroup/TargetGroupDetails';
import QuestionDetails from './QuestionDetails';
import './Question.scss';
import routes from '../../utils/routes';


class QuestionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addQuestion: false,
      questionLoading: false,
    };
  }

  componentWillMount() {
    const { match } = this.props;
    this.setLoader('questionLoading', true);
    getQuestions(match.params.targetID)
      .then((payload) => {
        this.setLoader('questionLoading', false);
        QuestionModel.saveAll(payload.questions.map(question => new QuestionModel(question)));
      })
      .catch((e) => {
        this.setLoader('questionLoading', false);
        // console.log(e);
      });
  }

  setLoader = (type, value) => {
    this.setState({
      [type]: value,
    });
  }

  handleAddQuestionClick = () => {
    const { history, match } = this.props;
    history.push(`/admin/dashboard/${match.params.targetID}/questions/add`);
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
            onClick={this.handleAddQuestionClick}
            icon="plus"
          />
        </Tooltip>
      </div>
    </div>
  );

  getQuestionList = () => <QuestionDetails {...this.props} />;

  getAffix = () => <TargetGroupDetails />

  getQuestions = () => (
    <div className="questions">
      <div className="title">
        Questions List
      </div>
      {this.getQuestionList()}
    </div>
  )

  render() {
    const { addQuestion, questionLoading } = this.state;

    return (
      <div
        className="question-container"
      >
        <BackTop />
        {this.getAffix()}
        {this.getAddBackButtons(addQuestion)}
        {!questionLoading && this.getQuestions()}
        {questionLoading && <Skeleton active paragraph={{ row: 4 }} />}
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    questions: QuestionModel.list()[0] ? QuestionModel.list().map(item => item[1].props) : [],
  };
}


export default connect(mapStateToProps)(QuestionContainer);

/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Button, Tooltip, BackTop, Skeleton } from 'antd';
import { connect } from 'react-redux';
import QuestionModel from '../../models/AppModel/Questions';
import { getQuestions } from '../../actions/appActions/QuestionActions';
import TargetGroupDetails from '../targetGroup/TargetGroupDetails';
import QuestionDetails from './QuestionDetails';
import routes from '../../utils/routes';
import Filter from '../filter/index';
import { FILTERS } from '../../utils/constant';
import './Question.scss';


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
    QuestionModel.deleteAll();
    getQuestions(match.params.targetID, {})
      .then((payload) => {
        this.setLoader('questionLoading', false);
        QuestionModel.saveAll(payload.questions.map(question => new QuestionModel(question)));
      })
      .catch((e) => {
        this.setLoader('questionLoading', false);
        // console.log(e);
      });
  }

  componentWillUnmount() {
    QuestionModel.deleteAll();
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

  getQuestionList = () => (
    <QuestionDetails
      isSimilar={false}
      questions={this.props.questions}
      {...this.props}
    />
  );

  getAffix = () => <TargetGroupDetails />

  getQuestions = () => (
    <div className="questions">
      {/* <div className="header">
        Questions List
      </div> */}
      {this.getFilter()}
      {this.getQuestionList()}
    </div>
  );

  applyFilter = (filter = '') => {
    console.log('Question Filter', filter);
  }

  getFilter = () => (
    <Filter
      name={FILTERS.QUESTIONS}
      applyFilter={this.applyFilter}
      clearFilter={() => this.applyFilter()}
    />
  );

  render() {
    const { questionLoading } = this.state;

    return (
      <div
        className="question-container"
      >
        <BackTop />
        {this.getAffix()}
        {this.getAddBackButtons()}
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

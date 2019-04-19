/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Tooltip, BackTop, Skeleton } from 'antd';
import { connect } from 'react-redux';
import QuestionModel from '../../models/AppModel/Questions';
import { getQuestions } from '../../actions/appActions/QuestionActions';
import TargetGroupDetails from '../targetGroup/TargetGroupDetails';
import QuestionDetails from './QuestionDetails';
import routes from '../../utils/routes';
import Filter from '../filter/index';
import { FILTERS } from '../../utils/constant';
import JButton from '../reusable/JButton';
import './Question.scss';

const defaultFilter = {
  status: 'Draft',
};
const MAX_PER_PAGE = 1;
const CURRENT_PAGE = 1;

const defaultPagination = `?max_per_page=${MAX_PER_PAGE}&&page_number${CURRENT_PAGE}`;
class QuestionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionLoading: false,
      filter: defaultFilter,
      maxPerPage: MAX_PER_PAGE,
      currentPage: CURRENT_PAGE,
      totalPage: 0,
    };
  }

  componentWillMount() {
    this.getQuestionsAPI(this.state.filter);
  }

  componentWillUnmount() {
    QuestionModel.deleteAll();
  }

  getQuestionsAPI(filter, pagination = defaultPagination) {
    const { match } = this.props;
    this.setLoader('questionLoading', true);
    QuestionModel.deleteAll();
    getQuestions(match.params.targetID, { filter }, defaultPagination)
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
          <JButton
            onClick={this.handleBackClick}
            icon="arrow-left"
          />
        </Tooltip>
      </div>
      <div>
        <Tooltip title="Add question">
          <JButton
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

  getFilter = () => (
    <Filter
      name={FILTERS.QUESTIONS}
      applyFilter={this.applyFilter}
      clearFilter={() => this.applyFilter()}
    />
  );

  getQuestions = () => (
    <div className="questions">
      {/* <div className="header">
        Questions List
      </div> */}
      {this.getQuestionList()}
    </div>
  );

  applyFilter = (filter = defaultFilter) => {
    console.log(filter);
    this.getQuestionsAPI(filter);
  }

  render() {
    const { questionLoading } = this.state;

    return (
      <div
        className="question-container"
      >
        <BackTop />
        {this.getAffix()}
        {this.getAddBackButtons()}
        {this.getFilter()}
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

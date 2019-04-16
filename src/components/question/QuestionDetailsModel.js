/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import QuestionDetails from './QuestionDetails';
import './Question.scss';

class QuestionDetailsModal extends Component {
  getSimilarQuestions = () => (
    <QuestionDetails
      isSimilar
      questions={this.props.questions}
      selectedSimilarQuestion={this.props.selectedSimilarQuestion || ''}
    />
  );

  render = () => (
    <div className="body">
      {/* { && <Skeleton paragraph active />} */}
      {this.getSimilarQuestions()}
    </div>
  );
}

export default QuestionDetailsModal;

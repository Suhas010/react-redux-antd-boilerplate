/* eslint-disable react/destructuring-assignment */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'antd';
import ErrorBoundary from '../reusable/ErrorBoundary';


class SimilarQuestionPanel extends React.Component {
  getSimilarQuestions = () => {
    const { questions } = this.props;
    return (
      <div className="duplicate-container">
        <span className="header">Similar Questions</span>
        <>
          {questions.map(({ id, body }, index) => (
            <div className="q-container" key={id}>
              <span>{index + 1}</span>
              <div className="question">{body}</div>
            </div>
          ))}
        </>
        <Button
          onClick={this.props.handleViewDetailsClick}
          type="danger"
        >
          View Details
        </Button>
      </div>
    );
  }

  render = () => (
    <ErrorBoundary name="Show Similar Questions">
      {this.getSimilarQuestions()}
    </ErrorBoundary>
  );
}

export default SimilarQuestionPanel;

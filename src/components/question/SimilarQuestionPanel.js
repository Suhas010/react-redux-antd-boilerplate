/* eslint-disable react/destructuring-assignment */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React from 'react';
import { Tooltip, Button, Divider } from 'antd';
import ErrorBoundary from '../reusable/ErrorBoundary';


class SimilarQuestionPanel extends React.Component {
  getSimilarQuestions = () => {
    const { questions } = this.props;
    return (
      <div className="duplicate-container">
        <span className="header">Similar Questions</span>
        <Divider />
        <>
          {questions.map(({ id, body }, index) => (
            <div
              key={id}
              className="q-container"
              role="button"
              style={index%2===0 ? {background: '#f5d4a9'} : {background: '#ffe6c0'}}
              onClick={() => this.props.handleViewDetailsClick(id)}
            >
              <div className="question">{body}</div>
            </div>
          ))}
        </>
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

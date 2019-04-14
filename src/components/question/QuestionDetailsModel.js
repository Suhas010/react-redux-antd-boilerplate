/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuestionModel from '../../models/AppModel/Questions';
import QuestionDetails from './QuestionDetails';
import './Question.scss';
import { Skeleton } from 'antd';

class QuestionDetailsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }
  
  handleClick = () => {
    this.setState({
      visible: false,
    });
    this.props.handleClose();
  }

  getSimilarQuestions = () => {
    return (
      <QuestionDetails
        isSimilar
        questions={this.props.questions}
      />
    );
  }

  render = () => {
    const { questions } = this.props;
    return (
      <div className="body">
        {/* { && <Skeleton paragraph active />} */}
        {this.getSimilarQuestions()}
      </div>
    );
  }
}

export default QuestionDetailsModal;

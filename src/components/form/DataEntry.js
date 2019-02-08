import React, { Component } from 'react';
import { Card, Icon, Button, Tooltip } from '@blueprintjs/core';
import { connect } from 'react-redux';
import './DataEntry.scss';
import QuestionModel from '../../models/AppModel/Questions';
import TableWrapper from '../table/TableWrapper';
import { DATA } from '../../utils/constant';
import ATCOI_HEADER from '../table/Constants';
import QuestionForm from './QuestionForm';


class DataEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  componentDidMount() {
    // console.log(item);
    QuestionModel.saveAll(DATA.map(item => new QuestionModel(item)));
  }

  handleAddQuestionClick = () => {
    this.setState({
      isOpen: true,
    });
  }

  handleClose = () => {
    this.setState({
      isOpen: false,
    });
  }

  getQuestionForm = () => {
    if (this.state.isOpen) {
      return (
        <QuestionForm
          handleClose={this.handleClose}
          mode="Add"
        />
      );
    }
  }

  render() {
    return (
      <div className="question-container">
        {this.getQuestionForm()}
        <div className="add-question">
          <Card
            interactive
            elevation={2}
            className="card-container"
            style={{ padding: '0px' }}
          >
            <Tooltip content="Add question" >
              <Button
                icon="plus"
                className="card-container"
                onClick={this.handleAddQuestionClick}
              />
            </Tooltip>
          </Card>
        </div>
        <div className="table">
          <TableWrapper
            data={this.props.data}
            headers={ATCOI_HEADER}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps() {
  // QuestionModel.list().map(item => {
  //   console.log(item[1].props);
  // });
  return {
    data: QuestionModel.list()[0] && QuestionModel.list().map(item => item[1].props),
  };
}

export default connect(mapStateToProps)(DataEntry);

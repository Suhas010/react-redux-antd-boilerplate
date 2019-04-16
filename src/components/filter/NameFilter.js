/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import JInput from '../reusable/Input';
import { Button, Icon } from 'antd';

class NameFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  handleChange = ({ value }) => {
    this.setState({
      value,
    });
  }

  applyFilter = () => {
    this.setState({
      filterChanged: true,
    });
    this.props.applyFilter(this.state.value);
  }

  resetFilter = () => {
    this.props.clearFilter();
    this.setState({
      value: '',
    });
  }


  render() {
    const { value } = this.state;
    return (
      <>
        <JInput
          value={value}
          placeholder="Search..."
          onChange={({ target }) => this.handleChange(target)}
          labelClass="filter-label"
          label="Name"
        />
        <Button
          type="primary"
          onClick={this.applyFilter}
          disabled={this.state.filterChanged}
        >
          Search
        </Button>
        <Button
          type="primary"
          className="reset-filter"
          onClick={this.resetFilter}
        >
          <Icon type="undo" />
            Clear
        </Button>
      </>
    );
  }
}

export default NameFilter;

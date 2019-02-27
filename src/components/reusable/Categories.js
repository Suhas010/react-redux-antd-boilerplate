import React, { Component } from 'react';
import { Select } from 'antd';
import { getCategories } from '../../actions/appActions/AppConfigActions';
import { options } from '@amcharts/amcharts4/core';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      loading: true,
    };
  }

  componentWillMount() {
    getCategories()
      .then((data) => {
        this.setState({
          loading: false,
          categories: data.categories,
        });
      })
      .catch((e) => {
        this.setState({
          loading: false,
          categories: [],
        });
        console.log(e);
      });
  }

  render() {
    const { categories, loading } = this.state;
    return (
      <div className="labeled-input">
        <span
          style={{
            display: 'flex', top: '-11%', color: '#333333', fontSize: '14px', width: '192px', fontWeight: '500',
          }}
        >
          Categories
          <span style={{ color: 'red' }}>*</span>
        </span>
        <Select
          loading={loading}
          style={{ width: '100%' }}
        >
          {categories.map(option => <Select.Option value={option.id} key={`${option.id}${option.name}`}>{option.name}</Select.Option>)}
        </Select>
      </div>
    );
  }
}

export default Categories;

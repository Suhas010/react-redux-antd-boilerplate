/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Select } from 'antd';

class Categories extends Component {
  render() {
    const {
      categories, categoriesLoading, selectedCategory,
      subCategories, subcategoryLoading, selectedSubCategory,
      handleCategoryChange, handleSubCategoryChange, getSubCategories,
    } = this.props;
    return (
      <>
        <div className="labeled-input">
          <span
            className="filter-label"
          >
            Category
          </span>
          <Select
            categoriesLoading={categoriesLoading}
            style={{ width: '100%' }}
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categories.map(option => <Select.Option value={option.id} key={`${option.id}${option.name}`}>{option.name}</Select.Option>)}
          </Select>
        </div>
        <div className="labeled-input">
          <span
            className="filter-label"
          >
            Sub-Category
          </span>
          <Select
            loading={subcategoryLoading}
            style={{ width: '100%' }}
            value={selectedSubCategory}
            disabled={categories.length <= 1 ? true : subcategoryLoading}
            onFocus={() => getSubCategories(selectedCategory)}
            onChange={handleSubCategoryChange}
          >
            {subCategories.map(option => <Select.Option value={option.id} key={`${option.id}${option.name}`}>{option.name}</Select.Option>)}
          </Select>
        </div>
      </>
    );
  }
}

export default Categories;

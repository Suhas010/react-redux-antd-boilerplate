/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import Categories from '../reusable/Categories';
import JSelect from '../reusable/Select';
import JInput from '../reusable/Input';
import { getCategories, getSubCategories } from '../../actions/appActions/AppConfigActions';
import { getConfigFor } from '../../utils/commonFunctions';

const defaultCategory = { id: 'all', name: 'All' };

class TargetGroupFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: 0,
      minAge: 0,
      maxAge: 100,
      selectedCategory: 'all',
      selectedSubCategory: 'all',
      categoriesLoading: false,
      categories: [defaultCategory],
      subCategories: [defaultCategory],
      subcategoryLoading: false,
      applyingFilter: false,
      filterChanged: false,
    };
  }

  componentWillMount() {
    this.setState({
      categoriesLoading: true,
    });
    getCategories()
      .then((data) => {
        const { categories } = data;
        categories.push({ id: 'all', name: 'All' });
        categories.sort();
        this.setState({
          categoriesLoading: false,
          selectedSubCategory: 'all',
          categories,
        });
      })
      .catch((e) => {
        this.setState({
          categoriesLoading: false,
          categories: [],
        });
        console.log(e);
      });
  }

  getSubCategories = (id) => {
    if (id === 'all') return 0;
    this.setLoading('subcategoryLoading', true);
    getSubCategories(id)
      .then((payload) => {
        this.setLoading('subcategoryLoading', false);
        const subCategories = payload.subcategories;
        subCategories.push({ id: 'all', name: 'All' });
        this.setState({
          subCategories,
          selectedSubCategory: 'all',
        });
        return 0;
      }).catch(() => {
        this.setState({
          subCategories: [],
          subcategoryLoading: false,
        });
      });
  }

  setLoading = (type, value) => {
    this.setState({
      [type]: value,
    });
  }

  // Category
  handleCategoryChange = (value) => {
    if (value === 'all') {
      this.setState({
        selectedSubCategory: 'all',
        selectedCategory: value,
        filterChanged: false,
      });
      return 0;
    }
    this.setState({
      subCategories: [],
      selectedCategory: value,
      filterChanged: false,
    });
  }

  // Sub-Category
  handleSubCategoryChange = (selectedSubCategory) => {
    this.setState({
      selectedSubCategory,
      filterChanged: false,
    });
  }

  // Gender
  handleGenderChange = (gender) => {
    this.setState({
      gender,
      filterChanged: false,
    });
  }

  // Age
  handleAgeChange = (state, { target }) => {
    console.log(target.value, isNaN(target.value))
    if (isNaN(target.value) ||  target.value < 0 || target.value > 100) return 0;
    this.setState({
      [state]: target.value,
      filterChanged: false,
    });
  }

  // Apply filter
  applyFilter = () => {
    this.setState({
      filterChanged: true,
    });
    let filterString = '?';
    const { selectedCategory, selectedSubCategory, maxAge, minAge, gender } = this.state;
    if (selectedCategory !== 'all') {
      filterString = filterString.concat(`category_id=${selectedCategory}&`);
    }
    if (selectedSubCategory !== 'all') {
      filterString = filterString.concat(`subcategory_id=${selectedSubCategory}&`);
    }
    if (minAge > 0) {
      filterString = filterString.concat(`minimum_age=${minAge}&`);
    }
    if (maxAge < 100) {
      filterString = filterString.concat(`maximum_age=${maxAge}&`);
    }
    filterString = filterString.concat(`gender=${gender}`);
    this.props.applyFilter(filterString);
  }

  resetFilter = () => {
    this.props.clearFilter();
    this.setState({
      gender: 0,
      minAge: 0,
      maxAge: 100,
      selectedCategory: 'all',
      selectedSubCategory: 'all',
    });
  }

  render = () => (
    <>
      <Categories
        handleCategoryChange={this.handleCategoryChange}
        handleSubCategoryChange={this.handleSubCategoryChange}
        categories={this.state.categories}
        subCategories={this.state.subCategories}
        selectedCategory={this.state.selectedCategory}
        selectedSubCategory={this.state.selectedSubCategory}
        categoriesLoading={this.state.categoriesLoading}
        subcategoryLoading={this.state.subcategoryLoading}
        getSubCategories = {this.getSubCategories}
      />
      <JSelect
        label="Gender"
        labelClass="filter-label"
        options={getConfigFor('genders')}
        value={this.state.gender}
        onChange={this.handleGenderChange}
        style={{ width: '100%' }}
      />
      <JInput
        label="Min Age"
        labelClass="filter-label"
        value={this.state.minAge}
        type="number"
        onChange={value => this.handleAgeChange('minAge', value)}
      />
      <JInput
        label="Max Age"
        labelClass="filter-label"
        value={this.state.maxAge}
        type="number"
        onChange={value => this.handleAgeChange('maxAge', value)}
      />
      <Button
        type="primary"
        loading={this.state.applyingFilter}
        onClick={this.applyFilter}
        disabled={this.state.filterChanged}
      >
        Apply Filter
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

export default TargetGroupFilter;

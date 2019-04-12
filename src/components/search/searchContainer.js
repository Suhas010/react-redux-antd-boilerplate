import React, { Component } from 'react';
import { Input, Skeleton, Spin, Empty } from 'antd';
import QuestionModel from '../../models/AppModel/Questions';
import { fetchSearchData } from '../../actions/appActions/AppConfigActions';
import './search.scss';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
    };
  }

  componentDidMount() {
    QuestionModel.deleteAll();
  }

  componentWillUnmount() {
    QuestionModel.deleteAll();
  }

  getSearchResult = () => {
    this.setState({ loading: true });
    fetchSearchData('a448393c-6e91-4abc-b237-426cbf704291')
      .then((data) => {

        this.setState({
          data,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
      });
  }

  handleSearchClick = (search) => {
    if (!search) {
      return 0;
    }
    this.getSearchResult();
  }

  getSearchTextBox = loading => (
    <Input.Search
      placeholder="search"
      enterButton="Search"
      size="large"
      onSearch={value => this.handleSearchClick(value)}
      disabled={loading}
    />
  );

  getSearchData = () => {
    const { data } = this.state;
    if (!data || data.length === 0) {
      return (
        <Empty description="No records found" />
      );
    }
  }

  render() {
    const { loading } = this.state;
    return (
      <div className="search-container">
        {this.getSearchTextBox(loading)}
        {loading && <Spin size="large" />}
        {!loading && this.getSearchData()}
      </div>
    );
  }
}

export default Search;


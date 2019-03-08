/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import JLoader from '../reusable/Loader';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { getCategory } from '../../actions/appActions/AppConfigActions';

class CategoryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,
    });
    const { match } = this.props;
    if (match.params.categoryID) {
      getCategory(match.params.categoryID)
        .then((payload) => {
          this.setState({
            name: payload.category.name,
            loading: false,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }

  }

  render() {
    const { loading, name } = this.state;
    const CategoryContainer = styled.div`
      background: #001529cf;
      color: white;
      font-weight: 600;
      text-align: center;
      margin: 0% 32%;
      position: fixed;
      display: flex;
      flex-direction: column;
      width: 15%;
      top: 3%;
      border-radius: 14px;
    `;

    return (
      <CategoryContainer>
        {!loading && (
          <>
            <div style={{ fontWeight: 400, fontSize: 12 }}>
              Category Name
            </div>
            <div className="data">
              {name}
            </div>
          </>
        )}
        {loading && <JLoader size="small" text="" /> }
      </CategoryContainer>
    );
  }
}

export default withRouter(CategoryDetails);


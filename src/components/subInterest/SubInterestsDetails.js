/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import JLoader from '../reusable/Loader';
import { getInterests } from '../../actions/appActions/InterestActions';

class SubInterestDetails extends Component {
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
      getInterests(match.params.interestID)
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
    const InterestContainer = styled.div`
        background: #8f8f90;
        color: white;
        font-weight: 600;
        text-align: center;
        margin: 0% 30%;
        position: fixed;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        padding: 2px 37px;
        width: 20%;
        top: 3%;
        border-radius: 14px;
        font-size: 12px;
        justify-content: center;
    `;

    return (
      <InterestContainer>
        {!loading && (
          <>
            <div style={{ fontWeight: 400, fontSize: 12 }}>
              Interest Name :&nbsp;
            </div>
            <div className="data">
              {` ${name}`}
            </div>
          </>
        )}
        {loading && <JLoader size="small" text="" /> }
      </InterestContainer>
    );
  }
}

export default withRouter(SubInterestDetails);


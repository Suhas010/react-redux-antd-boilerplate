import React, { Component } from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
`;

class Filter extends Component {
  constructor(props) {
    super(props);
  }

  getFilter = () => {
    // const { filterName } = this.props.filterName;
    // switch(filterN)
    return (<>{this.props.name}</>);
  }

  render = () => (
    <FilterContainer>
      {this.getFilter()}
    </FilterContainer>
  )
}

export default Filter;

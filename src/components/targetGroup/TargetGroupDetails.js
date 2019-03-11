/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TargetGroupModel from '../../models/AppModel/TargetGroup';
import { getTargetGroup } from '../../actions/appActions/TargetGroupAction';
import JLoader from '../reusable/Loader';

class TargetGroupDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentWillMount() {
    const { match } = this.props;
    if (TargetGroupModel.list().length > 0) {
      this.setTargetGroupData(TargetGroupModel.get(match.params.targetID).props);
      return 0;
    }
    getTargetGroup(match.params.targetID)
      .then((payload) => {
        this.setTargetGroupData(payload.target_group);
        this.setState({
          loading: false,
        });
        new TargetGroupModel(payload.target_group).$save();
      }).catch(() => {
        this.setState({
          loading: false,
        });
      });
    return 0;
  }

  setTargetGroupData = ({
    tier, city, state, country, category, subcategory, gender, maximum_age, minimum_age,
  }) => {
    this.setState({
      gender,
      state,
      country,
      city,
      subcategory,
      category,
      tier,
      minAge: minimum_age,
      maxAge: maximum_age,
      region: false,
      loading: false,
    });
  }

  getTargetGroupAffix = ({
    gender, subcategory, category, minAge,
    maxAge, state, country, city, region, tier,
  }) => (
    <>
      <div>
        <div className="tg-label">Category</div>
        <div className="tg-data">{category.name}</div>
      </div>
      <div>
        <div className="tg-label">Sub-Category</div>
        <div className="tg-data">{subcategory.name || '-'}</div>
      </div>
      <div>
        <div className="tg-label">Gender</div>
        <div className="tg-data">{gender}</div>
      </div>
      <div>
        <div className="tg-label">Age Group</div>
        <div className="tg-data">{`${minAge} to ${maxAge}`}</div>
      </div>
      {/* <div>
        <div className="tg-label">Region Specific</div>
        <div className="tg-data">{region ? 'Yes' : 'No'}</div>
      </div> */}
      <div>
        <div className="tg-label">Country</div>
        <div className="tg-data">{country.name || 'NA'}</div>
      </div>
      <div>
        <div className="tg-label">State</div>
        <div className="tg-data">{state.name || 'NA'}</div>
      </div>
      <div>
        <div className="tg-label">City</div>
        <div className="tg-data">{city.name || 'NA'}</div>
      </div>
      <div>
        <div className="tg-label">Tier</div>
        <div className="tg-data">{tier.name || 'NA'}</div>
      </div>
    </>
  )

  render = () => (
    <div className="question-container">
      <div className="target-group">
        {!this.state.loading && this.getTargetGroupAffix(this.state)}
        <span>{this.state.loading && <JLoader size="small" text="" />}</span>
      </div>
    </div>
  )
}

export default withRouter(TargetGroupDetails);

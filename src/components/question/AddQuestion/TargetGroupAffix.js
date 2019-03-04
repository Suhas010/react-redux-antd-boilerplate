/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TargetGroupModel from '../../../models/AppModel/TargetGroup';
import { getTargetGroup } from '../../../actions/appActions/TargetGroupAction';
import JLoader from '../../reusable/Loader';
import { getGender } from '../../../utils/commonFunctions';

class TargetGroupAffix extends Component {
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
        new TargetGroupModel(payload.target_group).$save();
      }).catch(() => {
        // this.setLoading('loading', false);
      });
    return 0;
  }

  setTargetGroupData = ({
    city_id, state_id, country_id, category_id, subcategory_id, gender, maximum_age, minimum_age,
  }) => {
    this.setState({
      gender,
      subcategory: 'subcategory_id',
      category: 'category_id',
      minAge: minimum_age,
      maxAge: maximum_age,
      state: state_id,
      country: country_id,
      city: city_id,
      region: false,
      loading: false,
    });
  }

  getTargetGroupAffix = ({
    gender, subcategory, category, minAge,
    maxAge, state, country, city, region,
  }) => (
    <>
      <div>
        <div className="tg-label">Category</div>
        <div className="tg-data">{category}</div>
      </div>
      <div>
        <div className="tg-label">Sub-Category</div>
        <div className="tg-data">{subcategory}</div>
      </div>
      <div>
        <div className="tg-label">Gender</div>
        <div className="tg-data">{getGender(gender)}</div>
      </div>
      <div>
        <div className="tg-label">Age</div>
        <div className="tg-data">{`${minAge} to ${maxAge}`}</div>
      </div>
      <div>
        <div className="tg-label">Region</div>
        <div className="tg-data">{region ? 'Yes' : 'No'}</div>
      </div>
      <div>
        <div className="tg-label">Country</div>
        <div className="tg-data">{country || 'NA'}</div>
      </div>
      <div>
        <div className="tg-label">State</div>
        <div className="tg-data">{state || 'NA'}</div>
      </div>
      <div>
        <div className="tg-label">City</div>
        <div className="tg-data">{city || 'NA'}</div>
      </div>
    </>
  )

  render = () => (
    <div className="target-group">
      {!this.state.loading && this.getTargetGroupAffix(this.state)}
      <span>{this.state.loading && <JLoader size="small" text="" />}</span>
    </div>
  )
}

export default withRouter(TargetGroupAffix);

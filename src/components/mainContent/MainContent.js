/* eslint-disable react/prop-types */
import React, { Suspense } from 'react';
import {
  Route, Switch, Redirect,
} from 'react-router-dom';
import { Skeleton } from 'antd';

import routes from '../../utils/routes';
import { showWarningNotification } from '../reusable/Notifications';


function isAuthenticated() {
  if (true) {
    return true;
  }
  return false;
}

function getComponent({ location, ...rest }, Component) {
  if (isAuthenticated()) {
    const props = { location, ...rest };
    return <Component {...props} />;
  }
  showWarningNotification('Authentication Failed. Redirecting to login page.');
  return (
    <>
      <Redirect
        to={{
          pathname: routes.root,
          state: { from: location },
        }}
      />
    </>
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  return <Route {...rest} render={props => getComponent(props, Component)} />;
}

const MainContent = () => (
  <Suspense fallback={<Skeleton active paragraph />}>
    <Switch>
      <PrivateRoute path="/dashboard" component={() => <div>Test Component</div>} />
      {/* <Redirect to={routes.targetGroupList} /> */}
      {/* <PrivateRoute component={NoMatch} /> */}
    </Switch>
  </Suspense>
);

export default MainContent;

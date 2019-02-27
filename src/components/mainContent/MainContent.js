/* eslint-disable react/prop-types */
import React from 'react';
import {
  Route, Switch, Redirect,
} from 'react-router-dom';
import NoMatch from '../app/NoMatch';
import TargetGroup from '../question';
import AddQuestions from '../question/AddQuestion/AddQuestionContainer';
import Dashboard from '../dashboard/Dashboard';
import TargetGroupForm from '../question/TargetGroup/TargetGroupForm';
import routes from '../../utils/routes';
import { getItem } from '../helpers/localStorage';

function isAuthenticated() {
  if (getItem('user')) {
    console.log('true');
    return true;
  }
  return true;
}

function getComponent({ location, ...rest }, Component) {
  if (isAuthenticated()) {
    const props = { location, ...rest };
    return <Component {...props} />;
  }
  return (
    <Redirect
      to={{
        pathname: '/',
        state: { from: location },
      }}
    />
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  return <Route {...rest} render={props => getComponent(props, Component)} />;
}

const MainContent = () => (
  <Switch>
    <PrivateRoute exact path={routes.dashboard} component={Dashboard} />
    <PrivateRoute exact path={routes.targetGroup} component={TargetGroup} />
    <PrivateRoute exact path={routes.targetGroupAdd} component={TargetGroupForm} />
    <PrivateRoute exact path={routes.targetGroupEdit} component={TargetGroupForm} />
    <PrivateRoute exact path={routes.questionAdd} component={AddQuestions} />
    <PrivateRoute component={NoMatch} />
  </Switch>
);

export default MainContent;

import React from 'react';
import {
  Route, Switch, Redirect,
} from 'react-router-dom';
import NoMatch from '../app/NoMatch';
import TargetGroup from '../question';
import AddQuestions from '../question/AddQuestion/AddQuestionContainer';
import Dashboard from '../dashboard/Dashboard';
import TargetGroupForm from '../question/TargetGroup/TargetGroupForm';

function isAuthenticated() {
  if (localStorage.getItem('user')) {
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
    <PrivateRoute exact path="/dashboard" component={Dashboard} />
    <PrivateRoute exact path="/dashboard/target-groups" component={TargetGroup} />
    <PrivateRoute exact path="/dashboard/target-groups/edit/:id" component={TargetGroupForm} />
    <PrivateRoute exact path="/dashboard/target-groups/add" component={TargetGroupForm} />
    <PrivateRoute exact path="/dashboard/:id/add-question/" component={AddQuestions} />
    <PrivateRoute component={NoMatch} />
  </Switch>
);

export default MainContent;

/* eslint-disable react/prop-types */
import React from 'react';
import {
  Route, Switch, Redirect,
} from 'react-router-dom';
import TargetGroup from '../targetGroup/TargetGroupContainer';
import QuestionContainer from '../question/QuestionContainer';
import TargetGroupForm from '../targetGroup/TargetGroupForm';
import routes from '../../utils/routes';
import { getItem } from '../helpers/localStorage';
import QuestionForm from '../question/QuestionForm';
import CategoriesContainer from '../categories';
import CategoryForm from '../categories/CategoryForm';
import SubCategoryContainer from '../subCategories/SubCategoriesContainer';
import SubCategoryForm from '../subCategories/SubCategoryForm';

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
    {/* <PrivateRoute exact path={routes.dashboard} component={Dashboard} /> */}
    
    <PrivateRoute exact path={routes.targetGroupList} component={TargetGroup} />
    <PrivateRoute exact path={routes.targetGroupAdd} component={TargetGroupForm} />
    <PrivateRoute exact path={routes.targetGroupEdit} component={TargetGroupForm} />
    
    <PrivateRoute exact path={routes.questionList} component={QuestionContainer} />
    <PrivateRoute exact path={routes.questionAdd} component={QuestionForm} />
    <PrivateRoute exact path={routes.questionEdit} component={QuestionForm} />

    <PrivateRoute exact path={routes.categoriesList} component={CategoriesContainer} />
    <PrivateRoute exact path={routes.categoriesAdd} component={CategoryForm} />
    <PrivateRoute exact path={routes.categoriesEdit} component={CategoryForm} />
    
    <PrivateRoute exact path={routes.subCategoriesList} component={SubCategoryContainer} />
    <PrivateRoute exact path={routes.subCategoriesAdd} component={SubCategoryForm} />
    <PrivateRoute exact path={routes.subCategoriesEdit} component={SubCategoryForm} />
    <Redirect to={routes.targetGroupList} />
    

    {/* <PrivateRoute component={NoMatch} /> */}
  </Switch>
);

export default MainContent;

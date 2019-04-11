/* eslint-disable react/prop-types */
import React, { lazy, Suspense } from 'react';
import {
  Route, Switch, Redirect,
} from 'react-router-dom';
import { Skeleton } from 'antd';

import routes from '../../utils/routes';
import { getItem } from '../helpers/localStorage';
import { showWarningNotification } from '../reusable/Notifications';

const TargetGroup = lazy(() => import('../targetGroup/TargetGroupContainer'));
const TargetGroupForm = lazy(() => import('../targetGroup/TargetGroupForm'));

const QuestionContainer = lazy(() => import('../question/QuestionContainer'));
const QuestionForm = lazy(() => import('../question/QuestionForm'));

const CategoriesContainer = lazy(() => import('../categories'));
const CategoryForm = lazy(() => import('../categories/CategoryForm'));

const SubCategoryContainer = lazy(() => import('../subCategories/SubCategoriesContainer'));
const SubCategoryForm = lazy(() => import('../subCategories/SubCategoryForm'));

const InterestsContainer = lazy(() => import('../interest'));
const InterestForm = lazy(() => import('../interest/InterestsForm'));

const SubInterestsContainer = lazy(() => import('../subInterest'));
const SubInterestForm = lazy(() => import('../subInterest/SubInterestsForm'));


const UserContainer = lazy(() => import('../user'));
const UserForm = lazy(() => import('../user/UserForm'));


function isAuthenticated() {
  if (getItem('token')) {
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

      <PrivateRoute exact path={routes.interestList} component={InterestsContainer} />
      <PrivateRoute exact path={routes.interestAdd} component={InterestForm} />
      <PrivateRoute exact path={routes.interestEdit} component={InterestForm} />

      <PrivateRoute exact path={routes.subInterestList} component={SubInterestsContainer} />
      <PrivateRoute exact path={routes.subInterestAdd} component={SubInterestForm} />
      <PrivateRoute exact path={routes.subInterestEdit} component={SubInterestForm} />


      <PrivateRoute exact path={routes.usersList} component={UserContainer} />
      <PrivateRoute exact path={routes.usersAdd} component={UserForm} />
      <PrivateRoute exact path={routes.usersEdit} component={UserForm} />

      <Redirect to={routes.targetGroupList} />
      

      {/* <PrivateRoute component={NoMatch} /> */}
    </Switch>
  </Suspense>
);

export default MainContent;

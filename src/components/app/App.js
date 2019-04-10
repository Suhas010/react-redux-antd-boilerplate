/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Alert, Skeleton } from 'antd';
import './App.scss';
import routes from '../../utils/routes';
import AppLayout from '../layout/AppLayout';
import DashBoardLayout from '../layout/DashBoardLayout';

const App = () => {
  const [online, changeStatus] = useState(true);

  useEffect(() => {
    window.addEventListener('online', () => {
      changeStatus(navigator.onLine);
    });
    window.addEventListener('offline', () => {
      changeStatus(navigator.onLine);
    });
  });

  return (
    <div className="App">
      <div className="online">
        {!online && <Alert message="Seems like you lost internet connection." type="error" showIcon closable />}
      </div>
      <Router>
        <div>
          <Route exact path="/" component={() => (<Redirect to={{ pathname: routes.root }} />)} />
          <Route exact path="/admin" component={AppLayout} />
          <Route path="/admin/dashboard" component={DashBoardLayout} />
        </div>
      </Router>
    </div>
  );
};

export default App;

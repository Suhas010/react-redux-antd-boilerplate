/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Alert } from 'antd';
import AppLayout from '../layout/AppLayout';
import DashBoardLayout from '../layout/DashBoardLayout';
import './App.scss';


const App = () => {
  const [online, changeStatus] = useState(true);
  
  function changeStatus(value) {
    online= value;
  }
  useEffect(()=> {
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
          <Route exact path="/" component={() => { window.location.href = '/admin' }} />
          <Route exact path="/admin" component={AppLayout} />
          <Route path="/admin/dashboard" component={DashBoardLayout} />
          {/* <Redirect to="/admin" /> */}
        </div>
      </Router>
    </div>
  );
};

export default App;

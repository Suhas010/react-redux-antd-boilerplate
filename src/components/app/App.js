import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import DashBoardLayout from '../layout/DashBoardLayout';
import './App.scss';


const App = () => (
  <div className="App">
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

export default App;

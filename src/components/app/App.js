import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AppLayout from '../layout/AppLayout';
import DashBoardLayout from '../layout/DashBoardLayout';
import './App.scss';

const App = () => (
  <div className="App">
    <Router>
      <div>
        <Route exact path="/" component={AppLayout} />
        <Route path="/dashboard" component={DashBoardLayout} />
      </div>
    </Router>
  </div>
);

export default App;

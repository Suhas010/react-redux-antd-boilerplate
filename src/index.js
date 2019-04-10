/* eslint-disable no-undef */
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Skeleton } from 'antd';
import { CookiesProvider } from 'react-cookie';
import store from './store/store';


const App = lazy(() => import('./components/app/App'));

ReactDOM.render(
  <Provider store={store}>
    <CookiesProvider>
      <Suspense fallback={<Skeleton active paragraph={4} />}>
        <App />
      </Suspense>
    </CookiesProvider>
  </Provider>,
  document.getElementById('root'),
);

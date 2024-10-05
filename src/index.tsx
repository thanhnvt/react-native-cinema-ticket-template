import React from 'react';
import {Provider} from 'react-redux';
import store from './stores';
import App from './App';

function AppRoot() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default AppRoot;

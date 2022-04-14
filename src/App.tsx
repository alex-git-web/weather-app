import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from './redux/rootReducer';
import thunk from 'redux-thunk'; // для работы с async events
import createSagaMiddleware from 'redux-saga'; // для работы с saga
import { Provider } from 'react-redux' // для связки Redux c React
import Navigation from './components/Navigation';
import { sagaWatcher } from './redux/saga/saga';

const saga = createSagaMiddleware(); // Redux saga

const store = createStore(rootReducer, compose(
  applyMiddleware(
    thunk, saga
  )
))

saga.run(sagaWatcher) // привязка watcher

const App: React.FC = () => {
  return ( 
    <Provider store={store}>
     <Navigation />
    </Provider>
  );
};

export default App

// install redux, react-redux, redux-thunk, redux-saga
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Component/App/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore , combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger';

import {takeEvery, put} from 'redux-saga/effects' // put is the name, takeEvery is listen
import createSagaMiddleware from 'redux-saga';

const reducerOne = (state= 0 , action) => {
  //console.log('in reducerOne: ', action);
  return state;
}

const reducerTwo = (state= "sdfsdf" , action) => {
  //console.log('in reducerTwo: ', action);
  if(action.type === 'test'){
    console.log('in reducer 2');
    state = 'tester'
  }
  return state;
}


//generator function
function*watcherSaga(){
//watcher is going to listen for Saga things
//generator function so we can do asynx stuff
//we will ues "yield" in these
yield takeEvery('test00', testSaga);
}//end watcher

function*testSaga(action){
  console.log('in testSaga',action);
}

const sagaMiddleware = createSagaMiddleware( watcherSaga );



const store = createStore(
  combineReducers({reducerOne,reducerTwo}),
  applyMiddleware(logger, sagaMiddleware) // second argument
  );


ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

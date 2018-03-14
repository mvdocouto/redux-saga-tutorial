import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import  createSagaMiddleware from 'redux-saga'

import Counter from './components/Counter'
import reducer from './reducers/reducers'
import rootSaga from './sagas/sagas'

const sagaMidleware = createSagaMiddleware()
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), 
  applyMiddleware(sagaMidleware)
)
sagaMidleware.run(rootSaga);

const action = type => store.dispatch({type})

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')}
      onIncrementAsync={() => action('INCREMENT_ASYNC')}/>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)

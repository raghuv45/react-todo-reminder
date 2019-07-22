import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import MainReducer from './reducers/MainReducer'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import thunkMiddleware from 'redux-thunk'

// const store = compose(window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore)(MainReducer)

const store = createStore(
  MainReducer,
  applyMiddleware(thunkMiddleware)
)

ReactDOM.render(<Provider store={store}>
<App />
</Provider>
, document.getElementById('root'));
registerServiceWorker();

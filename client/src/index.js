import  React from "react";
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { reducers } from './components/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
ReactDOM.render(
<Provider store={store}>
    <App />
  </Provider>,
    document.getElementById('root')
)
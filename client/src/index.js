import  React from "react";
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { reducers } from './components/reducers';

const store = createStore(reducers, compose(applyMiddleware(thunk)));
ReactDOM.render(
<Provider store={store}>
    <App />
  </Provider>,
    document.getElementById('root')
)
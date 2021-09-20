import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import MasterReducer from './redux/rootReducer';
import createSagaMiddleware from 'redux-saga';
import { Web3ReactProvider } from '@web3-react/core';
import { getLibrary } from './wallet/initializeWallet';
import './index.css';

const PROD = 'dev';

// create saga middleware
const sagaMiddleware = createSagaMiddleware();

const composeEnhancer =
  (PROD !== 'production' && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(MasterReducer, composeEnhancer(applyMiddleware(sagaMiddleware)));

// run the saga
// sagaMiddleware.run(myTestSaga);

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <Provider store={store}>
      <App />
    </Provider>
  </Web3ReactProvider>,
  document.getElementById('root')
);

reportWebVitals();

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Reactotron from '../config/reactotronConfig';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSagas';

const sagaMonitor = Reactotron.createSagaMonitor();
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
const store = createStore(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware), Reactotron.createEnhancer())
);
sagaMiddleware.run(rootSaga);

export default store;

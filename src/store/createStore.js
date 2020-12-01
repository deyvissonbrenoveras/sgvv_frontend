import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import Reactotron from '../config/reactotronConfig';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSagas';
import persistConfig from '../config/persistConfig';

const sagaMonitor = Reactotron.createSagaMonitor();
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  compose(applyMiddleware(sagaMiddleware), Reactotron.createEnhancer())
);
const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export { store, persistor };

import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

Reactotron.configure({ host: 'localhost' })
  .use(reactotronRedux())
  .use(sagaPlugin())
  .connect();

Reactotron.clear();

// eslint-disable-next-line no-console
console.tron = Reactotron;

export default Reactotron;

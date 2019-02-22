import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {persistStore, persistCombineReducers} from 'redux-persist';
import {AsyncStorage} from 'react-native';

import reducers from '../reducers';

const config = {
    key: 'root',
    storage: AsyncStorage,
};

const logger = createLogger();
const reducer = persistCombineReducers(config, reducers);

export default function configurationStore() {
    const store = createStore(reducer, {}, applyMiddleware(thunk, logger));

    let persistor = persistStore(store);
    persistor.purge();
    return {persistor, store};
}

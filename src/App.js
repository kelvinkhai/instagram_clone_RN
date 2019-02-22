import React, {Component} from 'react';
import {Platform, StatusBar, View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';

import configureStore from './store';
import AppNavigator from './navigations/AppNavigator';

class App extends Component {
    render() {
        const {persistor, store} = configureStore();
        return(
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <View style={styles.container}>
                        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                        <AppNavigator />
                    </View>
                </PersistGate>
            </Provider>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
}

export default App;

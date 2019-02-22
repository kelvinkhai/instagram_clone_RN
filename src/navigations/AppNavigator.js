import React, {Component} from 'react';
import {createSwitchNavigator, SafeAreaView, createAppContainer} from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import MainTabNavigator from './MainTabNavigator';

const Switch = createAppContainer(createSwitchNavigator({
    Auth: LoginScreen,
    Main: MainTabNavigator,
},{
    initialRouteName: 'Main',
}));

export default class AppNavigator extends Component {
    render() {
        return(
            <SafeAreaView style={{ flex: 1 }} forceInset={{ bottom: 'never' }}>
                <Switch />
            </SafeAreaView>
        );
    }
}

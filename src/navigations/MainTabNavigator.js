import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import {Text} from 'react-native-elements' ;
import Icon from 'react-native-vector-icons/Ionicons';
import TabBarIcon from '../components/TabBarIcon';
import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import PersonProfileScreen from '../screens/PersonProfileScreen';
import ChatListScreen from '../screens/ChatListScreen';
import CameraScreen from '../screens/CameraScreen';

import SearchScreen from '../screens/SearchScreen';
import UploadScreen from '../screens/UploadScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';

const HomeStack = createStackNavigator({
    home: {
        screen: HomeScreen,
        navigationOptions:({navigation}) => ({
            header: null,
        }),
    },
    personProfile: {
        screen: PersonProfileScreen,
        navigationOptions: ({navigation}) => ({
            header: null,
        }),
    },
    chatList: {
        screen: ChatListScreen,
        navigationOptions: ({navigation}) => ({
            header: null,
        }),
    }
});

const SearchStack = createStackNavigator({
    search: {
        screen: SearchScreen,
        navigationOptions:({navigation}) => ({
            header: null,
        }),
    }
});

const UploadStack = createStackNavigator({
    upload: {
        screen: UploadScreen,
        navigationOptions:({navigation}) => ({
            header: null,
        }),
    }
});

const NotificationStack = createStackNavigator({
    notification: {
        screen: NotificationScreen,
        navigationOptions:({navigation}) => ({
            header: null,
        }),
    }
});

const ProfileStack = createStackNavigator({
    profile: {
        screen: ProfileScreen,
        navigationOptions:({navigation}) => ({
            header: null,
        }),
    }
});

const MainTabNavigator = createBottomTabNavigator({
    home: {
        screen: HomeStack,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: <Text></Text>,
            tabBarIcon: ({focused}) => (
                <TabBarIcon name="home" />
            ),
        }),
    },
    search: {
        screen: SearchStack,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: ({focused}) => (
                <Text></Text>
            ),
            tabBarIcon: ({focused}) => (
                <TabBarIcon name="search" />
            ),
        }),
    },
    upload: {
        screen: UploadStack,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: ({focused}) => (
                <Text></Text>
            ),
            tabBarIcon: ({focused}) => (
                <TabBarIcon name="plus-square" />
            ),
        }),
    },
    notification: {
        screen: NotificationStack,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: ({focused}) => (
                <Text></Text>
            ),
            tabBarIcon: ({focused}) => (
                <TabBarIcon name="heart" />
            ),
        }),
    },
    profile: {
        screen: ProfileStack,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: ({focused}) => (
                <Text></Text>
            ),
            tabBarIcon: ({focused}) => (
                <TabBarIcon name="user" />
            ),
        }),
    },
});

export default MainTabNavigator;

import React, {Component} from 'react';
import {View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Text, Header, Avatar} from 'react-native-elements' ;

import * as actions from '../actions';
import TabBarIcon from '../components/TabBarIcon';
import Colors from '../constants/Colors';

class ProfileScreen extends Component {
    render() {

        const otherProfile = this.props.navigation.getParam('name', '');
        const name = otherProfile ? otherProfile : 'khaizeee';
        return(
            <View>
                <Header
                    leftComponent={otherProfile ? <TabBarIcon name='ios-arrow-back' type="ionicon" focused onPress={() => { this.props.navigation.goBack() }} /> : <TabBarIcon name='clock' focused />}
                    centerComponent={<Text style={{ fontWeight: '600', fontSize: 18 }}>{name}</Text>}
                    rightComponent={otherProfile ? <TabBarIcon name='more-horizontal' focused onPress={() => { this.props.navigation.goBack() }} /> : <TabBarIcon name='menu' focused />}
                    backgroundColor={Colors.backgroundColor}
                    outerContainerStyles={{height: 60}}
                />
                <ScrollView>
                </ScrollView>
            </View>
        );
    }
}

export default ProfileScreen;

import React, {Component} from 'react';
import {View, ScrollView, Image} from 'react-native';
import {Text, Header} from 'react-native-elements';
import {connect} from 'react-redux';

import * as actions from '../actions';
import Colors from '../constants/Colors';
import TabBarIcon from '../components/TabBarIcon';

class ChatListScreen extends Component {
    render() {
        return(
            <View>
                <Header
                    leftComponent={<TabBarIcon name='ios-arrow-back' type="ionicon" focused onPress={() => { this.props.navigation.goBack() }} />}
                    centerComponent={<Image resizeMode="cover" style={{height: '100%', width: 100}} source={require('../assets/logo.png')} />}
                    rightComponent={<TabBarIcon name='send' onPress={() => { this.props.navigation.navigate("chatList") }} />}
                    backgroundColor={Colors.backgroundColor}
                    outerContainerStyles={{height: 60}}
                />
                <ScrollView>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = ({chat}) => {
    return { ...chat };
}

export default connect(mapStateToProps, actions)(ChatListScreen);

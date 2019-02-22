import React, {Component} from 'react';
import {View, Image, Dimensions, TouchableOpacity} from 'react-native';
import {Text, Avatar} from 'react-native-elements';
import _ from 'lodash';
import { withNavigation } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import Colors from '../constants/Colors';

const WINDOW_WIDTH = Dimensions.get('window').width;

const postListView = (props) => {
    const { imageList, navigation, showActionSheet, likePhoto } = props;
    if(imageList && !_.isEmpty(imageList)) {
        const firstId = _.head(imageList)['id'];
        const lastId = _.last(imageList)['id'];
        return(
            <View>
                {
                    _.map(imageList, value => {
                        return(
                            <View style={{ flex: 1, paddingVertical: value['id'] == firstId ? 0 : 20, paddingBottom: value['id'] == lastId ? 100 : 0 }} key={ value['id'] } >
                                <View style={ styles.headerStyle }>
                                    <Avatar size="small" style={{ flex: 1 }} avatarStyle={ styles.avatarStyle } rounded source={{ uri: value['user']['profile_image']['medium'] }} onPress={ () => { navigation.navigate("personProfile", { username: value['user']['username'] }) } } />
                                    <Text style={ styles.usernameTextStyle } onPress={() => { navigation.navigate("personProfile", { username: value['user']['username'] }) }}>{ value['user']['username'] }</Text>
                                    <TabBarIcon name="more-horizontal" onPress={showActionSheet} style={{ flex: 1, alignSelf: 'flex-end' }} />
                                </View>
                                <Image resizeMode="cover" style={ styles.imageStyle } source={{ uri: value['urls']['regular'] }} />
                                <View style={ styles.likeCommentStyle }>
                                    <View style={ styles.leftIconStyle }>
                                        <TouchableOpacity style={styles.iconPaddingStyle}>
                                            <TabBarIcon name={ value['liked_by_user'] ? 'md-heart' : 'md-heart-empty' } type="ionicon" color={ value['liked_by_user'] ? Colors.heartActiveColor : Colors.iconColor } onPress={() => {likePhoto(value['id'])}} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.iconPaddingStyle}>
                                            <TabBarIcon name="message-circle" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.iconPaddingStyle}>
                                            <TabBarIcon name="send" />
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity style={ styles.rightIconStyle }>
                                        <TabBarIcon name="bookmark" style={{  alignSelf: 'flex-end' }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={ styles.likeStyle }>
                                    <TouchableOpacity style={{ paddingRight: 10 }}>
                                        <Text style={{ fontWeight: '600' }}>{ value['likes'] ? value['likes'] : 0 } likes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={ styles.descriptionStyle }>
                                        <Text><Text style={{ fontWeight: '600', paddingRight: 5 }}>{ value['user']['username'] }</Text> <Text style={{ paddingRight: 5}}>{ value['description'] }</Text></Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={ styles.commentStyle }>
                                    <Avatar size="small" style={{ flex: 1 }} avatarStyle={ styles.avatarStyle } rounded source={{uri: "https://instagram.fkul8-1.fna.fbcdn.net/vp/ee72d125a919f493b07164013f558fd8/5CCA3D10/t51.2885-19/s320x320/46007297_315978052461239_2936501623112859648_n.jpg?_nc_ht=instagram.fkul8-1.fna.fbcdn.net"}} />
                                    <Text style={ styles.addCommentStyle }>Add a comment...</Text>
                                </View>
                                <View style={ styles.timeStyle }>
                                    <Text style={ styles.timestampStyle }>1 HOURS AGO</Text>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        );
    }

    return (
        <View style={ styles.noPostStyle }>
            <Text>No Posts</Text>
        </View>
    );
}

const styles = {
    avatarStyle: {
        borderWidth: 1,
        borderColor: Colors.grey,
        borderTopLeftRadius: 1,
    },
    imageStyle: {
        width: WINDOW_WIDTH,
        height: WINDOW_WIDTH
    },
    usernameTextStyle: {
        paddingLeft: 10,
        flex: 1,
        fontWeight: '600',
        alignSelf: 'center'
    },
    headerStyle: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row'
    },
    likeCommentStyle: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row'
    },
    iconPaddingStyle: {
        paddingRight: 10
    },
    leftIconStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    rightIconStyle: {
        flex: 1,
        alignItems: 'flex-end'
    },
    likeStyle: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 15
    },
    commentStyle: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 15,
        flexDirection: 'row'
    },
    addCommentStyle: {
        paddingLeft: 10,
        flex: 1,
        fontWeight: '400',
        fontSize: 16,
        color: Colors.darkGrey,
        alignSelf: 'center'
    },
    descriptionStyle: {
        flex: 1,
        paddingRight: 10,
        paddingTop: 5
    },
    timeStyle: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 15
    },
    timestampStyle: {
        color: Colors.darkGrey,
        fontSize: 10
    },
    noPostStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
}

export default withNavigation(postListView);

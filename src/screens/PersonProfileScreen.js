import React, {Component} from 'react';
import {View, ScrollView, Image, TouchableOpacity, Dimensions} from 'react-native';
import {Text, Header, Avatar, Button, Divider} from 'react-native-elements' ;
import _ from 'lodash';
import {connect} from 'react-redux';
import ActionSheet from 'react-native-actionsheet'

import * as actions from '../actions';
import TabBarIcon from '../components/TabBarIcon';
import PostListView from '../components/PostListView';
import PostGridView from '../components/PostGridView';
import Colors from '../constants/Colors';

class PersonProfileScreen extends Component {

    componentDidMount() {
        const { orderBy } = this.props;
        const username = this.props.navigation.getParam('username', '');
        this.props.getUserProfile(username);
        this.props.getUserPhotos(username, orderBy);
    }

    componentWillUnmount() {
        this.props.unmountUserProfile();
    }

    showActionSheet = () => {
        this.ActionSheet.show()
    }

    likePhoto = photoId => {
        this.props.likePhoto(photoId);
    }

    renderActionSheet() {
        return(
            <ActionSheet
                ref={o => this.ActionSheet = o}
                options={[ "Share to Facebook", "Share to Messenger", "Share to Whatsapp", "Share to...", "Copy Link", "Turn on Post Notifications", "Report", "Mute", "Unfollow", "Cancel" ]}
                cancelButtonIndex={9}
                onPress={(index) => { /* do something here */ }}
            />
        );
    }

    renderImageList() {
        const { viewType, selectedProfileImage } = this.props;
        if(viewType == 'grid') {
            return <PostGridView imagesList={selectedProfileImage} />
        } else if(viewType == 'list') {
            return <PostListView imageList={selectedProfileImage} showActionSheet={this.showActionSheet} likePhoto={this.likePhoto}/>
        } else {

        }
    }

    render() {
        const { selectedProfile, selectedProfileImage, orderBy, page } = this.props;
        const username = this.props.navigation.getParam('username', '');
        if(selectedProfile){
            return(
                <View>
                    <Header
                        leftComponent={<TabBarIcon name='ios-arrow-back' type="ionicon" onPress={() => { this.props.navigation.goBack() }} />}
                        centerComponent={<TouchableOpacity onPress={ () => { this.refs.scrollRef.scrollTo({x: 0, y: 0, animated: true}) } }><Text style={{ fontWeight: '600', fontSize: 18 }}>{ selectedProfile.username }</Text></TouchableOpacity>}
                        rightComponent={<TabBarIcon name='more-horizontal' onPress={() => { this.props.navigation.goBack() }} />}
                        backgroundColor={Colors.backgroundColor}
                        outerContainerStyles={{height: 60}}
                    />
                    <ScrollView
                        ref="scrollRef"
                        onScroll={ ({nativeEvent}) => {
                            var windowHeight = Dimensions.get('window').height, height = nativeEvent.contentSize.height, offset = nativeEvent.contentOffset.y;
                            if( windowHeight + offset >= height ){
                                this.props.getUserPhotos(username, orderBy, page+1);
                            }
                        } }
                    >
                        <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 15, paddingHorizontal: 15 }}>
                            <Avatar
                                large
                                style={{ flex: 1 }}
                                avatarStyle={{ borderWidth: 1, borderColor: Colors.grey, borderTopLeftRadius: 1 }}
                                rounded
                                source={{ uri: selectedProfile.profile_image.large }}
                            />
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '600' }}>{ selectedProfile.total_photos }</Text>
                                        <Text style={{ textAlign: 'center', fontSize: 12, color: Colors.darkGrey }}>posts</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '600' }}>{ selectedProfile.followers_count }</Text>
                                        <Text style={{ textAlign: 'center', fontSize: 12, color: Colors.darkGrey }}>followers</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '600' }}>{ selectedProfile.following_count }</Text>
                                        <Text style={{ textAlign: 'center', fontSize: 12, color: Colors.darkGrey }}>followings</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', }}>
                                    <Button title="Follow" containerViewStyle={{flex: 6}} backgroundColor={Colors.buttonColor} buttonStyle={{ paddingVertical: 4 }} />
                                    <Button icon={{ name: 'md-arrow-dropdown', type: 'ionicon', style: { marginRight: 0 } }} containerViewStyle={{flex: 1}} backgroundColor={Colors.buttonColor} buttonStyle={{ paddingVertical: 4 }} />
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1, paddingVertical: 5, paddingHorizontal: 15, paddingBottom: 15 }}>
                            <Text style={{ fontWeight: '600' }}>{ selectedProfile.username }</Text>
                            <Text>{ selectedProfile.bio }</Text>
                        </View>
                        <Divider style={{ backgroundColor: Colors.grey }} />
                        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 10 }}>
                            <TouchableOpacity style={{ flex: 1 }}>
                                <TabBarIcon name='md-grid' type="ionicon" onPress={ () => { this.props.setViewType('grid') } } />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1 }}>
                                <TabBarIcon name='square' onPress={ () => { this.props.setViewType('list') } } />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1 }}>
                                <TabBarIcon name='user' />
                            </TouchableOpacity>
                        </View>
                        <Divider style={{ backgroundColor: Colors.grey }} />
                        {this.renderImageList()}
                        {this.renderActionSheet()}
                    </ScrollView>
                </View>
            );
        }

        return(<View></View>);
    }
}

const mapStateToProps = ({person}) => {
    return { ...person };
};

export default connect(mapStateToProps, actions)(PersonProfileScreen);

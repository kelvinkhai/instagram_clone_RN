import React, {Component} from 'react';
import {View, Image, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Header} from 'react-native-elements';
import ActionSheet from 'react-native-actionsheet'

import * as actions from '../actions';
import TabBarIcon from '../components/TabBarIcon';
import PostListView from '../components/PostListView';
import Colors from '../constants/Colors';

class HomeScreen extends Component {

    componentDidMount() {
        const { orderBy } = this.props;
        this.props.getPhotos(orderBy);
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

    render() {
        const { imageList, page, orderBy } = this.props;
        return(
            <View>
                <Header
                    leftComponent={<TabBarIcon name='camera' />}
                    centerComponent={<TouchableOpacity onPress={ () => { this.refs.scrollRef.scrollTo({x: 0, y: 0, animated: true}) } }><Image resizeMode="cover" style={{height: '100%', width: 100}} source={require('../assets/logo.png')} /></TouchableOpacity>}
                    rightComponent={<TabBarIcon name='send' onPress={() => { this.props.navigation.navigate("chatList") }} />}
                    backgroundColor={Colors.backgroundColor}
                    outerContainerStyles={{height: 60}}
                />
                <ScrollView
                    ref="scrollRef"
                    onScroll={ ({nativeEvent}) => {
                        var windowHeight = Dimensions.get('window').height, height = nativeEvent.contentSize.height, offset = nativeEvent.contentOffset.y;
                        if( windowHeight + offset >= height ){
                            this.props.getPhotos(orderBy, page+1);
                        }
                    } }
                >
                    <PostListView imageList={imageList} showActionSheet={this.showActionSheet} likePhoto={this.likePhoto} />
                    {this.renderActionSheet()}
                </ScrollView>
            </View>
        );
    }
}

const styles = {
}

const mapStateToProps = ({photo}) => {
    return { ...photo };
};

export default connect(mapStateToProps, actions)(HomeScreen);

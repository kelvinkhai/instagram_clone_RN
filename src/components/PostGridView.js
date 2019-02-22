import React, {Component} from 'react';
import {View, Image, Dimensions} from 'react-native';
import _ from 'lodash';
import { withNavigation } from 'react-navigation';

const WINDOW_WIDTH = Dimensions.get('window').width;
const IMAGE_PER_ROW = 3;

class PostGridView extends Component {
    calculateSize() {
        const size = WINDOW_WIDTH / IMAGE_PER_ROW;
        return { width: size, height: size, margin: 1};
    }

    renderRow(imagesRow) {
        if(imagesRow) {
            return (
                _.map(imagesRow, value => {
                    return(
                        <Image key={value.id} style={[this.calculateSize()]} resizeMode="cover" source={{ uri: value.urls.regular }} />
                    );
                })
            )
        }
        return (<View></View>);
    }

    render() {
        const { imagesList } = this.props;
        const chunkImages = _.chunk(imagesList, IMAGE_PER_ROW);
        const lastIndex = _.findLastKey(chunkImages);

        return chunkImages.map((imagesRow,i) => {
            return (
                <View key={i} style={{ flexDirection: 'row', paddingBottom: lastIndex == i ? 60 : 0 }}>
                    {this.renderRow(imagesRow)}
                </View>
            )
        })
    }
}

export default withNavigation(PostGridView);

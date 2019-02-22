import React, {Component} from 'react';
// import {Icon} from 'react-native-elements';
import { Icon } from 'react-native-elements'
import Colors from '../constants/Colors';

class TabBarIcon extends Component {
    render() {
        return(
            <Icon
                name={this.props.name}
                type={this.props.type ? this.props.type : 'feather'}
                size={26}
                style={ [styles.iconStyle, this.props.style] }
                onPress={this.props.onPress}
                color = {this.props.color ? this.props.color : Colors.iconColor}
            />
        );
    }
}

const styles = {
    iconStyle: {
        marginBottom: -3,
        color: Colors.iconColor,
    }
}
export default TabBarIcon;

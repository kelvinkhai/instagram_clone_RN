import _ from 'lodash';
import {
    IMAGE_LOADING,
    IMAGE_LIST,
    LIKE_PHOTO,
} from '../actions/types';

const INITIAL_STATE = {
    error: false,
    loading: false,
    imageList: {},
    page: 1,
    orderBy: "popular",
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case IMAGE_LOADING:
            return {...state, loading: action.payload };
        case IMAGE_LIST:
            var exist = _.findIndex(state.imageList, action.payload[0]);
            if(exist > 0) { return {...state }; }
            return {...state, imageList: _.union(state.imageList, action.payload), page: action.page };
        case LIKE_PHOTO:
            const updatedState = _.map(state.imageList, i => {
                if(i.hasOwnProperty('id') && i['id'] == action.payload) {
                    i['liked_by_user'] = i['liked_by_user'] === true ? false : true;
                }
                return i;
            });
            return { ... state, imageList: updatedState };
        default:
            return state;
    }
}

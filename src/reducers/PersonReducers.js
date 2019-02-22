import _ from 'lodash';
import {
    PROFILE_LOADING,
    SELECTED_PROFILE,
    UNMOUNT_SELECTED_PROFILE,
    PROFILE_IMAGE_LOADING,
    SELECTED_PROFILE_IMAGE,
    UPDATE_VIEW_TYPE,
    LIKE_PHOTO,
} from '../actions/types';

const INITIAL_STATE = {
    error: false,
    loading: false,
    selectedProfile: null,
    selectedProfileImage: null,
    viewType: 'grid',
    orderBy: 'popular',
    page: 1,
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case PROFILE_LOADING:
        case PROFILE_IMAGE_LOADING:
            return { ...state, loading: action.payload };
        case SELECTED_PROFILE:
            return { ...state, selectedProfile: action.payload };
        case UNMOUNT_SELECTED_PROFILE:
            return { ...state, selectedProfile: null, selectedProfileImage: null, viewType: 'grid' };
        case SELECTED_PROFILE_IMAGE:
            var exist = _.findIndex(state.selectedProfileImage, action.payload[0]);
            if(exist > 0) { return {...state }; }
            return {...state, selectedProfileImage: _.union(state.selectedProfileImage, action.payload), page: action.page };
        case UPDATE_VIEW_TYPE:
            return { ... state, viewType: action.payload };
        case LIKE_PHOTO:
            const updatedState = _.map(state.selectedProfileImage, i => {
                if(i.hasOwnProperty('id') && i['id'] == action.payload) {
                    i['liked_by_user'] = i['liked_by_user'] === true ? false : true;
                }
                return i;
            });
            return { ... state, selectedProfileImage: updatedState };
        default:
            return state;
    }
}

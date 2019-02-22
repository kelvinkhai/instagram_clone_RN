import axios from 'axios';
import Unsplash from 'unsplash-js/native';

import {
    PROFILE_LOADING,
    SELECTED_PROFILE,
    UNMOUNT_SELECTED_PROFILE,
    PROFILE_IMAGE_LOADING,
    SELECTED_PROFILE_IMAGE,
    UPDATE_VIEW_TYPE,
} from './types';

// initialize unsplash
const unsplash = new Unsplash({
    applicationId: "YOUR_UNSPLASH_APPLICATION_ID",
    secret: "YOUR_UNSPLASH_SECRET",
});
const toJson = require("unsplash-js").toJson;

export const getUserProfile = username => async dispatch => {
    dispatch({ type: PROFILE_LOADING, payload: true });

    unsplash.users.profile(username)
    .then(toJson)
    .then(result => {
        dispatch({ type: SELECTED_PROFILE, payload: result });
    });
}

export const unmountUserProfile = () => {
    return { type: UNMOUNT_SELECTED_PROFILE };
}

export const getUserPhotos = ($username = '', orderBy = 'latest', page=1, perPage=30, stats = false) => async dispatch => {
    dispatch({ type: PROFILE_IMAGE_LOADING, payload: true });

    unsplash.users.photos($username, page, perPage, orderBy, stats)
    .then(toJson)
    .then(result => {
        dispatch({ type: SELECTED_PROFILE_IMAGE, payload: result, page });
    })
}

export const setViewType = type => {
    return { type: UPDATE_VIEW_TYPE, payload: type };
}

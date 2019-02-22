import axios from 'axios';
import Unsplash from 'unsplash-js/native';

import {
    IMAGE_LOADING,
    IMAGE_LIST,
    LIKE_PHOTO,
} from './types';

// initialize unsplash
const unsplash = new Unsplash({
    applicationId: "YOUR_UNSPLASH_APPLICATION_ID",
    secret: "YOUR_UNSPLASH_SECRET",
});
const toJson = require("unsplash-js").toJson;

export const getPhotos = (orderBy="latest", page=1, perPage=15) => async dispatch => {
    dispatch({ type: IMAGE_LOADING, payload: true });

    unsplash.photos.listPhotos(page, perPage, orderBy)
    .then(toJson)
    .then(result => {
        dispatch({ type: IMAGE_LIST, payload: result, page: page });
    });
}

export const likePhoto = photoId => {
    return { type: LIKE_PHOTO, payload: photoId };
}

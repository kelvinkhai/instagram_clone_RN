import {
    //
} from '../actions/types';

const INITIAL_STATE = {
    error: false,
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        default:
            return state;
    }
}

import * as types from '../actionTypes';

const initialState = {
    roster: {}
}

export default function(state={...initialState}, action) {
    switch (action.type) {
        case types.SET_MY_ROSTER:
            return {
                ...state,
                roster: action.payload
            }
        default:
            return state;
    }
}
import { SET_FIELD } from '../actions';

const INITIAL_STATE = {
    title: '',
    gender: '',
    rate: 0,
    img: '',
    description: ''
}

export default function serieFormReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_FIELD:
            const newState = { ...state };
            newState[action.field] = action.value;
            return newState;
        case CLEAR_SERIE_FROM:
            return INITIAL_STATE;
        default:
            return state;
    }
};
import { FEATCH_COLLBAS, ADD_COLLBAS, REMOVE_COLLABS } from "../actions/types";

const initialState = {
    collabs: []
};


export const notesCollabReducer = (state = initialState, { type, payload }) => {

    let newObject = Object.assign({}, state)
    switch (type) {

        case FEATCH_COLLBAS:
            newObject.collabs = payload;
            break;

        case ADD_COLLBAS:
            newObject.collabs.push(payload);
            break;

        case REMOVE_COLLABS:
            newObject.collabs.splice(state.collabs.filter((x) => x.Id === payload), 1)
            break;

        default:
            return state
    }

    return newObject;
}

import {MESSAGE_HIDE , MESSAGE_SHOW} from '../actions/types'

const initialState = {
    messages: [],
    message: {}
}

export const messageReducer = (state = initialState, action) => {
    let newObject = Object.assign({} , state);
  switch (action.type) {

  case MESSAGE_SHOW:
    newObject.messages.push = state.message;
    newObject.message = action.payload;
    break;

   case MESSAGE_HIDE:
   newObject.messages.push = state.message;
   newObject.message = {};
   break;

  default:
    return state
  }
  return newObject;
}

import {FETCH_USERS , FEATCH_CURRENT_USER} from "../actions/types";

  //Repositories
  //import { LocalStorageRepository } from "../repository/localstorage.js";

  const initalState = {
    users: [],
    currentUser :""
  };

  export const usersReducer = (state = initalState, { type, payload }) => {
     let newObject = Object.assign({} , state);
     switch (type) {
      //TODO :: need to check and fix this type
      case FETCH_USERS:
        newObject.users = payload;
        break;
      case FEATCH_CURRENT_USER:
        newObject.currentUser = payload
        break;
      default:
        return state;
    }
    return newObject;
}

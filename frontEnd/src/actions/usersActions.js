import { FETCH_USERS , FEATCH_CURRENT_USER } from "./types";
//import { LocalStorageRepository } from '../repository/localstorage.js';
import { APIRepository } from "../repository/apirepository";

const repository = new APIRepository("myNotes");




export const fetchUsers = () => async dispatch => {
  
    let data = await repository.FetchUsers();
    dispatch({
      type: FETCH_USERS,
      payload: data
    });
  };

export const feathCurrentUser = () => dispatch => {
   var currentUser = document.getElementById("UserId").value;
   dispatch({
      type:FEATCH_CURRENT_USER,
      payload : currentUser
   })
}

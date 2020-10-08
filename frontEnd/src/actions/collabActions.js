import { FEATCH_COLLBAS , ADD_COLLBAS , REMOVE_COLLABS , MESSAGE_SHOW } from "./types";

import { trackPromise } from 'react-promise-tracker';
//import { LocalStorageRepository } from '../repository/localstorage.js';
import { APIRepository } from "../repository/apirepository";
const repository = new APIRepository("myNotes");



export const fetchCollab = (noteId) => async dispatch => {
  var data = await repository.GetCollbs(noteId);
  dispatch({
    type: FEATCH_COLLBAS,
    payload: data
  });

};



export const addCollab = collab => async dispatch => {

    await await trackPromise(repository.AddCollab(collab));
    dispatch({
      type: ADD_COLLBAS,
      payload: collab
    });
    dispatch({
      type: MESSAGE_SHOW,
      payload: "added collabration user.."
    })
};

export const deleteCollab = collabId => async dispatch => {
    await trackPromise(repository.RemoveCollab(collabId))
  dispatch({
    type: REMOVE_COLLABS,
    payload: collabId
  });

  dispatch({
    type: MESSAGE_SHOW,
    payload: "removed collabration user.."
  })
};

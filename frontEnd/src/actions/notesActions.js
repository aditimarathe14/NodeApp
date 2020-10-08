import {
  FEATCH_NOTES,
  SELECT_NOTES as SELECT_NOTE,
  UPDATE_NOTE,
  INSERT_NOTE,
  NEW_NOTE,
  DELETE_NOTE,
  UPDATE_NOTE_STARTED,
  MESSAGE_SHOW,
  FEATCH_COLLBAS
} from "./types";

import { trackPromise } from 'react-promise-tracker';


//import { LocalStorageRepository } from '../repository/localstorage.js';
import { APIRepository } from "../repository/apirepository";
const repository = new APIRepository("myNotes");

export const fetchNotes = () => async (dispatch) => {
  
  const data = await trackPromise(repository.GetAll());
  dispatch({
    type: FEATCH_NOTES,
    payload: data
  });
};

export const selectNote = note => async (dispatch) => {
  dispatch({
    type: SELECT_NOTE,
    payload: note
  });
  var collabs = await repository.GetCollbs(note.Id);
  dispatch({
    type : FEATCH_COLLBAS,
    payload : collabs
  })
};

export const newNote = note => async (dispatch) => {
  dispatch({
    type: NEW_NOTE,
    payload: note
  });
};

export const saveNote = note => async (dispatch) => {
  if (note.Id === undefined) {
    let data = await trackPromise(repository.Add(note));
    console.log(data);
    data.notes.forEach(x => x.mode = 'read');
    dispatch({
      type: INSERT_NOTE,
      payload: {
        notes: data.notes,
        currentNote: data.note
      }
    });
  } else {
    let data = await trackPromise(repository.Update(note));
    data.forEach(x => x.mode = 'read');
    let currentNote = data.filter(x => x.Id === note.Id)
    dispatch({
      type: UPDATE_NOTE,
      payload: {
        notes: data,
        currentNote: currentNote[0]
      }
    });
  }
  dispatch({
    type: MESSAGE_SHOW,
    payload : "Notes Saved..."
  });
};

export const deleteNote = note => async (dispatch) => {
if(window.confirm("Are you sure you want to delete this note?")){
  
  dispatch({
    type: DELETE_NOTE,
    payload: await trackPromise(repository.Delete(note))
  });
}
};

export const deleteAllNote = note => async (dispatch) => {
  dispatch({
    type: DELETE_NOTE,
    payload: repository.ClearAll()
  });
};

export const editModeStarted = note => async (dispatch) => {
  dispatch({
    type: UPDATE_NOTE_STARTED,
    payload: note
  });
};

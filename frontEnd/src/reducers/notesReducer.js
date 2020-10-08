import {
  FEATCH_NOTES,
  NEW_NOTE,
  SELECT_NOTES,
  DELETE_ALL_POST,
  INSERT_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  UPDATE_NOTE_STARTED,
} from "../actions/types";

import _ from 'lodash';
import moment from 'moment';
//Repositories
//import { LocalStorageRepository } from "../repository/localstorage.js";

const initalState = {
  notes: [],
  currentNote: {
    Title: "",
    Body: "",
    mode: "edit",
  },
  loading:true
};

const fetchReducer = (state = initalState, { type, payload }) => {
  let newObject = Object.assign({}, state);
  if(type.endsWith("_START")){
    newObject.loading = true;
  }
  return newObject;
}


const notesReducer = (state = initalState, { type, payload }) => {
  let newObject = Object.assign({}, state);
  
  switch (type) {
    case FEATCH_NOTES:
      payload = _.sortBy(payload, function(dateObj) {
        return new moment(dateObj.lastUpdateOn);
      }).reverse();
      newObject.notes = payload;
      newObject.notes.forEach((x) => (x.mode = "read"));
      newObject.currentNote =
        payload[0] !== undefined
          ? payload[0]
          : { Title: "", Body: "", mode: "edit" };
      break;
    case SELECT_NOTES:
      newObject.currentNote = payload;
      break;
    case NEW_NOTE:
      newObject = Object.assign({}, state, { currentNote: payload });
      newObject.activeIndex = 0;
      break;
    case DELETE_ALL_POST:
      newObject = {
        ...state,
        notes: [],
        currentNote: null,
      };
      break;
    case DELETE_NOTE:
      return {
        notes: payload,
        currentNote: payload.length > 0 ? payload[0] : {},
      };
    case INSERT_NOTE:
      payload.notes = _.sortBy(payload.notes, function(dateObj) {
        return new moment(dateObj.lastUpdateOn);
      }).reverse();
      newObject = Object.assign({}, state, payload);
      newObject.currentNote = Object.assign({}, payload.currentNote, { mode: "edit" });
      break;

    case UPDATE_NOTE:
      payload.notes = _.sortBy(payload.notes, function(dateObj) {
        return new moment(dateObj.lastUpdateOn);
      }).reverse();
      newObject = Object.assign({}, state, payload);
      newObject.currentNote = Object.assign({}, payload.currentNote, {
        mode: "read",
      });
      break;

    case UPDATE_NOTE_STARTED:
      newObject.currentNote = Object.assign({}, payload, { mode: "edit" });
      break;
    default:
      if(!type.endsWith("START"))
      newObject.loading = false;
      return newObject;
  }
  return newObject;
};

export default notesReducer;

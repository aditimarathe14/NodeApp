import { MESSAGE_HIDE , MESSAGE_SHOW } from "./types";

export const showMessage = (message) => ({
  type: MESSAGE_SHOW,
  payload: message
})


export const hideMessage = () => ({
  type: MESSAGE_HIDE,
  payload: {}
})

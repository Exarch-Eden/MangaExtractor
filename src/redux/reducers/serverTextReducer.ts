import { ServerTextAction } from "../actions";
import { SET_SERVER_TEXT } from "../../constants/actionConstants";

export interface ServerTextState {
  serverText: string;
}

const initialState: ServerTextState = {
  serverText: "no server text",
};

/**
 * Reducer for server text that is to be used by useDispatch
 * and useSelector hook in order to update or retrieve the
 * server text state.
 *
 * @param state
 * @param action
 * @returns the updated state
 */
const serverTextReducer = (
  state: ServerTextState = initialState,
  action: ServerTextAction
): ServerTextState => {
  console.log("serverTextReducer");
  console.log("state: ", state.serverText);
  
  switch (action.type) {
    case SET_SERVER_TEXT:
      console.log("SET_SERVER_TEXT");
      console.log("new state: ", action.payload);
      return { ...state, serverText: action.payload };
      // return Object.assign({ ...state, serverText: action.payload });
    default:
      return state;
  }
  
};

export default serverTextReducer;

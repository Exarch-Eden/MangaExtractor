import { combineReducers } from "redux";

// reducers
import serverTextReducer from "./serverTextReducer";
import booksReducer from "./booksReducer";

// combine reducers
export default combineReducers({ booksReducer });

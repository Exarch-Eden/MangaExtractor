import {
  SET_LATEST_BOOKS,
  SET_SEARCH_RESULT_BOOKS,
  SET_SERVER_TEXT,
} from "../constants/actionConstants";
import { Book } from "../types/manga";

// --------------------------------------------
// ACTION FUNCTIONS

/**
 * Changes the server text value.
 *
 * @param content the updated server text value
 * @returns an object containing the action type and payload
 */
export const setServerText = (content: string): ServerTextAction => {
  console.log("setServerText content: ", content);

  return {
    type: SET_SERVER_TEXT,
    payload: content,
  };
};

export const setLatestBooks = (content: Book[]): BooksAction => {
  console.log("setLatestBooks content: ");
  console.table(content);

  return {
    type: SET_LATEST_BOOKS,
    payload: content,
  };
};

export const setSearchResultBooks = (content: Book[]): BooksAction => {
  console.log("setSearchResultBooks content: ");
  console.table(content);

  return {
    type: SET_SEARCH_RESULT_BOOKS,
    payload: content,
  };
};


// END OF ACTION FUNCTIONS
// --------------------------------------------
// TYPES AND CONSTANTS

type SetServerTextType = "SET_SERVER_TEXT";
type SetLatestBooksType = "SET_LATEST_BOOKS";
type SetSearchResultBooksType = "SET_SEARCH_RESULT_BOOKS";

// add more action types here by adding "|" with the type
type ActionTypes =
  | SetServerTextType
  | SetLatestBooksType
  | SetSearchResultBooksType;

// action type specific to server text state
export type ServerTextAction = {
  type: SetServerTextType;
  payload: string;
};

export type BooksAction = {
  type: SetLatestBooksType | SetSearchResultBooksType;
  payload: Book[];
};

// generic action type for type-checking
export type GenericAction = {
  type: ActionTypes;
  payload: {
    content: string;
  };
};

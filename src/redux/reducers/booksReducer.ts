import { Book } from "../../types/manga";
import { BooksAction } from "../actions";
import {
  SET_LATEST_BOOKS,
  SET_SEARCH_RESULT_BOOKS,
} from "../../constants/actionConstants";

export interface BooksState {
  latestBooks: Book[];
  searchResultBooks: Book[];
}

const initialState: BooksState = {
  latestBooks: [],
  searchResultBooks: [],
};

const booksReducer = (
  state: BooksState = initialState,
  action: BooksAction
): BooksState => {
  console.log("booksReducer");
  console.log("state: ");
  console.table(state);

  let retVal = state;

  switch (action.type) {
    case SET_LATEST_BOOKS:
      // whole array assignment
      retVal = {
        ...state,
        latestBooks: action.payload,
      };
      // single book push
      // retVal = {
      //   ...state,
      //   latestBooks: [...state.latestBooks, action.payload],
      // };
      break;
    case SET_SEARCH_RESULT_BOOKS:
      // whole array assignment
      retVal = {
        ...state,
        searchResultBooks: action.payload,
      };
      // single book push
      // retVal = {
      //   ...state,
      //   searchResultBooks: [...state.searchResultBooks, action.payload],
      // };
      break;
  }

  return retVal;
};

export default booksReducer;
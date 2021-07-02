// third-party libraries
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// components

// css

// constants
import { serverDefaultUrl } from "../constants/serverURLS";

// redux
import { setServerText } from "../redux/actions";
import { ServerTextState } from "../redux/reducers/serverTextReducer";


const Home = () => {
  // --------------------------------------------
  // remove later

  // win.devTools = win.__REDUX_DEVTOOLS_EXTENSION__.connect();

  // with redux
  // for changing specific state values based on the action function
  // used
  const dispatch = useDispatch();

  // parses through store and takes only the server text state
  // interface params: useSelector<input type, return type>
  const serverText = useSelector(
    (state: ServerTextState) => {
      console.log("useSelector state: ", state);
      console.log("useSelector serverText: ", state.serverText);

      return state;
    },
    // (left, right) => left === right
  );

  // const [localServerText, setLocalServerText] = useState("");

  // without redux
  // const [serverText, setServerText] = useState("not fetched");

  const fetchData = useCallback(async () => {
    console.log("fetching data");

    const res = await fetch(serverDefaultUrl);
    const data = await res.text();
    console.log("fetched data: ", data);

    // redux approach

    console.log("dispatching action");

    // calls setServerText() from redux/actions.ts
    // and passes it to the store reducer
    dispatch(setServerText(data));

    // console.log("Home serverText: ", serverText);

    // old code (without redux)
    // setServerText(data);
  }, [dispatch]);

  // for server testing purposes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // useEffect(() => {
  //   console.log("Home serverText: ", serverText);
  //   // setLocalServerText(serverText);
  // }, [serverText]);
  // --------------------------------------------

  return (
    <div>
      <p>This is the home page.</p>
      <p>Server Text: [{serverText.serverText}]</p>
    </div>
  );
};

export default Home;

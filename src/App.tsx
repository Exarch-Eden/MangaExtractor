// third-party libraries
import React, { useCallback, useEffect, useState } from "react";

// components

// css
import "./styles/App.css";

// constants
import { serverDefaultUrl } from "./constants/serverURLS";

const App = () => {
  const [serverText, setServerText] = useState("not fetched");

  const fetchData = useCallback(async () => {
    const res = await fetch(serverDefaultUrl);
    const data = await res.text();
    setServerText(data);
  }, []);

  // for server testing purposes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App">
      <p>This is the electron app.</p>
      <p>Server Text: {serverText}</p>
    </div>
  );
}

export default App;

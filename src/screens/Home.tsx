// third-party libraries
import React, { useCallback, useEffect, useState } from "react";

// components

// css

// constants
import { serverDefaultUrl } from "../constants/serverURLS";

const Home = () => {
  // --------------------------------------------
  // remove later

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
  // --------------------------------------------

  return (
    <div>
      <p>This is the home page.</p>
      <p>Server Text: {serverText}</p>
    </div>
  );
}

export default Home;

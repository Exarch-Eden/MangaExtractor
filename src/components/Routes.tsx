// third-party libraries
import { Route, Switch } from "react-router-dom";
import Home from "../screens/Home";

// components

// css

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  );
}

export default Routes;

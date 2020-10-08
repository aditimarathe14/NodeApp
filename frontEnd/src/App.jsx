import React from "react";
import { Switch, Route } from "react-router-dom";

import { PrivateRoute } from "./components/PrivateRoute.jsx";

import Container from "./components/Container.jsx";
import Login from "./components/Login.jsx";

export default function App() {
  return (
    <div className="app-routes">
      <Switch>
        <PrivateRoute exact path="/notes" component={Container} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

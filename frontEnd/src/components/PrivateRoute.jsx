import React from "react";
import { Route, Redirect } from "react-router-dom";
import { UserRepository } from "../repository/userRepository";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      new UserRepository().currentUser != null ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

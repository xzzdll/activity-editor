import React, { } from "react";
import addActivity from "./addActivity"
import dashboard from "./dashboard"
import { Route, Redirect } from "react-router-dom";

export default function Index() {
  return (
    <>
      <Redirect to="/dashboard" />
      <Route path="/addActivity" component={addActivity} />
      <Route path="/dashboard" component={dashboard} />
    </>
  );
}

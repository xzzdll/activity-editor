import React, { } from "react";
import ActivityEdit from "./activityEdit/index"
import Dashboard from "./dashboard/index"
import { Route, Redirect } from "react-router-dom";

export default function Index() {
  return (
    <>
      <Redirect to="/dashboard" />
      <Route path="/addActivity" component={ActivityEdit} />
      <Route path="/dashboard" component={Dashboard} />
    </>
  );
}

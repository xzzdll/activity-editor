import React from "react";
import "./App.css";
import Activity from "./components/Activity";
import "react-quill/dist/quill.snow.css";
import { Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <div className="main-app">
      {/* <Route path="/index" component={Children} /> */}
      <Route path="/" component={Activity} />
      {/* <Route path="/artical" component={Children} />
      <Route path="/detail/:id" component={Children} />
      <Route path="/say" component={Children} />
      <Route path="/collect" component={Children} /> */}
      </div>
    </>
  );
}

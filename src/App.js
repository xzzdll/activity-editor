import React from "react";
import "./App.css";
import index from "./pages/index";
import "react-quill/dist/quill.snow.css";
import { Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <div className="main-app">
        <Route path="/" component={index} />
      </div>
    </>
  );
}

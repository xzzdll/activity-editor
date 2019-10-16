import React, { useReducer } from "react";
import "./App.css";
import { fetchReducer } from "./reducers/fetchReducer";
import Children from "./components/children"
import FetchesContext from "./provider/FetchesProvider"

export default function App() {
  const [fetchesState, fetchDispatch] = useReducer(fetchReducer, {
    isFetching: false,
    goodsList: []
  });

  return (
    <FetchesContext.Provider value={{ fetchesState, dispatch: fetchDispatch }}>
      <Children/>
    </FetchesContext.Provider>
  );
}

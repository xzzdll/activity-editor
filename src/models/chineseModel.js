import { put, call, takeEvery } from "redux-saga/effects";
import {says} from "../service/api.js";

// saga
function* fetch(action) {
  try {
    const res = yield call(says, action.payload);
    yield put({
      type: "english:set",
      payload: res
    });
  } catch (err) {
    console.log(err);
  }
}

export default {
  name: "english",
  reducer: (state = {}, action) => {
    switch (action.type) {
      case "english:set":
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  saga: function* listWatcher() {
    yield takeEvery("english:fetchList", fetch);
  }
};

import { put, call, takeEvery } from "redux-saga/effects";
import {articals} from "../service/api.js";

// saga
function* fetch(action) {
  try {
    const res = yield call(articals, action.payload);
    yield put({
      type: "common:set",
      payload: res
    });
  } catch (err) {
    console.log(err);
  }
}

export default {
  name: "common",
  reducer: (state = {}, action) => {
    switch (action.type) {
      case "common:set":
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  saga: function* listWatcher() {
    yield takeEvery("common:fetchList", fetch);
  }
};

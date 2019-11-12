import { put, call, takeEvery } from "redux-saga/effects";
import { articals } from "../service/api.js";

const initialState = {
  name: '',
  symbol: '',
  isTradingRank: true,
  id:''
}

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
  reducer: (state = initialState, action) => {
    switch (action.type) {
      case "common:setName":
        return { ...state, ...{ name: action.payload } };
      case "common:setSymbol":
        return { ...state, ...{ symbol: action.payload } };
      case "common:setIsTradingRank":
        return { ...state, ...{ isTradingRank: action.payload } };
      case "common:setId":
        return { ...state, ...{ id: action.payload } };
      default:
        return state;
    }
  },
  saga: function* listWatcher() {
    yield takeEvery("common:fetchList", fetch);
  }
};

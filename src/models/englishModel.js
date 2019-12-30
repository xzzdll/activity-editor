import { put, call, takeEvery } from "redux-saga/effects";
import { getVisitorMount } from "../service/api.js";

const rewardsEn = [
  { orderNo: '1', title: '1st Place', desc: '', },
  { orderNo: '2', title: '2nd Place', desc: '', },
  { orderNo: '3', title: '3rd Place', desc: '', },
  { orderNo: '4', title: '4th-10th Place', desc: '', },
]

const parts = [];
for (let i = 0; i < 3; i++) {
  parts.push({
    title: "",
    desc: "",
    rewards: JSON.parse(JSON.stringify(rewardsEn)),
    isRewards: false
  })
}

const initialState = {
  pageTitle: "",
  pageDescription: "",
  time: "",
  landingImage: "",
  appImage: "",
  parts,
  terms: "",
  riskTip: ""
}

// saga
function* fetch(action) {
  try {
    const res = yield call(getVisitorMount, action.payload);
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
  reducer: (state = initialState, action) => {
    switch (action.type) {
      case "english:set":
        return state = { ...action.payload || initialState };
      case "english:clear":
        return initialState;
      default:
        return state;
    }
  },
  saga: function* listWatcher() {
    yield takeEvery("english:fetchList", fetch);
  }
};

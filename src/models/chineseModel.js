import { put, call, takeEvery } from "redux-saga/effects";
import { says } from "../service/api.js";

const rewardsCn = [
  { orderNo: '1', title: '第1名', desc: '' },
  { orderNo: '2', title: '第2名', desc: '' },
  { orderNo: '3', title: '第3名', desc: '' },
  { orderNo: '4', title: '第4-10名', desc: '' },
]

const parts = [];
for (let i = 0; i < 3; i++){
  parts.push({
    title: "",
    desc: "",
    rewards: JSON.parse(JSON.stringify(rewardsCn)),
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
    const res = yield call(says, action.payload);
    yield put({
      type: "chinese:set",
      payload: res
    });
  } catch (err) {
    console.log(err);
  }
}

export default {
  name: "chinese",
  reducer: (state = initialState, action) => {
    switch (action.type) {
      case "chinese:set":
        debugger
        return { ...state, ...action.payload };
      case "chinese:clear":
        debugger
        return initialState;
      default:
        return state;
    }
  },
  saga: function* listWatcher() {
    yield takeEvery("chinese:fetchList", fetch);
  }
};

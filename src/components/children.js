import React, { useContext, useEffect, useState } from "react";
import FetchesContext from "./provider/FetchesProvider";
import axios from "axios";
import {
  receiveGoodsList,
  requestGoodsList
} from "../actions/fetchAction"

export default function GoodsList() {
  //获取上下文
  const ctx = useContext(FetchesContext);

  //一个判断是否重新获取的state变量
  const [reFetch, setReFetch] = useState(false);

  //具有异步调用副作用的useEffect
  useEffect(() => {
    //首先分发一个开始异步获取数据的action
    ctx.dispatch(requestGoodsList());
    axios.post("http://xzzdll.cn/api/say/list").then(res => {
      //获取到数据后分发一个action，通知reducer更新状态
      ctx.dispatch(receiveGoodsList(res.data));
    });
    //第二个参数reFetch指的是只有当reFetch变量值改变才重新渲染
  }, [ctx, reFetch]);

  return (
    <div>
      {
        //children
        ctx.fetchesState
      }
    </div>
  );
}

import React from "react";
import "./Activity.css";
// import Button from 'antd/es/button';
import { useDispatch,useSelector } from 'react-redux'
import { Input, Switch } from 'antd';

export default function CommonTab() {
  const dispatch = useDispatch()
  const { id, name, symbol, isTradingRank } = useSelector(state => state.common)

  return (
    <>
      <h3>活动ID</h3>
      <Input size="large" placeholder="活动ID" value={id} onChange={({ target: { value } }) => dispatch({ type: 'common:setId', payload: value })} />
      <h3>币种</h3>
      <Input size="large" placeholder="币种" value={name} onChange={({ target: { value } }) => dispatch({ type: 'common:setName', payload: value })} />
      <h3>交易对</h3>
      <Input size="large" placeholder="交易对" value={symbol} onChange={({ target: { value } }) => dispatch({ type: 'common:setSymbol', payload: value })} />
      <h3>是否显示排名</h3>
      <Switch checked={isTradingRank} onChange={(checked) => dispatch({ type: 'common:setIsTradingRank', payload: checked })} />
    </>
  );
}

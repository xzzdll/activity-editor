import React, { useEffect } from "react";
import "./Activity.css";
import Activity from "./Activity"
import CommonTab from "./CommonTab"
import { Tabs, Button, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { addNewActivity, getActivityById } from '../service/api'
import { useHistory, useLocation } from "react-router-dom";

const { TabPane } = Tabs;

export default function Index() {
  const { common, chinese, english } = useSelector(state => state);
  const dispatch = useDispatch()

  const history = useHistory()

  const { search: id } = useLocation()
  
  // useEffect(() => {

  // },[dispatch])

  useEffect(() => {
    dispatch({ type: 'chinese:clear'})
    dispatch({ type: 'english:clear'})
    dispatch({ type: 'common:clear'})
    if (id) {
      getActivityById(id).then(({data:{activity}}
      ) => {
        console.log(activity)
        let activityJson = JSON.parse(activity.activity_json)
        dispatch({ type: 'chinese:set', payload: activityJson.cn })
        dispatch({ type: 'english:set', payload: activityJson.en })
        dispatch({ type: 'common:setId', payload: activityJson.id })
        dispatch({ type: 'common:setName', payload: activityJson.name })
        dispatch({ type: 'common:setSymbol', payload: activityJson.symbol })
        dispatch({ type: 'common:setIsTradingRank', payload: activityJson.isTradingRank })
      })
    }
  }, [id, dispatch])

  let download = () => {
    var eleLink = document.createElement('a');
    eleLink.download = 'activity.json';
    eleLink.style.display = 'none';
    var blob = new Blob([JSON.stringify({ ...common, cn: chinese, en: english })]);
    eleLink.href = URL.createObjectURL(blob);
    document.body.appendChild(eleLink);
    eleLink.click();
    document.body.removeChild(eleLink);
  }

  let upload = () => {
    addNewActivity({ id: common.id, activity_json: JSON.stringify({ ...common, cn: chinese, en: english }) }).then((data) => {
      if (data.status) {
        download()
        history.push('/dashboard')
      } else {
        message.error(data.code);
      }
    })
  }

  return (
    <>
      <h1>活动编辑器</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="通用配置" key="1">
          <CommonTab></CommonTab>
        </TabPane>
        <TabPane tab="中文版" key="2">
          <Activity locale='cn'></Activity>
        </TabPane>
        <TabPane tab="英文版" key="3">
          <Activity locale='en'></Activity>
        </TabPane>
      </Tabs>
      <div className="Activity-item" style={{ border: "unset" }}>
        <Button onClick={() => history.push('/dashboard')}>返回</Button>
        <Button style={{ marginLeft: '20px' }} onClick={upload}>上传并下载json</Button>
      </div>
    </>
  );
}

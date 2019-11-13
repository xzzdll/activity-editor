import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "./Activity.css";
import { Input, Switch } from 'antd';
import { useDispatch } from 'react-redux'
import UploadImage from './UploadImage'

const rewardsEn = [
  { orderNo: '1', title: '1st Place', desc: '', },
  { orderNo: '2', title: '2nd Place', desc: '', },
  { orderNo: '3', title: '3rd Place', desc: '', },
  { orderNo: '4', title: '4th-10th Place', desc: '', },
]

const rewardsCn = [
  { orderNo: '1', title: '第1名', desc: '' },
  { orderNo: '2', title: '第2名', desc: '' },
  { orderNo: '3', title: '第3名', desc: '' },
  { orderNo: '4', title: '第4-10名', desc: '' },
]


export default function Activity({ locale }) {

  const [data, setData] = useState({
    pageTitle: "test",
    pageDescription: "test",
    time: "test",
    landingImage: "",
    appImage: "",
    parts: [
      {
        title: "<p>test</p>",
        desc: "<p>test</p>",
        rewards: locale === 'cn' ? JSON.parse(JSON.stringify(rewardsCn)) : JSON.parse(JSON.stringify(rewardsEn)),
        isRewards: false
      },
      {
        title: "<p>test</p>",
        desc: "<p>test</p>",
        rewards: locale === 'cn' ? JSON.parse(JSON.stringify(rewardsCn)) : JSON.parse(JSON.stringify(rewardsEn)),
        isRewards: false
      },
      {
        title: "<p>test</p>",
        desc: "<p>test</p>",
        rewards: locale === 'cn' ? JSON.parse(JSON.stringify(rewardsCn)) : JSON.parse(JSON.stringify(rewardsEn)),
        isRewards: false
      }
    ],
    terms: "<p>test</p>",
    riskTip: "<p>test</p>"
  });
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: locale === 'cn' ? 'chinese:set' : 'english:set', payload: data })
  }, [data, dispatch, locale])

  let setArray = (arr, index, val, key) => {
    arr[index][key] = val
    return { parts: arr }
  }

  let setArray1 = (arr, index, index1, val) => {
    arr[index]['rewards'][index1]['desc'] = val
    return { parts: arr }
  }

  return (
    <>
      <h3>活动标题</h3>
      <Input size="large" placeholder="活动标题" value={data.pageTitle} onChange={({ target: { value } }) => setData({ ...data, ...{ pageTitle: value } })} />

      <h3>活动描述</h3>
      <Input size="large" placeholder="活动标题" value={data.pageDescription} onChange={({ target: { value } }) => setData({ ...data, ...{ pageDescription: value } })} />

      <h3>活动时间</h3>
      <Input size="large" placeholder="活动标题" value={data.time} onChange={({ target: { value } }) => setData({ ...data, ...{ time: value } })} />
      <div style={{ display: 'flex' }}>
        <div style={{ margin: '20px' }}>
          <h3>Banner Landing Image</h3>
          <UploadImage change={(value) => setData({ ...data, ...{ landingImage: value } })}></UploadImage>
        </div>
        <div style={{ margin: '20px' }}>
          <h3>Banner App Image</h3>
          <UploadImage change={(value) => setData({ ...data, ...{ appImage: value } })}></UploadImage>
        </div>
      </div>

      {
        data.parts.map((part, index) => {
          return <div key={index}>
            <h3>活动第{index + 1}部分</h3>
            <div className="Activity-item">
              <h4>标题</h4>
              <ReactQuill value={part.title} onChange={val => setData({ ...data, ...setArray(data.parts, index, val, 'title') })} />

              <h4>内容</h4>
              <ReactQuill value={part.desc} onChange={val => setData({ ...data, ...setArray(data.parts, index, val, 'desc') })} />

              <h3>是否显示奖励组件</h3>
              <Switch checked={part.isRewards} onChange={(checked) => setData({ ...data, ...setArray(data.parts, index, checked, 'isRewards') })} />

              {part.isRewards && part.rewards.map((reward, index1) => {
                return <div key={index1 + index}>
                  <h4>奖励{index1 + 1}</h4>
                  <Input size="large" placeholder="活动标题" value={reward.desc} onChange={({ target: { value } }) => setData({ ...data, ...setArray1(data.parts, index, index1, value) })} />
                </div>
              })}
            </div>
          </div>
        })
      }

      <h3>注意和服务协议</h3>
      <ReactQuill value={data.terms} onChange={val => setData({ ...data, ...{ terms: val } })} />

      <h3>风险提示</h3>
      <ReactQuill value={data.riskTip} onChange={val => setData({ ...data, ...{ riskTip: val } })} />
    </>
  );
}

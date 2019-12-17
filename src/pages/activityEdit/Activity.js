import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "./Activity.css";
import { Input, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import UploadImage from '../../components/UploadImage'
import useSingleData from '../../hooks/useSingleData'
import useArrayOperation from '../../hooks/useArrayOperation'


export default function Activity({ locale }) {
  const dispatch = useDispatch()
  const { data, setData } = useSingleData(locale)
  const { setArray, setArray1 } = useArrayOperation()

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
          <UploadImage value={data.landingImage} change={(value) => setData({ ...data, ...{ landingImage: value } })}></UploadImage>
        </div>
        <div style={{ margin: '20px' }}>
          <h3>Banner App Image</h3>
          <UploadImage value={data.appImage} change={(value) => setData({ ...data, ...{ appImage: value } })}></UploadImage>
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

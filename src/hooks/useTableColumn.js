import React from "react";
import { Button, Divider } from 'antd';
import { useHistory } from "react-router-dom";

export default (deleteActivity) => {
  const history = useHistory()

  const edit = (id) => {
    history.push(`/addActivity?id=${id}`)
  }

  return [
    {
      title: '活动ID',
      dataIndex: 'activity_id',
      key: `活动ID`,
    },
    {
      title: '币种',
      dataIndex: 'activity_json',
      key: '币种',
      render: (activity_json) => (
        <span>{JSON.parse(activity_json).name}</span>
      )
    },
    {
      title: '交易对',
      dataIndex: 'activity_json',
      key: '交易对',
      render: (activity_json) => (
        <span>{JSON.parse(activity_json).symbol}</span>
      )
    },
    {
      title: '操作',
      key: 'action',
      dataIndex: 'activity_id',
      render: (activity_id) => (
        <span>
          <Button type="primary" onClick={() => { edit(activity_id) }}>编辑</Button>
          <Divider type="vertical" />
          <Button type="danger" onClick={() => { deleteActivity(activity_id) }}>删除</Button>
        </span>
      ),
    },
  ];
}
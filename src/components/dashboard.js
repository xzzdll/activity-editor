import React from "react";
import "./Activity.css";
import { Table,Button } from 'antd';
import useAllActivity from '../hooks/useAllActivity'
import useTableColumn from '../hooks/useTableColumn'
import { useHistory } from "react-router-dom";


export default function Index() {
  const history = useHistory()

  const { dataSource, deleteActivity} = useAllActivity()

  const columns = useTableColumn(deleteActivity)

  return (
    <>
      <h1>活动编辑器2.0</h1>
      <Button type="primary" style={{ marginBottom: '30px' }} onClick={() => history.push('/addActivity')}>添加新活动</Button>

      <h3>线上活动</h3>
      <Table dataSource={dataSource} columns={columns} />;
    </>
  );
}

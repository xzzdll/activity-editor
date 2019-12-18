import { useState, useEffect } from "react"
import { getAllActivity, deleteActivityById } from '../service/api'
import { message } from 'antd';

export default () => {
  const [dataSource, setDataSource] = useState([])

  const getData = async () => {
    const { data } = await getAllActivity()

    let tmpData = data.activity.map((x, index) => {
      x.key = index
      return x;
    }) || []

    setDataSource(tmpData)
  }

  useEffect(() => {
    getData()
  }, [])

  const deleteActivity = async (id) => {
    const { status } = await deleteActivityById({ id })
    if (status) {
      message.info('删除成功');
      getData()
    }
  }

  return { dataSource, deleteActivity }
}
import { useState, useEffect } from "react"
import { getAllActivity, deleteActivityById } from '../service/api'
import { message } from 'antd';

export default () => {
  const [dataSource, setDataSource] = useState([])

  const getData = async () => {
    const { data } = await getAllActivity()

    data.activity.forEach((x,index) => {
      x.activity_json = JSON.parse(x.activity_json)
      x.key = index
    })

    setDataSource(data.activity)
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
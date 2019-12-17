import { useEffect } from "react"
import { getActivityById } from '../service/api'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from "react-router-dom";

export default () => {
  const { common, chinese, english } = useSelector(state => state);
  const dispatch = useDispatch()

  const { search: id } = useLocation()

  useEffect(() => {
    dispatch({ type: 'chinese:clear' })
    dispatch({ type: 'english:clear' })
    dispatch({ type: 'common:clear' })
    if (id) {
      getActivityById(id).then(({ data: { activity } }
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

  return { common, chinese, english}
}
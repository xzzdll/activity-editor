import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'

export default (locale) => {
  const { chinese, english } = useSelector(state => state);
  const [data, setData] = useState(locale === 'cn' ? chinese : english);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: locale === 'cn' ? 'chinese:set' : 'english:set', payload: data })
  }, [data, dispatch, locale])

  return { data, setData}
}
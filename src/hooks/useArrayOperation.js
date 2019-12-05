export default () => {
  const setArray = (arr, index, val, key) => {
    arr[index][key] = val
    return { parts: arr }
  }

  const setArray1 = (arr, index, index1, val) => {
    arr[index]['rewards'][index1]['desc'] = val
    return { parts: arr }
  }

  return { setArray, setArray1}
}
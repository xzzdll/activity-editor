import { addNewActivity } from '../service/api'
import { useHistory } from "react-router-dom";
import { message } from 'antd';

export default ({ common, chinese, english }) => {
  const history = useHistory()

  const download = () => {
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
    let activity_json = { ...common, cn: chinese, en: english }
    addNewActivity({ id: common.id, activity_json: JSON.stringify(activity_json).replace(/\\/g, "\\\\")}).then((data) => {
      if (data.status) {
        download()
        history.push('/dashboard')
      } else {
        message.error(data.code);
      }
    })
  }

  return { upload }
}
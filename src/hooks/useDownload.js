import { addNewActivity, getActivityById } from '../service/api'
import { useHistory, useLocation } from "react-router-dom";
import { Tabs, Button, message } from 'antd';

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
    addNewActivity({ id: common.id, activity_json: JSON.stringify({ ...common, cn: chinese, en: english }) }).then((data) => {
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
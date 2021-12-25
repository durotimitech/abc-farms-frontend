import { notification } from "antd";

const openNotification = ( {type, message} ) => {
  notification[type]({
    message: message,
  });
};

export default openNotification;

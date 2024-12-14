import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

const Notification = (
  type: NotificationType,
  message: string,
  description?: string
) => {
  notification[type]({
    message,
    description,
    placement: "topRight",
    duration: 2,
    showProgress: true,
  });
};

export default Notification;
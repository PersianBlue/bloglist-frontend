import "./notification.css";
import PropTypes from "prop-types";

const Notification = ({ message, type }) => {
  const style = type === "error" ? "error" : "alert";
  if (!message) {
    return null;
  }

  return <div className={`${style}`}>{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
export default Notification;

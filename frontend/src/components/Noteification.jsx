const Notification = ({ message }) => {
  if (message === null) {
    // 无信息展示
    return null;
  }
  // 错误信息展示
  return (
    <div className="alert alert-danger">
      {message}
    </div>
  );
};

export default Notification;

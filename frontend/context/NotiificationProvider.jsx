import { useState } from 'react';
import { NotificationContext } from './NotificationContext';
import Notification from '../src/utils/notification';

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState({ show: false, success: true, message: "" });

  const showNotification = ({ success, message }) => {
    setNotification({
      show: true,
      success,
      message
    });
    setTimeout(() => {
      setNotification((prev) => ({
        ...prev,
        show: false
      }));
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Notification
        show={notification.show}
        success={notification.success}
        message={notification.message}
      />
    </NotificationContext.Provider>
  );
}
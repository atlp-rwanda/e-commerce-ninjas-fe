/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { FaCheck } from 'react-icons/fa';
import { RiArrowDropDownLine, RiCheckDoubleFill } from "react-icons/ri";
import { fetchNotifications, markAllNotificationsRead, markNotificationRead } from '../../store/features/notifications/notificationSlice';
import { PuffLoader } from 'react-spinners';

type Notification = {
  id: string;
  message: string;
  createdAt: string;
  isRead: boolean;
};

const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  
  if (date.toDateString() === now.toDateString()) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  } else {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }
};

const Notifications: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [displayCount, setDisplayCount] = useState<number>(4);
  const dispatch = useAppDispatch();
  const { notifications, isLoading, isError, isSuccess, message } = useAppSelector((state: any) => state.notification);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const loadMore = () => {
    setDisplayCount(displayCount + 4);
  };

  const sortedNotifications = notifications ? notifications.slice().sort((a: Notification, b: Notification) => {
    if (a.isRead === b.isRead) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return Number(a.isRead) - Number(b.isRead);
  }) : [];

  const filteredNotifications = sortedNotifications.filter((notification: Notification) => 
    filter === 'All' || 
    (filter === 'Unread' && !notification.isRead) ||
    (filter === 'Read' && notification.isRead)
  ).slice(0, displayCount);

  const unreadCount = notifications ? notifications.filter((notification: Notification) => !notification.isRead).length : 0;

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const selectFilter = (filter: string) => {
    setFilter(filter);
    setDropdownOpen(false);
  };

  const handleMarkAllRead = () => {
    dispatch(markAllNotificationsRead());
  };

  const handleMarkRead = (id: string) => {
    dispatch(markNotificationRead(id));
  };

  return (
    <div className="notifications-container">
      {isLoading ? (
        <div className="loader">
          <PuffLoader color="#ff6d18" size={25} loading={isLoading} />
        </div>
      ) : isError ? (
        <div className="error-message">
          <p>{message}</p>
        </div>
      ) : (
        <>
          <div className="notifications-header">
            <h2>Notifications</h2>
            <div className="filter">
              <div className="filter-dropdown" onClick={toggleDropdown}>
                <span>{filter}</span>
                <RiArrowDropDownLine size={20} className="filter-icon" />
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <div className="dropdown-item" onClick={() => selectFilter('All')}>All</div>
                    <div className="dropdown-item" onClick={() => selectFilter('Unread')}>Unread</div>
                    <div className="dropdown-item" onClick={() => selectFilter('Read')}>Read</div>
                  </div>
                )}
              </div>
              <div className="filter-double" onClick={handleMarkAllRead}>
                <RiCheckDoubleFill size={15} className="filter-double-icon" />
              </div>
            </div>
          </div>
          <div className="notifications-list">
            {isSuccess && filteredNotifications.map((notification: Notification) => (
              <div 
                key={notification.id} 
                className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                onClick={() => handleMarkRead(notification.id)}
              >
                <FaCheck className={!notification.isRead ? 'unread-icon' : ''} />
                <div className="notification-text">
                  <p>{notification.message}</p>
                </div>
                <div className="notification-time">
                  {formatTime(notification.createdAt)}
                </div>
              </div>
            ))}
          </div>
          <div className="load-more">
            {notifications && filteredNotifications.length < notifications.length && (
              <button onClick={loadMore}>Load more</button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Notifications;

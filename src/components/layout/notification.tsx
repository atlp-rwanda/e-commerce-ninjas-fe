/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { FaCheck } from 'react-icons/fa';
import { RiArrowDropDownLine, RiCheckDoubleFill } from "react-icons/ri";
import { fetchNotifications } from '../../store/features/notification/notificationSlice';
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
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  if (diffInMinutes < 60) return `${diffInMinutes} min`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} h`;
  return date.toLocaleDateString();
};

const Notifications: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [displayCount, setDisplayCount] = useState<number>(4);
  const dispatch = useAppDispatch();
  const { notifications, isLoading, isError, isSuccess, message } = useAppSelector((state: any) => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const loadMore = () => {
    setDisplayCount(displayCount + 4);
  };

  const filteredNotifications = notifications ? notifications.filter((notification: Notification) => 
    filter === 'All' || (filter === 'Unread' && !notification.isRead)
  ).slice(0, displayCount) : [];

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const selectFilter = (filter: string) => {
    setFilter(filter);
    setDropdownOpen(false);
  };

  return (
    <div className="notifications-container">
      {isLoading ? (
        <div className="loader">
          <PuffLoader color="#ff6d18" size={25} loading={isLoading} />
        </div>
      ) : isError ? (
        <div className="error-message">
          <p>{message || "Something went wrong. Please try again later."}</p>
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
                  </div>
                )}
              </div>
              <div className="filter-double">
                <RiCheckDoubleFill size={20} className="filter-double-icon" />
              </div>
            </div>
          </div>
          <div className="notifications-list">
            {isSuccess && filteredNotifications.map((notification: Notification) => (
              <div key={notification.id} className={`notification-item ${!notification.isRead ? 'unread' : ''}`}>
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

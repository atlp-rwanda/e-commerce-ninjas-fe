/* eslint-disable */
import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { RiArrowDropDownLine, RiCheckDoubleFill } from "react-icons/ri";
import "../../styles/Notifications.scss";

type Notification = {
  id: number;
  text: string;
  time: string;
  unread: boolean;
};

const notificationsData: Notification[] = [
  { id: 1, text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas", time: "5 min", unread: true },
  { id: 2, text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum", time: "30 min", unread: true },
  { id: 3, text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas", time: "3 h", unread: false },
  { id: 4, text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum", time: "17 jan", unread: false },
];

const Notifications: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const filteredNotifications = notificationsData.filter(notification => 
    filter === 'All' || (filter === 'Unread' && notification.unread)
  );

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const selectFilter = (filter: string) => {
    setFilter(filter);
    setDropdownOpen(false);
  };

  return (
    <div className="notifications-container">
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
        {filteredNotifications.map(notification => (
          <div key={notification.id} className={`notification-item ${notification.unread ? 'unread' : ''}`}>
            <FaCheck />
            <div className="notification-text">
              <p>{notification.text}</p>
            </div>
            <div className="notification-time">
              {notification.time}
            </div>
          </div>
        ))}
      </div>
      <div className="load-more">
        <button>Load more</button>
      </div>
    </div>
  );
};

export default Notifications;

/* eslint-disable */
import React from 'react';

interface Props {
  selectedSection: string;
  onSelectSection: (section: string) => void;
}

const Menu: React.FC<Props> = ({ selectedSection, onSelectSection }) => {
  const menuItems = [
    'General Settings',
    'Account Settings',
  ];

  return (
    <div className="menu-bar">
      {menuItems.map(item => (
        <div
          key={item}
          className={'menu-item'}
          onClick={() => onSelectSection(item)}
        >
          <p className={`${selectedSection === item ? 'active' : ''}`}>{item}</p>
        </div>
      ))}
    </div>
  );
};

export default Menu;

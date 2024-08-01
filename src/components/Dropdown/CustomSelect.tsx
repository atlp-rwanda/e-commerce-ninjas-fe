/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: Option[];
  onSelect: (selected: string) => void;
  value: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, onSelect, value }) => {
  const [selectedLabel, setSelectedLabel] = useState('Select an option');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selectedOption = options.find(option => option.value === value);
    if (selectedOption) {
      setSelectedLabel(selectedOption.label);
    }
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: Option) => {
    setSelectedLabel(option.label);
    setIsOpen(false);
    onSelect(option.value);
  };

  return (
    <div className="custom-select-wrapper" ref={wrapperRef}>
      <div className="custom-select" onClick={() => setIsOpen(!isOpen)}>
        <div className="select-selected">
          {selectedLabel} 
          <RiArrowDropDownLine className="dropdown-icon" />
        </div>
        {isOpen && (
          <div className="select-items">
            {options.map((option, index) => (
              <div
                key={index}
                className="select-option"
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
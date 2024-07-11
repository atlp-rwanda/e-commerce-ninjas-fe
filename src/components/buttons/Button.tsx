/* eslint-disable */
import React from 'react';

interface ButtonProps {
  title: string;
  type: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ title, type }) => (
  <button type={type}>{title}</button>
);

export default Button;
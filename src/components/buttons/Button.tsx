/* eslint-disable */
import React from "react";
interface ButtonProps {
  title: string;
  className?: string;
  type: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ title, type, className }) => (
  <button type={type} className={className}>
    {title}
  </button>
);

export default Button;

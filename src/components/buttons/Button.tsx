/* eslint-disable */
import React from "react";
interface ButtonProps {
  title: string;
  className?: string;
  type: "button" | "submit" | "reset";
  onClick?(): void;
}

const Button: React.FC<ButtonProps> = ({ title, type, className, onClick }) => (
  <button type={type} className={className} onClick={onClick}>
    {title}
  </button>
);

export default Button;

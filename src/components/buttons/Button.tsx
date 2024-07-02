/* eslint-disable */

import React from "react";
import "../../styles/Button.scss";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
}

function Button({
  children,
  variant = "outline",
  disabled = false,
  onClick,
  icon,
  iconPosition = "start",
}: ButtonProps) {
  return (
    <button
      className={`button button--${variant} ${disabled ? "button--disabled" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && iconPosition === "start" && (
        <span className="button-icon">{icon}</span>
      )}
      <span className="button-text">{children}</span>
      {icon && iconPosition === "end" && (
        <span className="button-icon">{icon}</span>
      )}
    </button>
  );
}

export default Button;

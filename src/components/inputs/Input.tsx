/* eslint-disable */

import React, { ReactNode } from "react";

interface InputLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: "text" | "date" | "password" | "select" | "textarea" | "search";
  children?: ReactNode;
}

function InputLabel({
  label,
  type = "text",
  children,
  ...props
}: InputLabelProps) {
  return (
    <div className="floating-label">
      {type === "select" ? (
        <select
          className="floating-select"
          {...(props as unknown as React.SelectHTMLAttributes<HTMLSelectElement>)}
        >
          <option value=""></option>
          {children}
        </select>
      ) : type === "textarea" ? (
        <textarea
          className="floating-input floating-textarea"
          {...(props as unknown as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        ></textarea>
      ) : (
        <input className="floating-input" type={type} {...props} />
      )}
      <span className="input-highlight"></span>
      <label>{label}</label>
    </div>
  );
}

function InputDefault(
  props: React.JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLInputElement> &
    React.InputHTMLAttributes<HTMLInputElement>
) {
  return <input className="input-default" {...props} />;
}

function InputRounded(
  props: React.JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLInputElement> &
    React.InputHTMLAttributes<HTMLInputElement>
) {
  return <input className="input-rounded" {...props} />;
}

export { InputLabel, InputDefault, InputRounded };
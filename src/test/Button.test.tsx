/* eslint-disable */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "../components/buttons/Button2";

describe("Button Component", () => {
  it("renders button with correct title", () => {
    const title = "Click me";
    render(<Button title={title} />);
    const buttonElement = screen.getByRole("button", { name: title });
    expect(buttonElement).toBeInTheDocument();
  });
});

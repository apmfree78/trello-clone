import { render, screen } from "@testing-library/react";
import React from "react";
import App from "./App";

jest.mock("nanoid", () => "abc123");
jest.mock("react-redux", () => ({
  useDispatch: () => {
    return null;
  },
  useSelector: () => {
    return ["a", "b", "c"];
  },
}));

test("headline element on app", () => {
  render(<App />);
  const headline = screen.getByRole("heading", { level: 2 });
  expect(headline).toBeInTheDocument();
});

test("correct headline on app", () => {
  render(<App />);
  const headline = screen.getByRole("heading");
  expect(headline).toHaveTextContent("Productivity App");
});

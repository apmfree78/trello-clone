import { render, screen } from "@testing-library/react";
import CardEditForm from "../CardEditForm";

jest.mock("nanoid", () => "abc123");
jest.mock("react-redux", () => ({
  useDispatch: () => {
    return null;
  },
}));

test("form element is present", () => {
  render(<CardEditForm title="YOGA" id="1" description="go to Yoga" />);
  const formElement = screen.getByRole("form");
  expect(formElement).toBeInTheDocument();
});

test("title input is present", () => {
  render(<CardEditForm title="YOGA" id="1" description="go to Yoga" />);
  const formElement = screen.getByDisplayValue("YOGA");
  expect(formElement).toBeInTheDocument();
});

test("description input is present", () => {
  render(<CardEditForm title="YOGA" id="1" description="go to Yoga" />);
  const formElement = screen.getByDisplayValue("go to Yoga");
  expect(formElement).toBeInTheDocument();
});

test("shave changes button is present is present", () => {
  render(<CardEditForm title="YOGA" id="1" description="go to Yoga" />);
  const formElement = screen.getByRole("button", { name: "Save Changes" });
  expect(formElement).toBeInTheDocument();
});

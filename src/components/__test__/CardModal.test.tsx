import React from "react";
import { render, screen } from "@testing-library/react";
import CardModal from "../CardModal";
import user from "@testing-library/user-event";

test("card modal button to close modal executes as expected", async () => {
  const setOpenHandler = jest.fn();
  render(
    <CardModal open={true} setOpen={setOpenHandler} message="Edit Card" />
  );

  const closeButton = screen.getByTestId("CancelPresentationOutlinedIcon");
  await user.click(closeButton);

  expect(setOpenHandler).toHaveBeenCalledTimes(1);
});

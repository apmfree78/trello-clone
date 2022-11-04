import { render, screen } from "@testing-library/react";
import TaskBoard from "../TaskBoard";
import user from "@testing-library/user-event";

jest.mock("nanoid", () => "abc123");
jest.mock("react-redux", () => ({
  useDispatch: () => {
    return null;
  },
  useSelector: () => {
    return {
      cards: [
        { id: "1", category: "TO DO", title: "Yoga", desp: "Go to Yoga" },
        { id: "2", category: "TO DO", title: "Gym", desp: "Go to Gym" },
        { id: "3", category: "TO DO", title: "Read", desp: "Read a Book" },
        {
          id: "4",
          category: "TO DO",
          title: "Get Gas for Car",
          desp: "Get Gas for Car",
        },
        {
          id: "5",
          category: "TO DO",
          title: "Go for Walk",
          desp: "Go for Walk",
        },
        { id: "6", category: "TO DO", title: "Read", desp: "Read a Book" },
        { id: "7", category: "IN PROGRESS", title: "Code", desp: "Coding now" },
        {
          id: "8",
          category: "IN PROGRESS",
          title: "Write Blog Post",
          desp: "Write on leetcode",
        },
        {
          id: "9",
          category: "IN PROGRESS",
          title: "Buy Grocery",
          desp: "At Grocery Store",
        },
        { id: "10", category: "DONE", title: "Dinner", desp: "Made Dinner" },
        { id: "11", category: "DONE", title: "Vacuum", desp: "Done Vacuuming" },
        {
          id: "12",
          category: "DONE",
          title: "Feed Cats",
          desp: "Feed Cats at 9pm",
        },
      ],
    };
  },
}));

test("Board element is present", () => {
  render(<TaskBoard category="TO DO" />);
  const boardElement = screen.getByTestId("board");
  expect(boardElement).toBeInTheDocument();
});

test("add button element is present", () => {
  render(<TaskBoard category="TO DO" />);
  const addButton = screen.getByRole("button", {
    name: "+ Add a card",
  });
  expect(addButton).toBeInTheDocument();
});

// user interaction test
test("+ Add a card button click reveals textarea box", async () => {
  render(<TaskBoard category="TO DO" />);
  const addButton = screen.getByRole("button", {
    name: "+ Add a card",
  });
  // click + Add a card button
  await user.click(addButton);

  // see if input textarea shows up
  const revealedInput = screen.getByRole("textbox", {
    name: /enter title for new card\.\.\./i,
  });
  expect(revealedInput).toBeInTheDocument();
});

test("Board element contains correct category title TO DO", () => {
  render(<TaskBoard category="TO DO" />);
  const boardElement = screen.getByTestId("board");
  expect(boardElement).toHaveTextContent("TO DO");
});

test("Board element contains correct category title IN PROGRESS", () => {
  render(<TaskBoard category="IN PROGRESS" />);
  const boardElement = screen.getByTestId("board");
  expect(boardElement).toHaveTextContent("IN PROGRESS");
});

test("Board element contains correct category title DONE", () => {
  render(<TaskBoard category="DONE" />);
  const boardElement = screen.getByTestId("board");
  expect(boardElement).toHaveTextContent("DONE");
});

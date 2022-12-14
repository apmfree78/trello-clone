/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import React, { useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { cardAdd } from "../state/cardSlice";
import Cards from "./Cards";

// this component holds a Trello column, in our case
// it will be either TODO , IN-PROGRESS, or DONE columns
// the column category (TODO , IN-PROGRESS, or DONE) and
// task data will be passed as props to this component

interface Props {
  category: string;
}

// css grid for trello board
const boardStyle = {
  p: 2,
  bgcolor: "#EBECF0",
  border: "1px",
  borderRadius: "2px",
  display: "grid",
  fontWeight: "bold",
  gridTemplateColumns: { md: "1fr" },
  gap: 1.5,
};
// aligment for buttons
const buttonFlex = {
  display: "Flex",
  justifyContent: "flex-start",
};

// This component represents the list or board,
// either 'TO DO' , 'IN PROGRESS' OR 'DONE'
// it will call Card component to list all of its
// cards and display a form to add a card
const TaskBoard: React.FC<Props> = ({ category }) => {
  // setting dispatch to call cardAdd
  const dispatch = useDispatch();
  // input value when user creates new card
  const [input, setInput] = useState<string>("");
  // click '+ Add a Card' to show add card input form
  const [showForm, setShowForm] = useState<boolean>(false);

  // updating state with user input for new card
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // updating state
    setInput(event.currentTarget.value);
  };

  // dispatching user input to addTask functional prop , so
  // task is added to state
  const handleClick = (): void => {
    //checking if there is a valid input
    if (input === "") return;

    // dispatching action to add new task
    // desp is blank, it's added optionally
    // later with modal pop up
    dispatch(cardAdd(category, input, ""));

    // clearing input
    setInput("");
  };

  return (
    <Box data-testid="board" sx={boardStyle}>
      {category}
      {/* ***************************************************************** */}
      {/* ***************************************************************** */}
      {/* Cards component map through, and prints all cards onto Board */}
      <Cards category={category} />
      {/* ***************************************************************** */}
      {/* ***************************************************************** */}
      {/* ***************************************************************** */}
      {/* Input from to create new Card 
      only displays when user click '+ Add a card'
      which sets showForm === true */}
      {showForm ? (
        <>
          <TextField
            role="textarea"
            required
            sx={{ bgcolor: "white" }}
            id="card"
            label="Enter title for new card..."
            multiline
            rows={2}
            value={input}
            onChange={handleChange}
          />
          <Box sx={buttonFlex}>
            <Button
              sx={{ fontWeight: "bold" }}
              variant="contained"
              onClick={handleClick}
            >
              Add Card
            </Button>
            {/* click this below close icon to close add card form */}
            <CloseIcon
              color="disabled"
              sx={{ paddingLeft: 1, paddingTop: 0.6 }}
              onClick={() => setShowForm(false)}
            />
          </Box>
        </>
      ) : (
        // Click this button to reveal add card form
        <Box sx={buttonFlex}>
          <Button
            sx={{ fontSize: "1rem", color: "gray" }}
            onClick={() => setShowForm(true)}
          >
            + Add a card
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default TaskBoard;

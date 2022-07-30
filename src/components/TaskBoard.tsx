import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, ChangeEvent, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import Cards from './Cards';

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
  bgcolor: '#EBECF0',
  border: '1px',
  borderRadius: '2px',
  display: 'grid',
  fontWeight: 'bold',
  gridTemplateColumns: { md: '1fr' },
  gap: 2,
};

const TaskBoard: React.FC<Props> = ({ category }) => {
  // importing function to add a new Card to Board
  // form Global Context
  const { addCard } = useContext(GlobalContext);
  // input value when user creates new card
  const [input, setInput] = useState<string>('');
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
    if (input === '') return;

    // dispatching action to add new task
    // desp is blank, it's added optionally
    // later with modal pop up
    addCard({ category, title: input, desp: '' });

    // clearing input
    setInput('');
  };

  return (
    <Box sx={boardStyle}>
      {category}
      {/* Cards component map out all cards onto Board */}
      <Cards category={category} />
      {/* Input from to create new Card */}
      {showForm ? (
        <>
          <TextField
            required
            sx={{ bgcolor: 'white' }}
            id='card'
            label='Enter title for new card...'
            multiline
            rows={2}
            value={input}
            onChange={handleChange}
          />
          <Button
            sx={{ fontWeight: 'bold' }}
            variant='contained'
            onClick={handleClick}>
            Add Card
          </Button>
        </>
      ) : (
        <Button onClick={() => setShowForm(true)}>+ Add a card</Button>
      )}
    </Box>
  );
};

export default TaskBoard;

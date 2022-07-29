import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { taskProp, Position } from '../lib/interfaces';
import { DragEvent, useState, ChangeEvent } from 'react';
import Cards from './Cards';

// this component holds a Trello column, in our case
// it will be either TODO , IN-PROGRESS, or DONE columns
// the column category (TODO , IN-PROGRESS, or DONE) and
// task data will be passed as props to this component

interface Props {
  category: string;
  tasks: taskProp[] | undefined;
  addTask: (task: taskProp) => void;
  setDragPosition: (position: Position, type: string) => void;
  moveCard: (event: DragEvent) => void;
}
// const darkTheme = createTheme({ palette: { mode: 'dark' } });
// const lightTheme = createTheme({ palette: { mode: 'light' } });

const TaskBoard: React.FC<Props> = ({
  category,
  tasks,
  addTask,
  setDragPosition,
  moveCard,
}) => {
  // input value when user creates new card
  const [input, setInput] = useState<string>('');

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
    addTask({ category, title: input, desp: '' });

    // clearing input
    setInput('');
  };

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: 'gray',
        border: '1px',
        display: 'grid',
        gridTemplateColumns: { md: '1fr' },
        gap: 2,
      }}>
      {category}
      <Cards
        category={category}
        tasks={tasks}
        setDragPosition={setDragPosition}
        moveCard={moveCard}
      />
      <TextField
        sx={{ bgcolor: 'white' }}
        id='card'
        label='Enter title for new card...'
        multiline
        rows={2}
        value={input}
        onChange={handleChange}
      />
      <Button variant='contained' onClick={handleClick}>
        Add card
      </Button>
    </Box>
  );
};

export default TaskBoard;

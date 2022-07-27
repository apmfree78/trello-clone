import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, styled } from '@mui/material/styles';
import { taskProp } from '../lib/todoData';
import { useState, ChangeEvent } from 'react';

// this component holds a Trello column, in our case
// it will be either TODO , IN-PROGRESS, or DONE columns
// the column category (TODO , IN-PROGRESS, or DONE) and
// task data will be passed as props to this component

interface Props {
  category: string;
  tasks: taskProp[] | undefined;
  addTask: (task: taskProp) => void;
}
// const darkTheme = createTheme({ palette: { mode: 'dark' } });
// const lightTheme = createTheme({ palette: { mode: 'light' } });

//design for task item
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'left',
  paddingLeft: 8,
  color: theme.palette.text.secondary,
  height: 40,
  lineHeight: '40px',
}));

const TaskBoard: React.FC<Props> = ({ category, tasks, addTask }) => {
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

  //filtering out relevant tasks for this Board by category
  const relevantTasks: taskProp[] | undefined = tasks?.filter(
    (task) => task.category === category
  );

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
      {tasks &&
        relevantTasks?.map((task, i) => (
          <Item key={i} elevation={8}>
            {task.title}
          </Item>
        ))}
      <TextField
        sx={{ bgcolor: 'white' }}
        id='card'
        label='Enter title for this card...'
        multiline
        rows={3}
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

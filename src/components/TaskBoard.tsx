import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, styled } from '@mui/material/styles';
import { taskProp } from '../lib/todoData';

// this component holds a Trello column, in our case
// it will be either TODO , IN-PROGRESS, or DONE columns
// the column category (TODO , IN-PROGRESS, or DONE) and
// task data will be passed as props to this component

interface Props {
  category: string;
  tasks: taskProp[] | undefined;
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

const TaskBoard: React.FC<Props> = ({ category, tasks }) => {
  //filtering out relevant tasks for this Board
  const relevantTasks = tasks?.filter((task) => task.category === category);

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
    </Box>
  );
};

export default TaskBoard;

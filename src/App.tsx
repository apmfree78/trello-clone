import { useState } from 'react';
import { Grid, Container } from '@mui/material';
import TaskBoard from './components/TaskBoard';
// importing sample data
import { tasks, taskProp } from './lib/todoData';

const App: React.FC = () => {
  // managing state with useState
  // taskItems holds an array of all tasks on on trello boards
  // the interface for 1 task item is
  /*   export interface taskProp {
    category: string;
    title: string;
    desp: string;
  }
 */
  // category is the name of the TaskBoard the item will go on
  // title is the title of the task and desp is the description
  const [taskItems, setTaskItems] = useState<taskProp[] | undefined>([
    ...tasks,
  ]);

  // adds a new task (card) provided by user form input
  // this function will be passed as a prop to TaskBoard component
  // it will then be called by handleClick function
  const addTask = (task: taskProp): void => {
    // validating that input was provided and taskItems
    // is defined
    if (taskItems === undefined) return;

    //adding in new task
    setTaskItems([...taskItems, task]);
  };

  return (
    <Container sx={{ p: 2 }} maxWidth='lg'>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='flex-start'
        spacing={2}>
        {/* Creating Grid with 3 main Trello Boards */}
        <Grid item xs={6} sm={4} md={3}>
          <TaskBoard tasks={taskItems} addTask={addTask} category='TO DO' />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <TaskBoard
            tasks={taskItems}
            addTask={addTask}
            category='IN PROGRESS'
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <TaskBoard tasks={taskItems} addTask={addTask} category='DONE' />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;

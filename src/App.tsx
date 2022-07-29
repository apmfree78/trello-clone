import { Grid, Container } from '@mui/material';
import TaskBoard from './components/TaskBoard';

const App: React.FC = () => {
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
          <TaskBoard category='TO DO' />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <TaskBoard category='IN PROGRESS' />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <TaskBoard category='DONE' />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;

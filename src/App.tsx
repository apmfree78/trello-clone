import { Grid, Container, Typography } from '@mui/material';
import TaskBoard from './components/TaskBoard';

//set styles
const gridStyle = { minWidth: '250px' };
const headlineStyle = {
  p: 5,
  fontStyle: 'italic',
  fontWeight: 'bold',
  color: 'white',
  textAlign: 'center',
  textShadow: '',
};

const App: React.FC = () => {
  return (
    <Container sx={{ p: 2 }} maxWidth='xl'>
      <Typography sx={headlineStyle} variant='h2'>
        Productivity App
      </Typography>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='flex-start'
        spacing={2}>
        {/* Creating Grid with 3 main Trello Boards */}
        <Grid item sx={gridStyle} xs={12} sm={4} md={3}>
          <TaskBoard category='TO DO' />
        </Grid>
        <Grid item sx={gridStyle} xs={12} sm={4} md={3}>
          <TaskBoard category='IN PROGRESS' />
        </Grid>
        <Grid item sx={gridStyle} xs={12} sm={4} md={3}>
          <TaskBoard category='DONE' />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;

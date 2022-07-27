import { useState } from 'react';
import { Grid, Container } from '@mui/material';
import TaskColumn from './components/TaskColumn';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

const App: React.FC = () => {
  return (
    <Container sx={{ p: 2 }} maxWidth='lg'>
      <ThemeProvider theme={lightTheme}>
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='flex-start'
          spacing={2}>
          <Grid item xs={6} sm={4} md={3}>
            <TaskColumn catagory='TO DO' />
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <TaskColumn catagory='IN PROGRESS' />
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <TaskColumn catagory='DONE' />
          </Grid>
        </Grid>
      </ThemeProvider>
    </Container>
  );
};

export default App;

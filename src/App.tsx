import { useState } from 'react';
import { Grid, Container } from '@mui/material';
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
            <Box
              sx={{
                p: 2,
                bgcolor: 'background.default',
                borderColor: 'black',
                display: 'grid',
                gridTemplateColumns: { md: '1fr' },
                gap: 2,
              }}>
              {[0, 1, 2].map((elevation) => (
                <Item key={elevation} elevation={8}>
                  {`to do task`}
                </Item>
              ))}
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <Box
              sx={{
                p: 2,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { md: '1fr' },
                gap: 1,
              }}>
              {[0, 1, 2].map((elevation) => (
                <Item key={elevation} elevation={8}>
                  {`to do task`}
                </Item>
              ))}
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <Box
              sx={{
                p: 2,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { md: '1fr' },
                gap: 1,
              }}>
              {[0, 1, 2, 4].map((elevation) => (
                <Item key={elevation} elevation={8}>
                  {`to do task`}
                </Item>
              ))}
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Container>
  );
};

export default App;

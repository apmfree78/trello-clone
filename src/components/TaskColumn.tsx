import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

// this component holds a Trello column, in our case
// it will be either TODO , IN-PROGRESS, or DONE columns
// the column category (TODO , IN-PROGRESS, or DONE) and
// task data will be passed as props to this component

interface Props {
  catagory: string;
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

const TaskColumn: React.FC<Props> = ({ catagory }) => {
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
      {catagory}
      {[0, 1, 2].map((elevation) => (
        <Item key={elevation} elevation={8}>
          {`to do task`}
        </Item>
      ))}
    </Box>
  );
};

export default TaskColumn;

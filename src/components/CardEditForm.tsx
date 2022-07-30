/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Grid,
} from '@mui/material';
import { useContext, FormEvent } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { GlobalContext } from '../context/GlobalContext';
import useForm from '../lib/useForm';

interface Props {
  category: string;
  index: number;
  title: string;
  description: string;
}

interface inputProps {
  title: string;
  description: string;
}

// show form to add or Edit Reminder
// MUST pass closeForm prop, which is a function that is
// execute to close whatever popup this form shows up in
// right now it's setup to accept 'closeFrom' from ModalTemplate
// located in /lib/ModalTemplate.js
const CardEditForm: React.FC<Props> = ({
  category,
  index,
  title,
  description,
}) => {
  const { addCard } = useContext(GlobalContext);
  // create state for form input and handling
  // using custom hook useFomr
  const { inputs, handleChange } = useForm({ title, description });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(`title: ${inputs.title}, description: ${inputs.description}`);
  };

  // input form to update Card,
  // will take : title (label), descript,
  return (
    <form onSubmit={handleSubmit}>
      {/* use fieldset to disable form when graphQL mutation is executing */}
      <Grid container justifyContent='center' alignItems='center'>
        <TextField
          required
          type='text'
          id='title'
          name='title'
          variant='filled'
          color='info'
          label='Update Title'
          margin='normal'
          value={inputs.title}
          onChange={handleChange}
        />
        <TextField
          type='text'
          id='description'
          name='description'
          label='Description'
          variant='filled'
          color='success'
          multiline
          rows={3}
          margin='normal'
          value={inputs.description}
          onChange={handleChange}
        />
        {/* button click triggers graphQL mutation to create new Reminder and update cache */}
        <Button
          type='submit'
          size='large'
          variant='contained'
          color='success'
          endIcon={<SendIcon />}>
          Save Changes
        </Button>
      </Grid>
    </form>
  );
};

export default CardEditForm;

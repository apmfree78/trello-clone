/* eslint-disable import/no-cycle */
import { Button, TextField, Grid } from '@mui/material';
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

// load Edit an individual card
// this form shows up in CardModal
// when user clicks pencil icon
const CardEditForm: React.FC<Props> = ({
  category,
  index,
  title,
  description,
}) => {
  const { editCard } = useContext(GlobalContext);
  // create state for form input and handling
  // using custom hook useFomr
  const { inputs, handleChange } = useForm({ title, description });

  //capture edits to card and dispatch to editCard
  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();

    // dispatching form changes to editCard that will update
    // global state and rerender DOM with updates
    editCard(
      { category, title: inputs.title, desp: inputs.description },
      index
    );
  };

  // input form to update Card,
  // will take : title , description,
  return (
    <form onSubmit={handleSubmit}>
      <Grid container justifyContent='center' alignItems='center'>
        <TextField
          required
          type='text'
          id='title'
          name='title'
          variant='filled'
          color='info'
          label='Title'
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
        {/* button click dispatches card changes to editCard method obtained from GlobalContext */}
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

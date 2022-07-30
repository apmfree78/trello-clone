/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, IconButton } from '@mui/material';
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';
// import React, { cloneElement } from 'react';

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 325,
  bgcolor: 'background.paper',
  border: '2px solid #b3b3cc',
  boxShadow: 100,
  borderRadius: 2,
  p: 2,
  m: 1,
};

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  children?: React.ReactNode;
}

const CardModal: React.FC<Props> = ({ open, setOpen, message, children }) => {
  const handleClose = (event: MouseEvent): void => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='create or update reminder'
      aria-describedby='modal popup to create or update reminder'>
      <Box sx={style}>
        <Grid container justifyContent='flex-end' alignItems='flex-start'>
          <IconButton onClick={() => setOpen(false)}>
            <CancelPresentationOutlinedIcon fontSize='large' color='action' />
          </IconButton>
        </Grid>
        <Typography
          id='reminder'
          variant='h6'
          component='h2'
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontStyle: 'italic',
            p: 1,
          }}>
          {message}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
};

export default CardModal;

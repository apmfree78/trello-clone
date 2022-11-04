/* eslint-disable react/prop-types */
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, IconButton } from "@mui/material";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";

// style for modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 250,
  bgcolor: "background.paper",
  border: "4px solid #a3a3b1",
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
// Material UI pop up modal that appears above screen when user clicks
// pencil icon next to a card. It will display (in this app) a short
// form to edit card
const CardModal: React.FC<Props> = ({ open, setOpen, message, children }) => {
  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="update card"
      aria-describedby="modal popup to edit card"
    >
      <Box sx={style}>
        <Grid container justifyContent="flex-end" alignItems="flex-start">
          <IconButton onClick={() => setOpen(false)}>
            <CancelPresentationOutlinedIcon fontSize="large" color="action" />
          </IconButton>
        </Grid>
        <Typography
          id="reminder"
          variant="h6"
          component="h2"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontStyle: "italic",
            p: 1,
          }}
        >
          {message}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
};

export default CardModal;

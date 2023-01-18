import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ModalComponent({ open, handleClose }) {
  const navigation = useNavigate();
  const leaveHandler = () => {
    navigation('/');
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Leave the Page ?
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Change You made will not be save ? Are You sure ?
          </Typography>
          <Button />
          <div className='tw-flex tw-justify-end '>
            <Button
              variant='outlined'
              sx={{ marginRight: 2 }}
              onClick={leaveHandler}
            >
              Leave
            </Button>
            <Button variant='contained'>Stay</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export { ModalComponent };

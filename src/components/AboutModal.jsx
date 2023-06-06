import React from 'react'
import {
  Modal,
  Button,
  ButtonGroup,
  Typography,
  Box,
  styled,
} from '@mui/material'
import { Link } from 'react-router-dom'

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'black',
})

export const AboutModal = ({ onClose, onOpen }) => {
  return (
    <StyledModal
      open={onOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        width={400}
        height={280}
        color={'text.primary'}
        backgroundColor={'white'}
        sx={{ border: '2px solid black' }}
        p={3}
        borderRadius={5}
      >
        <Typography variant="h2" color="black" textAlign="center">
          About
        </Typography>
        <Box>
          <br></br>
          <br></br>

          <Typography
            textAlign={'center'}
            color="black"
            fontWeight={500}
            variant="h6"
          >
            This Web App is made by Iftekhar Hyder
          </Typography>
          <br></br>
          <br></br>
          <br></br>
        </Box>

        <ButtonGroup
          fullWidth
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Link to="/">
            <Button>Go Back</Button>
          </Link>
        </ButtonGroup>
      </Box>
    </StyledModal>
  )
}

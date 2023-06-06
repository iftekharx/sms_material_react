import React from 'react'
import Man3Icon from '@mui/icons-material/Man3'
import Woman2Icon from '@mui/icons-material/Woman2'
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useState, useContext } from 'react'
import { studentDetailsContext } from './Main'
import { Link } from 'react-router-dom'

export const Student = () => {
  const [student, deleteStudent, setCurrentStudent] = useContext(
    studentDetailsContext
  )

  const [showDetails, setShowDetails] = useState(false)

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          color: 'black',
          backgroundColor: 'white',
          border: '2px solid black',
          borderRadius: '5px',
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {student.gender === 'Male' ? <Man3Icon /> : <Woman2Icon />} ID:{' '}
            {student.id}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            Name: {student.name}
          </Typography>
          <Typography>School: {student.school}</Typography>

          {showDetails && (
            <>
              <Typography variant="h5">Gender: {student.gender}</Typography>
              <Typography variant="h5">Roll: {student.roll}</Typography>
              <Typography variant="h5">
                Department: {student.department}
              </Typography>
            </>
          )}
        </CardContent>
        <CardActions>
          <Button
            sx={{ color: 'black' }}
            size="small"
            onClick={() => {
              setShowDetails(!showDetails)
            }}
          >
            {showDetails ? 'Hide' : 'View'}
          </Button>
          <Link to="/editstudent">
            <Button
              sx={{ color: 'black' }}
              size="small"
              onClick={() => {
                setCurrentStudent(student)
              }}
            >
              Edit
            </Button>
          </Link>
          <Button
            onClick={() => deleteStudent(student.id)}
            startIcon={<CloseIcon />}
            sx={{ color: 'red' }}
            size="small"
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

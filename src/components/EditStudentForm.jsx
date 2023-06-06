import React from 'react'
import {
  TextField,
  Typography,
  Container,
  FormControlLabel,
  Checkbox,
  Box,
  Button,
  Alert,
  FormGroup,
  Grid,
  Grow,
} from '@mui/material'
import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'

const AddStudentSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  roll: Yup.string()
    .min(9, 'Roll number must be 9 digit atleast')
    .max(9, 'Roll number must not be more than 9 digits')
    .matches('[0-9]+', 'Only digits allowed')
    .required('Required'),
  school: Yup.string()
    .min(5, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required'),
  department: Yup.string()
    .min(5, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required'),
})

export const EditStudentForm = ({ EditStudent, student }) => {
  const [id, setId] = useState(student.id)
  const [name, setName] = useState(student.name)
  const [roll, setRoll] = useState(student.roll)
  const [message, setMessage] = useState('...')

  const [gender, setGender] = useState(student.gender === 'Male' ? true : false)
  const [genderStr, setGenderStr] = useState(
    gender === true ? 'Male' : 'Female'
  )
  const [department, setDepartment] = useState(student.department)
  const [school, setSchool] = useState(student.school)

  const handleGenderMale = (e) => {
    setGender(true)

    setGenderStr('Male')
  }

  const handleGenderFemale = (e) => {
    setGender(false)

    setGenderStr('Female')
  }

  const formik = useFormik({
    initialValues: {
      name: student.name,
      roll: student.roll,
      school: student.school,
      department: student.department,
    },
    validationSchema: AddStudentSchema,
    onSubmit: (values) => {
      const name = values.name
      const roll = values.roll
      const school = values.school
      const department = values.department

      setName(values.name)
      setRoll(values.roll)
      setDepartment(values.department)

      EditStudent(id, name, roll, genderStr, department, school)
      setMessage('Student Successfully Added! :)')
    },
  })

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          maxWidth: 'md',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#e1f5ba',
          border: '2px solid black',
        }}
      >
        <Typography component="h1" variant="h5" color={'black'}>
          Edit Student
        </Typography>

        <Grid
          container
          component="form"
          onSubmit={formik.handleSubmit}
          spacing={5}
          sx={{ mt: 1, p: 5 }}
        >
          <Grid item xs={12} md={12}>
            <Alert severity="info">{message}</Alert>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              backgroundColor={'white'}
              margin="normal"
              fullWidth
              id="id"
              label="ID"
              disabled
              value={student.id}
              name="id"
              autoComplete="id"
              sx={{ backgroundColor: 'white' }}
              InputLabelProps={{
                style: { color: 'darkblue' },
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              backgroundColor={'white'}
              margin="normal"
              fullWidth
              id="name"
              label="Name"
              {...formik.getFieldProps('name')}
              autoComplete="name"
              autoFocus
              sx={{ backgroundColor: 'white' }}
              InputLabelProps={{
                style: { color: 'darkblue' },
              }}
            />

            {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
            ) : null}
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              backgroundColor={'white'}
              margin="normal"
              fullWidth
              value={roll}
              id="roll"
              label="Roll Number"
              autoComplete="roll"
              {...formik.getFieldProps('roll')}
              autoFocus
              sx={{ backgroundColor: 'white' }}
              InputLabelProps={{
                style: { color: 'darkblue' },
              }}
            />
            {formik.touched.roll && formik.errors.roll ? (
              <div>{formik.errors.roll}</div>
            ) : null}
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              backgroundColor={'white'}
              margin="normal"
              value={department}
              fullWidth
              id="department"
              label="Department"
              {...formik.getFieldProps('department')}
              autoComplete="department"
              autoFocus
              sx={{ backgroundColor: 'white' }}
              InputLabelProps={{
                style: { color: 'darkblue' },
              }}
            />
            {formik.touched.department && formik.errors.department ? (
              <div>{formik.errors.department}</div>
            ) : null}
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              backgroundColor={'white'}
              margin="normal"
              fullWidth
              id="school"
              {...formik.getFieldProps('school')}
              label="School"
              autoComplete="school"
              autoFocus
              sx={{ backgroundColor: 'white' }}
              InputLabelProps={{
                style: { color: 'darkblue' },
              }}
            />
            {formik.touched.school && formik.errors.school ? (
              <div>{formik.errors.school}</div>
            ) : null}
          </Grid>
          <Grid item xs={12} md={4}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={gender}
                    onChange={handleGenderMale}
                    name="male"
                  />
                }
                label="Male"
                sx={{ color: 'black' }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!gender}
                    onChange={handleGenderFemale}
                    name="female"
                  />
                }
                sx={{ color: 'black' }}
                label="Female"
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} md={4}>
            <Link to="/">
              <Button
                fullWidth
                variant="contained"
                sx={{ backgroundColor: 'gray', mt: 3, mb: 2 }}
              >
                Go Back
              </Button>
            </Link>
          </Grid>

          <Grid item xs={12} md={4}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ backgroundColor: 'green', mt: 3, mb: 2 }}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

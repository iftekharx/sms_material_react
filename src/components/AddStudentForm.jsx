import React from 'react'
import { useState } from 'react'
import {
  TextField,
  Typography,
  Container,
  FormControlLabel,
  Checkbox,
  Box,
  Grid,
  Alert,
  Button,
  FormGroup,
} from '@mui/material'
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

export const AddStudentForm = ({
  AddStudent,
  gender,
  handleGenderMale,
  handleGenderFemale,
}) => {
  const [message, setMessage] = useState('...')
  const formik = useFormik({
    initialValues: {
      name: '',
      roll: '',
      school: '',
      department: '',
    },
    validationSchema: AddStudentSchema,
    onSubmit: (values) => {
      const name = values.name
      const roll = values.roll
      const school = values.school
      const department = values.department

      AddStudent(name, roll, school, department)
      setMessage('Student Successfully Added! :)')
      formik.resetForm()
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
          backgroundColor: '#ffff',
          border: '2px solid black',
        }}
      >
        <Typography component="h1" variant="h5" color={'black'}>
          Add Student
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
              id="name"
              {...formik.getFieldProps('name')}
              label="Name"
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
              id="roll"
              {...formik.getFieldProps('roll')}
              label="Roll Number"
              autoComplete="roll"
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
              fullWidth
              {...formik.getFieldProps('department')}
              id="department"
              label="Department"
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
              label="School"
              {...formik.getFieldProps('school')}
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

          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ backgroundColor: 'darkred', mt: 3, mb: 2 }}
            >
              Add Student
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Link to="/">
              <Button
                fullWidth
                variant="contained"
                sx={{ backgroundColor: 'darkgrey', mt: 3, mb: 2 }}
              >
                Go Back
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

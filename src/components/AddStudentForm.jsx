import React from 'react'
import {
  TextField,
  Typography,
  Container,
  FormControlLabel,
  Checkbox,
  Box,
  Grid,
  Button,
  FormGroup,
  Grow,
} from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const AddStudentSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  roll: Yup.string()
    .min(9, 'Roll number must be 9 digit atleast')
    .max(9, 'Roll number must not be more than 9 digits')
    .matches('^[0-9]*$', 'Only digits allowed')
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
  showAdd,
  AddStudent,
  gender,
  handleGenderMale,
  handleGenderFemale,
}) => {
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
      formik.resetForm()
    },
  })
  return (
    <Grow
      in={showAdd}
      style={{ transformOrigin: '0 0 0' }}
      {...(showAdd ? { timeout: 1000 } : {})}
    >
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#86B3CA',
          }}
        >
          <Typography component="h1" variant="h5" color={'black'}>
            Add Student
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ mt: 1, p: 5 }}
          >
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ backgroundColor: 'darkred', mt: 3, mb: 2 }}
            >
              Add Student
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item></Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Grow>
  )
}

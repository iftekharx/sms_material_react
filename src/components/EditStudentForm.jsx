import React from "react"
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
} from "@mui/material"
import { useState } from "react"

export const EditStudentForm = ({
  showEdit,
  EditStudent,
  student,
  CloseEdit,
}) => {
  const [id, setId] = useState(student.id)
  const [name, setName] = useState(student.name)
  const [roll, setRoll] = useState(student.roll)

  const [gender, setGender] = useState(student.gender === "male" ? true : false)
  const [genderStr, setGenderStr] = useState(
    gender === true ? "Male" : "Female"
  )
  const [department, setDepartment] = useState(student.department)
  const [school, setSchool] = useState(student.school)

  const handleGenderMale = (e) => {
    setGender(true)

    setGenderStr("Male")
  }

  const handleGenderFemale = (e) => {
    setGender(false)

    setGenderStr("Female")
  }

  return (
    <Grow
      in={showEdit}
      style={{ transformOrigin: "0 0 0" }}
      {...(showEdit ? { timeout: 1000 } : {})}
    >
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#86B3CA",
          }}
        >
          <Typography component="h1" variant="h5" color={"black"}>
            Edit Student
          </Typography>
          <Box
            component="form"
            onSubmit={() => {
              EditStudent(id, name, roll, genderStr, department, school)
            }}
            noValidate={false}
            sx={{ mt: 1, p: 5 }}
          >
            <TextField
              backgroundColor={"white"}
              margin="normal"
              required
              fullWidth
              id="id"
              label="ID"
              disabled
              value={id}
              name="id"
              autoComplete="id"
              sx={{ backgroundColor: "white" }}
              InputLabelProps={{
                style: { color: "darkblue" },
              }}
            />
            <TextField
              backgroundColor={"white"}
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
              name="name"
              autoComplete="name"
              autoFocus
              sx={{ backgroundColor: "white" }}
              InputLabelProps={{
                style: { color: "darkblue" },
              }}
            />
            <TextField
              backgroundColor={"white"}
              margin="normal"
              required
              fullWidth
              value={roll}
              id="roll"
              onChange={(e) => {
                setRoll(e.target.value)
              }}
              label="Roll Number"
              name="roll"
              autoComplete="roll"
              autoFocus
              sx={{ backgroundColor: "white" }}
              InputLabelProps={{
                style: { color: "darkblue" },
              }}
            />
            <TextField
              backgroundColor={"white"}
              margin="normal"
              required
              value={department}
              fullWidth
              onChange={(e) => {
                setDepartment(e.target.value)
              }}
              id="department"
              label="Department"
              name="department"
              autoComplete="department"
              autoFocus
              sx={{ backgroundColor: "white" }}
              InputLabelProps={{
                style: { color: "darkblue" },
              }}
            />
            <TextField
              backgroundColor={"white"}
              margin="normal"
              required
              fullWidth
              id="school"
              value={school}
              label="School"
              onChange={(e) => {
                setSchool(e.target.value)
              }}
              name="school"
              autoComplete="school"
              autoFocus
              sx={{ backgroundColor: "white" }}
              InputLabelProps={{
                style: { color: "darkblue" },
              }}
            />

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
                sx={{ color: "black" }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!gender}
                    onChange={handleGenderFemale}
                    name="female"
                  />
                }
                sx={{ color: "black" }}
                label="Female"
              />
            </FormGroup>

            <Button
              fullWidth
              variant="contained"
              sx={{ backgroundColor: "gray", mt: 3, mb: 2 }}
              onClick={() => CloseEdit()}
            >
              Close
            </Button>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ backgroundColor: "green", mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </Grow>
  )
}

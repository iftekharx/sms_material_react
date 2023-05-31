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

export const AddStudentForm = ({
  showAdd,
  AddStudent,
  gender,
  name,
  roll,
  school,
  department,
  setName,
  setRoll,
  setDepartment,
  setSchool,
  handleGenderMale,
  handleGenderFemale,
}) => {
  return (
    <Grow
      in={showAdd}
      style={{ transformOrigin: "0 0 0" }}
      {...(showAdd ? { timeout: 1000 } : {})}
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
            Add Student
          </Typography>
          <Box
            component="form"
            onSubmit={AddStudent}
            noValidate={false}
            sx={{ mt: 1, p: 5 }}
          >
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
              type="submit"
              fullWidth
              variant="contained"
              sx={{ backgroundColor: "darkred", mt: 3, mb: 2 }}
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

import React from "react"
import { Pets, Mail, Notifications } from "@mui/icons-material/"
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt"
import InfoIcon from "@mui/icons-material/Info"
import DataObjectIcon from "@mui/icons-material/DataObject"
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  ButtonGroup,
  FormGroup,
  Modal,
  styled,
} from "@mui/material"
import { Student } from "./Student"
import ManIcon from "@mui/icons-material/Man"

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Container,
  Grid,
  FormControlLabel,
  Checkbox,
  TextField,
  Link,
  Grow,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material"

import MenuIcon from "@mui/icons-material/Menu"
import { useState } from "react"

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "black",
})

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  backgroundColor: "coral",
  justifyContent: "space-between",
})

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}))

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}))

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}))

export const Main = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Robin Sharma",
      roll: "12000",
      gender: "male",
      department: "Science",
      school: "BAF SEMS",
    },
    {
      id: 2,
      name: "Jack Roberts",
      roll: "12008",
      gender: "male",
      department: "Science",
      school: "BAF SEMS",
    },
    {
      id: 3,
      name: "Kale Hashuna",
      roll: "12009",
      gender: "male",
      department: "Science",
      school: "BAF SEMS",
    },
    {
      id: 4,
      name: "Terakota Mules",
      roll: "12001",
      gender: "female",
      department: "Geography",
      school: "Notordam",
    },
    {
      id: 5,
      name: "Meckhi Saho",
      roll: "12002",
      gender: "female",
      department: "Economics",
      school: "BAF SEMS",
    },
    {
      id: 6,
      name: "Topuac Chandra",
      roll: "12003",
      gender: "male",
      department: "Science",
      school: "SFX",
    },
  ])
  const [open, setOpen] = useState(false)
  const [openAbout, setOpenAbout] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [name, setName] = useState("")
  const [roll, setRoll] = useState("")
  const [gender, setGender] = useState(true)
  const [genderStr, setGenderStr] = useState("Male")
  const [department, setDepartment] = useState("")
  const [school, setSchool] = useState("")
  const [filteredList, setFilteredList] = new useState(students)

  const handleGender = (e) => {
    setGender(!gender)
    if (gender === true) {
      setGenderStr("Male")
    } else {
      setGenderStr("Female")
    }
  }

  const deleteStudent = (id) => {
    if (window.confirm("Are you sure?") == true) {
      const newList = students.filter((student) => {
        return student.id != id
      })
      console.log(newList)
      setStudents(newList)
      setFilteredList(newList)
    } else {
      // do nothing
    }
  }

  const AddStudent = (e) => {
    e.preventDefault()
    const studentsStored = students.sort(function (a, b) {
      if (a.id < b.id) {
        return -1
      } else if (b.id < a.id) {
        return 1
      } else {
        return 0
      }
    })

    const newStudent = {
      id: studentsStored[studentsStored.length - 1].id + 1,
      name: name,
      roll: roll,
      gender: genderStr,
      department: department,
      school: school,
    }

    setStudents([...students, newStudent])
    setFilteredList([...students, newStudent])
    setName("")
    setRoll("")
    setDepartment("")
    setSchool("")
  }

  const filterBySearch = (event) => {
    // Access input value
    const query = event.target.value
    // Create copy of item list
    var updatedList = [...students]
    // Include all elements which includes the search query
    updatedList = updatedList.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    })
    // Trigger render with updated values
    setFilteredList(updatedList)
  }

  const OpenAbout = (e) => {
    setOpenAbout(true)
    console.log(openAbout)
  }
  return (
    <>
      <AppBar position="sticky">
        <StyledToolbar>
          <Typography
            variant="h6"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            SMS
          </Typography>
          <DataObjectIcon sx={{ display: { xs: "block", sm: "none" } }} />
          <Search>
            <InputBase placeholder="search..." onChange={filterBySearch} />
          </Search>
          <Icons>
            <PersonAddAltIcon
              onClick={() => {
                setShowAdd(!showAdd)
              }}
              sx={{
                color: "white",
                cursor: "pointer",
              }}
            />
            <InfoIcon
              onClick={() => OpenAbout()}
              sx={{
                cursor: "pointer",
                color: "white",
              }}
            />
          </Icons>
          <UserBox onClick={(e) => setOpen(true)}>
            <MenuIcon sx={{ color: "white" }} />
          </UserBox>
        </StyledToolbar>

        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          open={open}
          onClose={(e) => setOpen(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            onClick={() => {
              setShowAdd(true)
            }}
          >
            Add Student
          </MenuItem>

          <MenuItem
            onClick={() => {
              setShowAdd(false)
            }}
          >
            Hide Add Panel
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpenAbout(true)
            }}
          >
            About
          </MenuItem>
        </Menu>
      </AppBar>
      {showAdd && (
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
                        onChange={handleGender}
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
                        onChange={handleGender}
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
      )}
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Typography variant={"h3"} mb={10} textAlign={"center"}>
          Students
        </Typography>

        <Grid container spacing={4}>
          {filteredList.map((student) => (
            <Student
              onDelete={() => {
                deleteStudent(student.id)
              }}
              student={student}
            />
          ))}
        </Grid>
      </Container>

      <StyledModal
        open={openAbout}
        onClose={(e) => setOpenAbout(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={400}
          height={280}
          color={"text.primary"}
          backgroundColor={"white"}
          sx={{ border: "2px solid black" }}
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
              textAlign={"center"}
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
            <Button
              onClick={() => {
                setOpenAbout(false)
              }}
            >
              Close
            </Button>
          </ButtonGroup>
        </Box>
      </StyledModal>
    </>
  )
}

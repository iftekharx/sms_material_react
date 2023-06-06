import React from 'react'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import InfoIcon from '@mui/icons-material/Info'
import DataObjectIcon from '@mui/icons-material/DataObject'
import { styled } from '@mui/material'
import { Student } from './Student'
import { AddStudentForm } from './AddStudentForm'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import {
  AppBar,
  Box,
  InputBase,
  Container,
  Grid,
  Menu,
  MenuItem,
  Toolbar,
} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'
import { useState, createContext } from 'react'
import { EditStudentForm } from './EditStudentForm'
import { AboutModal } from './AboutModal'

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  backgroundColor: 'darkblue',
  justifyContent: 'space-between',
})

const Search = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  padding: '0 10px',
  borderRadius: theme.shape.borderRadius,
  width: '40%',
}))

const Icons = styled(Box)(({ theme }) => ({
  display: 'none',
  alignItems: 'center',
  gap: '20px',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
  },
}))

const UserBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}))
export const studentDetailsContext = createContext()

export const Main = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Robin Sharma',
      roll: '120000000',
      gender: 'Male',
      department: 'Science',
      school: 'BAF SEMS',
    },
    {
      id: 2,
      name: 'Jack Roberts',
      roll: '120000089',
      gender: 'Male',
      department: 'Science',
      school: 'BAF SEMS',
    },
    {
      id: 3,
      name: 'Kale Hashuna',
      roll: '120090000',
      gender: 'Male',
      department: 'Science',
      school: 'BAF SEMS',
    },
    {
      id: 4,
      name: 'Terakota Mules',
      roll: '120010000',
      gender: 'Female',
      department: 'Geography',
      school: 'Notordam',
    },
    {
      id: 5,
      name: 'Meckhi Saho',
      roll: '120020000',
      gender: 'Female',
      department: 'Economics',
      school: 'BAF SEMS',
    },
    {
      id: 6,
      name: 'Topuac Chandra',
      roll: '120030000',
      gender: 'Male',
      department: 'Science',
      school: 'SFX Green Herald',
    },
  ])
  const [open, setOpen] = useState(false)
  const [openAbout, setOpenAbout] = useState(false)

  const [name, setName] = useState('')
  const [roll, setRoll] = useState('')
  const [gender, setGender] = useState(true)
  const [genderStr, setGenderStr] = useState('Male')
  const [department, setDepartment] = useState('')
  const [school, setSchool] = useState('')
  const [filteredList, setFilteredList] = useState(students)
  const [currentStudent, setCurrentStudent] = useState(null)

  const EditStudent = (id, name, roll, genderStr, department, school) => {
    setStudents(
      students.map((student) => {
        if (student.id === id) {
          student.name = name
          student.roll = roll
          student.gender = genderStr
          student.department = department
          student.school = school
        }
        return student
      })
    )

    setFilteredList(students)
  }

  const handleGenderMale = (e) => {
    setGender(true)

    setGenderStr('Male')
  }

  const handleGenderFemale = (e) => {
    setGender(false)

    setGenderStr('Female')
  }

  const deleteStudent = (id) => {
    if (window.confirm('Are you sure?') === true) {
      const newList = students.filter((student) => {
        return student.id !== id
      })
      console.log(newList)
      setStudents(newList)
      setFilteredList(newList)
    } else {
      // do nothing
    }
  }

  const AddStudent = (name, roll, school, department) => {
    // e.preventDefault()
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
    setName('')
    setRoll('')
    setDepartment('')
    setSchool('')
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
      <Router>
        <AppBar position="sticky">
          <StyledToolbar>
            <Typography
              variant="h6"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              SMS
            </Typography>
            <DataObjectIcon sx={{ display: { xs: 'block', sm: 'none' } }} />
            <Search>
              <InputBase placeholder="search..." onChange={filterBySearch} />
            </Search>
            <Icons>
              <Link to="/addstudent">
                <PersonAddAltIcon
                  onClick={() => {}}
                  sx={{
                    color: 'white',
                    cursor: 'pointer',
                  }}
                />
              </Link>
              <Link to="about">
                <InfoIcon
                  sx={{
                    cursor: 'pointer',
                    color: 'white',
                  }}
                />
              </Link>
            </Icons>
            <UserBox onClick={(e) => setOpen(true)}>
              <MenuIcon sx={{ color: 'white' }} />
            </UserBox>
          </StyledToolbar>

          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            open={open}
            onClose={(e) => setOpen(false)}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Link to="/addstudent">
              <MenuItem>Add Student</MenuItem>
            </Link>

            <Link to="/">
              <MenuItem>Hide Add Panel</MenuItem>
            </Link>
            <MenuItem
              onClick={() => {
                setOpenAbout(true)
              }}
            >
              About
            </MenuItem>
          </Menu>
        </AppBar>
        <Routes>
          <Route
            path="/addstudent"
            element={
              <AddStudentForm
                AddStudent={AddStudent}
                gender={gender}
                handleGenderMale={handleGenderMale}
                handleGenderFemale={handleGenderFemale}
              />
            }
          ></Route>
          <Route
            path="/"
            element={
              <Container sx={{ py: 8 }} maxWidth="md">
                {/* End hero unit */}

                <Accordion
                  defaultExpanded={true}
                  sx={{ backgroundColor: '#dde2ed' }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography variant={'h3'} align="center">
                      Students
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={4}>
                      {filteredList.map((student, index) => (
                        <studentDetailsContext.Provider
                          key={index}
                          value={[student, deleteStudent, setCurrentStudent]}
                        >
                          <Student />
                        </studentDetailsContext.Provider>
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Container>
            }
          ></Route>

          <Route
            path="/editstudent"
            element={
              <EditStudentForm
                EditStudent={EditStudent}
                student={currentStudent}
              />
            }
          ></Route>

          <Route
            path="/about"
            element={
              <AboutModal
                onOpen={(e) => {
                  setOpenAbout(true)
                }}
                onClose={(e) => {
                  setOpenAbout(false)
                }}
              />
            }
          ></Route>
        </Routes>
      </Router>
    </>
  )
}

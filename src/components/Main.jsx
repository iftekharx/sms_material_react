import React, { useEffect } from 'react'
import { Pets, Mail, Notifications } from '@mui/icons-material/'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import InfoIcon from '@mui/icons-material/Info'
import DataObjectIcon from '@mui/icons-material/DataObject'
import { Button, ButtonGroup, Modal, styled } from '@mui/material'
import { Student } from './Student'
import { AddStudentForm } from './AddStudentForm'

import {
  AppBar,
  Box,
  InputBase,
  Container,
  Grid,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import { EditStudentForm } from './EditStudentForm'
import { AboutModal } from './AboutModal'

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  backgroundColor: 'coral',
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

export const Main = () => {
  const [students, setStudents] = useState([])
  const [open, setOpen] = useState(false)
  const [openAbout, setOpenAbout] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

  const [name, setName] = useState('')
  const [roll, setRoll] = useState('')
  const [gender, setGender] = useState(true)
  const [genderStr, setGenderStr] = useState('Male')
  const [department, setDepartment] = useState('')
  const [school, setSchool] = useState('')
  const [filteredList, setFilteredList] = useState(students)
  const [currentStudent, setCurrentStudent] = useState(null)

  const getStudents = async () => {
    const studentsFromServer = await fetchStudents()
    setStudents(studentsFromServer)
    setFilteredList(studentsFromServer)
    // console.log(studentsFromServer)
  }

  useEffect(() => {
    const getStudents = async () => {
      const studentsFromServer = await fetchStudents()
      setStudents(studentsFromServer)

      setFilteredList(studentsFromServer)
      // console.log(studentsFromServer)
    }
    getStudents()
  }, [])

  const fetchStudents = async () => {
    const res = await fetch('http://localhost:5000/students')
    const data = res.json()
    return data
  }

  const fetchStudent = async (id) => {
    const res = await fetch(`http://localhost:5000/students/${id}`)
    const data = res.json()
    return data
  }

  const deleteStudent = async (id) => {
    if (window.confirm('Are you sure?') == true) {
      await fetch(`http://localhost:5000/students/${id}`, {
        method: 'DELETE',
      })
      getStudents()
      setStudents(students.filter((student) => student.id !== id))
      setFilteredList(students)
    } else {
      // do nothing
    }
  }

  const EditStudent = async (id, name, roll, genderStr, department, school) => {
    const studentToUpdate = await fetchStudent(id)
    const updatedStudent = {
      ...studentToUpdate,
      name: name,
      roll: roll,
      gender: genderStr,
      department: department,
      school: school,
    }

    const res = await fetch(`http://localhost:5000/students/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatedStudent),
    })

    // const data = await res.json()

    // setStudents(
    //   students.map((student) =>
    //     student.id === id
    //       ? {
    //           ...student,
    //           name: name,
    //           roll: roll,
    //           gender: genderStr,
    //           department: department,
    //           school: school,
    //         }
    //       : student
    //   )
    // )
    getStudents()

    setShowEdit(false)
  }

  const onEdit = () => {
    setShowEdit(!showEdit)
  }

  const handleGenderMale = (e) => {
    setGender(true)

    setGenderStr('Male')
  }

  const handleGenderFemale = (e) => {
    setGender(false)

    setGenderStr('Female')
  }

  const AddStudent = async (name, roll, school, department) => {
    // e.preventDefault()

    const newStudent = {
      name: name,
      roll: roll,
      gender: genderStr,
      department: department,
      school: school,
    }

    const res = await fetch('http://localhost:5000/students', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newStudent),
    })

    getStudents()

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
            <PersonAddAltIcon
              onClick={() => {
                setShowAdd(!showAdd)
              }}
              sx={{
                color: 'white',
                cursor: 'pointer',
              }}
            />
            <InfoIcon
              onClick={() => OpenAbout()}
              sx={{
                cursor: 'pointer',
                color: 'white',
              }}
            />
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
        <AddStudentForm
          showAdd={showAdd}
          AddStudent={AddStudent}
          gender={gender}
          handleGenderMale={handleGenderMale}
          handleGenderFemale={handleGenderFemale}
        />
      )}
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Typography variant={'h3'} mb={10} textAlign={'center'}>
          Students
        </Typography>

        <Grid container spacing={4}>
          {filteredList.map((student, index) => (
            <Student
              key={index}
              onDelete={() => {
                deleteStudent(student.id)
              }}
              student={student}
              setCurrentStudent={() => {
                setCurrentStudent(student)
              }}
              onEdit={onEdit}
            />
          ))}
        </Grid>
      </Container>

      {showEdit && (
        <EditStudentForm
          showEdit={showEdit}
          EditStudent={EditStudent}
          student={currentStudent}
          CloseEdit={() => {
            setShowEdit(false)
          }}
        />
      )}

      {openAbout && (
        <AboutModal
          onOpen={(e) => {
            setOpenAbout(true)
          }}
          onClose={(e) => {
            setOpenAbout(false)
          }}
        />
      )}
    </>
  )
}

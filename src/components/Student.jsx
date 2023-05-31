import React from "react"
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  Typography,
  ButtonGroup,
  FormGroup,
  Modal,
  styled,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { useState } from "react"

export const Student = ({ student, onDelete, onEdit, setCurrentStudent }) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <Grid item key={student} xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          color: "black",
          backgroundColor: "white",
          border: "2px solid black",
          borderRadius: "5px",
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            ID: {student.id}
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
            sx={{ color: "black" }}
            size="small"
            onClick={() => {
              setShowDetails(!showDetails)
            }}
          >
            {showDetails ? "Hide" : "View"}
          </Button>
          <Button
            sx={{ color: "black" }}
            size="small"
            onClick={() => {
              setCurrentStudent(student)
              onEdit(true)
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => onDelete(student.id)}
            startIcon={<CloseIcon />}
            sx={{ color: "red" }}
            size="small"
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

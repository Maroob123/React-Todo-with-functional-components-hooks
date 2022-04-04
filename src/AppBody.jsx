import React, { useState, useEffect } from "react";
import "./App.css";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import Stack from '@mui/material/Stack';


function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div>
      <Accordion
        style={{
          margin: "10px",
        }}>
        <AccordionSummary
          style={{
            backgroundColor: todo.completed ? "lightgreen" : "lightblue",
            padding: "10px",
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel{index}a-header"
        >
          <Typography>{todo.completed ? <CheckCircleSharpIcon /> : ""}{" "}{todo.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" startIcon={<DeleteIcon />} style={{backgroundColor: "red", color: "white"}} onClick={() => removeTodo(index)}>
                Delete
              </Button>
              <Button variant="contained" endIcon={<DoneIcon />} style={{backgroundColor: "purple"}} onClick={() => completeTodo(index)}>
              {todo.completed ? "Completed" : "Done"}
              </Button>
            </Stack>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

function CreateTodo({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value){
      alert("Please Enter a valid or non empty task ")
      return;
    }
    addTodo(value);
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: "90%" }}>
      <Box
        sx={{
          width: "100%",
        }}
        style={{ padding: "10px", margin: "0 auto", maxWidth: "100%" }}
      >
        <TextField fullWidth label="Add a new task" id="fullWidth" value={value} 
        onChange={(e) =>setValue(e.target.value)} style={{ backgroundColor: "white" }} />
      </Box>
    </form>
  );
}

export default function AppBody() {
  const [todosRemaining, setTodosRemaining] = useState(0);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodosRemaining(todos.filter(todo => !todo.completed).length)
  }, [todos]);

  const addTodo = title => {
    const newTodos = [...todos, { title, completed: false }];
    setTodos(newTodos);
  };
  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].completed = true;
    setTodos(newTodos);
  };
  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  return (
    <div className="container">
      <p>Pending tasks {todosRemaining}</p>
      <div style={{
        display: "flex"
      }}>
        <CreateTodo addTodo={addTodo} />
      </div>
      {/* <div className="header"></div> */}
      <div>
        {todos.map((todo, index) => (
          <Todo
            todo={todo}
            index={index}
            key={index}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))
        }
      </div>
    </div>
  );
}
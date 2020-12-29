import { Box, Button, ButtonGroup, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo, setFilters, updateTodo } from './action';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

TodoFeature.propTypes = {};

function TodoFeature(props) {
  // Connect to redux store
  const todoList = useSelector((state) => state.todos.list);
  const filters = useSelector((state) => state.todos.filters);

  const dispatch = useDispatch();

  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    localStorage.setItem('todo_list', JSON.stringify(todoList));
  }, [todoList]);
  // stringify chuyen du lieu ve chuoi~ string khi dua vao` localStorage
  const handleRemoveClick = (todo) => {
    const action = removeTodo(todo.id);
    dispatch(action);
  };

  const handleEditClick = (todo) => {
    setSelectedTodo(todo);
  };

  const handleFormSubmit = (formValues) => {
    const newTodo = {
      ...formValues,
      id: selectedTodo ? selectedTodo.id : new Date().getTime().string(),
    };

    const action = selectedTodo ? updateTodo(formValues) : addTodo(formValues);
    dispatch(action);
    setSelectedTodo(null);
  };

  // Make filter for page
  const filteredTodos =
    filters.completed === 'all'
      ? todoList
      : todoList.filter((x) => x.completed === filters.completed);

  return (
    <Container fixed>
      <Box mt={3} mb={5}>
        <TodoForm initialValues={selectedTodo} onSubmit={handleFormSubmit} />
      </Box>

      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button
          variant={filters.completed === 'all' ? 'contained' : 'outlined'}
          onClick={() => dispatch(setFilters({ completed: 'all' }))}
        >
          All
        </Button>
        <Button
          variant={filters.completed === true ? 'contained' : 'outlined'}
          onClick={() => dispatch(setFilters({ completed: true }))}
        >
          Completed
        </Button>
        <Button
          variant={filters.completed === false ? 'contained' : 'outlined'}
          onClick={() => dispatch(setFilters({ completed: false }))}
        >
          Not Completed
        </Button>
      </ButtonGroup>

      <TodoList todoList={filteredTodos} onRemove={handleRemoveClick} onEdit={handleEditClick} />
    </Container>
  );
}

export default TodoFeature;

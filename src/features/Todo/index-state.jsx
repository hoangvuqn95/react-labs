import { Box, Button, ButtonGroup, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

TodoFeature.propTypes = {};

function TodoFeature(props) {
  const [filters, setFilters] = useState({
    completed: 'all',
  });

  const [todoList, setTodoList] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('todo_list')) || [];
    } catch (error) {}

    return [
      { id: '1', value: 'Eat', description: 'Lorem ipsum dolor sit amet.', completed: false },
      { id: '2', value: 'Code', description: 'Lorem ipsum dolor sit amet.', completed: false },
      { id: '3', value: 'Sleep', description: 'Lorem ipsum dolor sit amet.', completed: false },
    ];
  });

  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    localStorage.setItem('todo_list', JSON.stringify(todoList));
  }, [todoList]);

  const handleRemoveClick = (todo) => {
    setTodoList((currentList) => currentList.filter((x) => x.id !== todo.id));
  };

  const handleEditClick = (todo) => {
    setSelectedTodo(todo);
  };

  const handleFormSubmit = (formValues) => {
    // EDIT
    if (selectedTodo) {
      setTodoList((currentList) => {
        const newList = [...currentList];
        const updatedIdx = newList.findIndex((x) => x.id === selectedTodo.id);
        if (updatedIdx < 0) return currentList;

        // clone todo item, because they are array
        newList[updatedIdx] = {
          ...newList[updatedIdx],
          ...formValues,
        };
        return newList;
      });
      setSelectedTodo(null);

      return;
    }

    // ADD MODE
    setTodoList((currentList) => {
      const newTodo = {
        id: new Date().getTime().toString(),
        ...formValues,
      };

      return [...currentList, newTodo];
    });
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
          onClick={() => setFilters({ completed: 'all' })}
        >
          All
        </Button>
        <Button
          variant={filters.completed === true ? 'contained' : 'outlined'}
          onClick={() => setFilters({ completed: true })}
        >
          Completed
        </Button>
        <Button
          variant={filters.completed === false ? 'contained' : 'outlined'}
          onClick={() => setFilters({ completed: false })}
        >
          Not Completed
        </Button>
      </ButtonGroup>

      <TodoList todoList={filteredTodos} onRemove={handleRemoveClick} onEdit={handleEditClick} />
    </Container>
  );
}

export default TodoFeature;

// chua ap dung redux de quan ly state, luu y: trong 1 project cang quan ly it state thi` cang tot

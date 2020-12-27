import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';

TodoList.propTypes = {
  todoList: PropTypes.array,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
};

TodoList.defaultProps = {
  todoList: [],
  onEdit: null,
  onRemove: null,
};

const useStyles = makeStyles(() => ({
  root: {
    listStyleType: 'none',
    padding: 0,
  },

  item: {
    margin: '1rem 0',
  },
}));

function TodoList({ todoList, onEdit, onRemove }) {
  const classes = useStyles();
  return (
    <Box component="ul" className={classes.root}>
      {todoList.map((todo) => (
        <Box component="li" className={classes.item} key={todo.id}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box flex="1 1 auto">
                  <Typography
                    component="p"
                    variant="body1"
                    style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                  >
                    {todo.value}
                  </Typography>

                  <Typography component="p" variant="body2">
                    {todo.description}
                  </Typography>
                </Box>

                <Box mr={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<Edit />}
                    onClick={() => onEdit && onEdit(todo)}
                  >
                    Edit
                  </Button>
                </Box>

                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<Delete />}
                  onClick={() => onRemove && onRemove(todo)}
                >
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
}

export default TodoList;

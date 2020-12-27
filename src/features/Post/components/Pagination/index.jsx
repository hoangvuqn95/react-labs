import { TablePagination } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PaginationPost({ count, onPageChange }) {
  const classes = useStyles();
  const handlePageChange = (newPage) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  return (
    <div className={classes.root}>
      <TablePagination
        count={count}
        color="secondary"
        onChange={(e, page) => handlePageChange(page)}
      />
    </div>
  );
}

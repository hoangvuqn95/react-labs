import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import postApi from 'api/postApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

PostList.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
  },
  card: {
    // padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    cursor: 'pointer',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

function PostList(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [postList, setPostList] = useState([]);
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 8,
    _totalRows: 1,
  });
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 8,
    _totalRows: 1,
  });

  const { _limit, _totalRows } = pagination;
  const totalPages = Math.ceil(_totalRows / _limit);

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await postApi.getAll(filters);

        setPostList(data);
      } catch (error) {
        console.log('Failed to fetch post list', error);
      }

      setLoading(false);
    })();
  }, [filters]);

  const handlePageChange = (newPage) => {
    setFilters({
      ...filters,
      _page: newPage,
    });
  };

  return (
    <div className={classes.root}>
      <Box className={classes.loading}>{loading && <CircularProgress />}</Box>
      <Grid container direction="row" justify="space-around" alignItems="center" spacing={3}>
        {postList.map((post) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={post.id}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia className={classes.media} image={post.imageUrl} title={post.title} />
                <CardContent>
                  <Typography component="h6" variant="h6">
                    {post.title}
                  </Typography>
                  <Typography component="body2" variant="body2" color="Secondary">
                    {post.author}
                  </Typography>
                  <Typography>
                    <Link to={`posts/${post.id}`}>Show Detail</Link>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default PostList;

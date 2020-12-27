import NotFound from 'components/NotFound';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import PostDetail from './pages/PostDetail';
import PostList from './pages/PostList';

function PostFeature(props) {
  const match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={match.path} component={PostList} />
        <Route path={`${match.path}/:postId`} component={PostDetail} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default PostFeature;

import Header from 'components/Header';
import HomePage from 'features/Home';
import MagicBoxFeature from 'features/MagicBox';
import PostFeature from 'features/Post';
import RenderingFeature from 'features/Rendering';
import StudentFeature from 'features/Student';
import TodoFeature from 'features/Todo';
import { Route, Switch } from 'react-router-dom';
import './App.scss';

function App() {
  return (
    <div>
      <Header />

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/rendering" component={RenderingFeature} />
        <Route path="/students" component={StudentFeature} />
        <Route path="/todos" component={TodoFeature} />
        <Route path="/magicbox" component={MagicBoxFeature} />
        <Route path="/posts" component={PostFeature} />
      </Switch>

      <div style={{ textAlign: 'center' }}>Created by Vu with ❤️</div>
    </div>
  );
}

export default App;

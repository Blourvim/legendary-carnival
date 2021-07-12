import './App.css';
import PostsContainer from './components/PostsContainer';
import NavBar from './components/NavBar';
import Signin from './components/Signin';
import CreatePost from './components/CreatePost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FullPostCard from './components/FullPostCard';


function App() {
  return (
    <Router>
    <div>
      <NavBar/>
        <Switch>
          <Route exact path="/">
            <PostsContainer/>
          </Route>
          <Route exact path="/signin">
        <Signin/>

          </Route>

          <Route exact path="/posts/:id">
        <FullPostCard/>

          </Route>
          

        </Switch>
    </div>
    </Router>
  );
}

export default App;

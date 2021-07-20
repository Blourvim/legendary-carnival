import './App.css';
import PostsContainer from './components/PostsContainer';
import NavBar from './components/NavBar';
import Signin from './components/Signin';
import CreatePost from './components/CreatePost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FullPostCard from './components/FullPostCard';
import SignOut from './components/SignOut';
import UserProfile from './components/UserProfile'
import MenuAppBar from './components/MenuAppBar';
import NotFound from './pages/NotFound';
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <AuthProvider>

    <Router>
    <div>
      <MenuAppBar/>
        <Switch>
          <Route exact path="/">
            <PostsContainer/>
          </Route>
          <Route exact path="/signin">
        <Signin/>
          </Route>
          <Route exact path="/signout">
        <SignOut/>
          </Route>

          <Route exact path="/posts/:id">
        <FullPostCard/>

          </Route>
          <Route exact path="/create-post">
        <CreatePost/>

          </Route>
          <Route exact path="/profile">
        <UserProfile/>
          </Route>
          <Route exact path="/user/:id">
        <UserProfile/>
          </Route>
          <Route path="/">
<NotFound/>   
       </Route>

        </Switch>
    </div>
    </Router>
    </AuthProvider>

  );
}

export default App;

import './App.css';
import PostsContainer from './components/PostsContainer';
import Signin from './pages/Signin';
import CreatePost from './components/CreatePost';
import { BrowserRouter as Router, Route, Switch,HashRouter } from 'react-router-dom';
import FullPostCard from './pages/FullPostCard';
import SignOut from './pages/SignOut';
import UserProfile from './pages/UserProfile'
import MenuAppBar from './components/MenuAppBar';
import NotFound from './pages/NotFound';
import { AuthProvider } from './components/AuthContext';
import AnotherProfile from './components/AnotherProfile';

function App() {
  return (
    <AuthProvider>

    <HashRouter>
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
          <Route exact path="/user/:user">
        <AnotherProfile/>
          </Route>
          <Route path="/">
<NotFound/>   
       </Route>

        </Switch>
    </div>
    </HashRouter>
    </AuthProvider>

  );
}

export default App;

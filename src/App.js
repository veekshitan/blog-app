import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Layout from './Layout'
import HomePage from './Pages/homePage'
import LoginPage from './Pages/loginPage';
import Register from './Pages/register';
import CreatePostHere from './Pages/createPost';
import PostPage from './Pages/postPage';
import EditPost from './Pages/editPost';
import { SnackbarProvider } from "notistack";
import { UserContextProvider } from './UserContext';
function App() {
  return (
  <UserContextProvider>
    <Router>
      <Routes>
      <Route  path = "/" element = {<Layout />}>
        <Route index element = {<HomePage />} />
        <Route path = "/login" element = {<LoginPage />} />
        <Route path = "/register" element = {<Register />} />
        <Route path = "/create" element = {<CreatePostHere />} />
        <Route path = "/post/:id" element = {<PostPage />} />
        <Route path = "/edit/:id" element = {<EditPost/>} />
      </Route>
    </Routes>
    </Router>
    </UserContextProvider>
    

  );
}

export default App;

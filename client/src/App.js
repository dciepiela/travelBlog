import './App.css';
import Post from './Post';
import Header from './Header';
import {Route,Routes} from  "react-router-dom";
import Layout from './Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { UserContextProvider } from './UserContext';
import CreatePostPage from './pages/CreatePostPage';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout></Layout>}>
          <Route index element={
            <HomePage></HomePage>
          }></Route>
          <Route path='/login' element={
            <LoginPage></LoginPage>
          }></Route>
          <Route path='/register' element={
            <RegisterPage></RegisterPage>
          }></Route>
          <Route path='/create' element={
            <CreatePostPage></CreatePostPage>
          }></Route>
          <Route path='/post/:id' element={
            <PostPage></PostPage>
          }></Route>
          <Route path='/edit/:id' element={
            <EditPost></EditPost>
          }></Route>

        </Route>
      </Routes>
    </UserContextProvider>
    
   
  );
}

export default App;

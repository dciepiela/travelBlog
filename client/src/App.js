import './App.css';
import Post from './Post';
import Header from './Header';
import {Route,Routes} from  "react-router-dom";
import Layout from './Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
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

      </Route>
      
      
    </Routes>
   
  );
}

export default App;

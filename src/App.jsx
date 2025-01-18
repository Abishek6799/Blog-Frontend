import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './Components/Navbar';
import Blog from './Pages/Blog';
import ProtectedRoutes from './Components/ProtectedRoutes';
import CreateBlog from './Pages/CreateBlog';
import AdminPanel from './Pages/AdminPanel';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import PageNotFound from './Pages/PageNotFound';
import BlogPage from './Pages/BlogPage';
import ApprovePage from './Pages/ApprovePage';

const App = () => {
  return (
    <div>
      <div>
        <ToastContainer />
      </div>
      <BrowserRouter>
      <div>
        <Navbar/>
      </div>
      <Routes>
          <Route path='/' element={<Blog/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/reset-password/:id/:token' element={<ResetPassword/>}/>
          <Route path='/create' element={<ProtectedRoutes><CreateBlog /></ProtectedRoutes>} />
          <Route path='/blog' element={<ProtectedRoutes><BlogPage /></ProtectedRoutes>} />
          <Route path='/admin' element={<ProtectedRoutes adminOnly><AdminPanel /></ProtectedRoutes>} />
          <Route path='/approve' element={<ProtectedRoutes adminOnly><ApprovePage /></ProtectedRoutes>} />
          <Route path='*' element={<PageNotFound/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
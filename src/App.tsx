// import './css/App.css'

import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Reset from './pages/reset';
import Register from './pages/Register';
// import Navbar from './components/sideBar'
// import ProfileMini from './components/profileMini'
// import { Grid, GridItem, Stack } from "@chakra-ui/react"
// import Suggest from './components/suggest'
import Forgot from './pages/forgot';
// import DescDev from './components/descDev'
// import Thread from './components/thread'
// import Post from './components/post'
import PrivateRoute from './routes/privateRoute';
import Follows from './pages/follows';
import Profile from './pages/profile';
import Search from './pages/search';
import DetailPost from './pages/detailPost';
import DetailImage from './pages/detailImage';
import UserProvider from './hooks/contexts/userContexts';

export default function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  console.log('isAuthenticated:', isAuthenticated);
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route
            element={
              <PrivateRoute username='muja' email='muja@mail.com' />
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/follows" element={<Follows />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<Search />} />
            <Route path="/detailPost" element={<DetailPost />} />
            <Route path="/detailImage" element={<DetailImage />} />
          </Route>
        </Routes>
      </UserProvider>
    </>
  );
}

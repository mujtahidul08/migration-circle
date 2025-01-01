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
import Search from './pages/search';
import DetailImage from './pages/detailImage';
import UserProvider from './hooks/contexts/userContexts';
import useUserStore from './hooks/userStore';
import { useEffect, useState } from 'react';
import DetailThread from './pages/detailThread';
import PageProfileUser from './pages/pageProfileUser';
import PageProfileAccount from './pages/pageProfileAccount';

export default function App() {
  const { user, setUser, setToken } = useUserStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
    setIsInitialized(true);
  }, [setUser, setToken]);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

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
              <PrivateRoute user = {user} />
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/follows" element={<Follows />} />
            <Route path="/profile" element={<PageProfileUser/>} />
            <Route path="/profile/:username" element={<PageProfileAccount/>} />
            <Route path="/search" element={<Search />} />
            <Route path="/thread/:id" element={<DetailThread/>} />
            <Route path="/detailImage/:id" element={<DetailImage />} />
          </Route>
        </Routes>
      </UserProvider>
    </>
  );
}

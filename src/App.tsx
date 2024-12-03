
// import './css/App.css'

import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Reset from './pages/reset'
import Register from './pages/Register'
import Navbar from './components/sideBar'
import ProfileMini from './components/profileMini'
import { Grid, GridItem, Stack } from "@chakra-ui/react"
import Suggest from './components/suggest'
import Forgot from './pages/forgot'
import DescDev from './components/descDev'
import Thread from './components/thread'
import Post from './components/post'
import PrivateRoute from './routes/privateRoute'





export default  function App() {
  const isAuthenticated=localStorage.getItem("isAuthenticated")

  return (
    <>
    {/* <Navbar/> */}

    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/reset' element={<Reset/>} />
      <Route path='/forgot' element={<Forgot/>} />
      <Route element={<PrivateRoute isAuthenticated={isAuthenticated==="true"}/>} >
        <Route path='/' element={<Home/>} />
      </Route>
    </Routes>
    
    {/* <ProfileMini/>
    <Suggest/>
    <DescDev/> */}

    {/* <Thread/> */}\

    {/* <Post/> */}

    </>
  )
}

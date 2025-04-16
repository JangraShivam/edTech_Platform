import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import NavBar from './components/NavBar/navbar'
import { Toaster } from 'react-hot-toast'
import ForgotPassword from './pages/forgotPassword'
function App() {
  

  return (
    <>
      <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter overflow-x-hidden">

        <NavBar></NavBar>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/ForgotPassword' element={<ForgotPassword></ForgotPassword>}/>
        </Routes>
        <Toaster/>
      </div>
    </>
  )
}

export default App

import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
function App() {
  

  return (
    <>
      <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter overflow-x-hidden">


        <Routes>
          <Route path='/' element={<Home/>} />
        </Routes>
      </div>
    </>
  )
}

export default App

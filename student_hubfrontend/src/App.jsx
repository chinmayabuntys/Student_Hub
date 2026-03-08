import {Toaster} from 'react-hot-toast';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import Profile from './Pages/Profile';
import Navbar from './components/Navbar';
import Subject from './Pages/Subject';
import AllStudents from './Pages/AllStudents';



function App() {
  const token=localStorage.getItem("token")
  const role=localStorage.getItem("user")
  return (
    <>
    <Toaster position="top-center" />
      <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path='/' element={token ? <Navigate to='profile'/>  :  <Navigate to='/signup'/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/profile' element={<Profile/>} />
            <Route path='/subjects' element={<Subject/>} />
            <Route
            path="/allstudents"
            element={role === "trainer" ? <AllStudents /> : <Navigate to="/login" />}
          />
            <Route path='*' element={<h1 style={{textAlign:"center", marginTop:"50px"}}>404 Not Found</h1>} />  
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

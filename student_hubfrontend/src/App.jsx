import {Toaster} from 'react-hot-toast';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import Profile from './Pages/Profile';
import Navbar from './components/Navbar';



function App() {
  const token=localStorage.getItem("token")

  return (
    <>
    <Toaster position="top-center" />
      <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path='/' element={token ? <Navigate to='profile'/>  :  <Navigate to='/signup'/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/profile' element={token ? <Profile/> : <Navigate to='/login'/>}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

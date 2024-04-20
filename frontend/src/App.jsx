import {BrowserRouter as Router ,Route,Routes} from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import useUserDetail from './useUserDetail'
import Dashboard from './pages/Dashboard';
import UserContext from './UserContext';
function App() {

const userName=useUserDetail();

  return (
    <UserContext.Provider value={userName}>
  <Router>
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Dashboard/>}/>
    </Routes>
  </Router>
  </UserContext.Provider>
  )
}

export default App
